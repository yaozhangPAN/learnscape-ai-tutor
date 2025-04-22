
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CapyzenComment } from "./CapyzenComment";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/integrations/supabase/client";
import type { QuestionAnswerProps } from "./types";
import { AnswerInput } from "./AnswerInput";
import { QuestionRevealAnswer } from "./QuestionRevealAnswer";
import { PremiumHint } from "./PremiumHint";

const getAIFeedback = async (question: string, answer: string, imageUrl?: string): Promise<string> => {
  try {
    const response = await fetch(
      "https://xfwnjocfdvuocvwjopke.supabase.co/functions/v1/ai-capyzen-feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "feedback",
          question,
          answer,
          imageUrl,
        }),
      }
    );
    const data = await response.json();
    if (data.feedback) return data.feedback;
    return "Capyzen点评：AI助教暂时无法点评，请稍后再试。";
  } catch (e) {
    console.error("Error getting AI feedback:", e);
    return "Capyzen点评：服务器异常，请稍后再试。";
  }
};

export const HomeworkQuestionAnswer: React.FC<QuestionAnswerProps> = ({
  questionId,
  questionContent,
  questionText,
  imageUrl
}) => {
  const [answer, setAnswer] = useState('');
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [dbAnswer, setDbAnswer] = useState<string>('');
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const { toast } = useToast();
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();
  const { forwardToChat } = useCapyzenChat();
  const { isPremium, loadingSubscription, startCheckoutSession } = useSubscription();

  const handleNotPremium = () => {
    toast({
      title: "仅限付费会员",
      description: "开通会员即可使用语音输入与点评功能",
      variant: "destructive"
    });
  };

  const handleAIFeedback = async () => {
    if (!isPremium) {
      toast({
        title: "需要开通会员",
        description: "只有付费用户可以使用AI点评功能，请升级为会员。",
        variant: "destructive"
      });
      return;
    }
    if (!answer.trim()) {
      toast({
        title: "请输入答案后再点评",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setAiComment(null);
    const feedback = await getAIFeedback(
      `${questionContent}\n${questionText}`,
      answer,
      imageUrl
    );
    setAiComment(feedback);
    setIsLoading(false);
    toast({
      title: "点评已生成",
      variant: "success",
    });
  };

  const fetchAnswer = async () => {
    try {
      setIsLoadingAnswer(true);
      const { data, error } = await supabase
        .from('questions')
        .select('content')
        .eq('id', questionId)
        .single();

      if (error) {
        throw error;
      }

      if (data?.content) {
        const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
        if (content.answer) {
          if (typeof content.answer === 'string') {
            setDbAnswer(content.answer);
          } else if (typeof content.answer === 'object') {
            setDbAnswer(Object.values(content.answer).filter(Boolean).join("\n\n"));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching answer:', error);
      toast({
        title: "获取答案失败",
        description: "请稍后再试",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  const toggleAnswer = () => {
    if (!showAnswer) {
      fetchAnswer();
    }
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="space-y-4">
      <AnswerInput
        answer={answer}
        setAnswer={setAnswer}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        loadingSubscription={loadingSubscription}
        isPremium={isPremium}
        onNotPremium={handleNotPremium}
      />
      <div>
        <Button
          type="button"
          variant="default"
          onClick={handleAIFeedback}
          disabled={!isPremium || isLoading}
          className="flex items-center gap-1 whitespace-nowrap px-3 py-2"
          title={isPremium ? "让Capyzen点评" : "仅限付费会员"}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-1">⚪</span>
              点评生成中...
            </>
          ) : (
            <>
              <HelpCircle className="w-5 h-5 mr-1 text-blue-500" />
              让Capyzen点评
            </>
          )}
        </Button>
      </div>
      <QuestionRevealAnswer
        showAnswer={showAnswer}
        isLoadingAnswer={isLoadingAnswer}
        dbAnswer={dbAnswer}
        onToggle={toggleAnswer}
      />
      {!isPremium && <PremiumHint loadingSubscription={loadingSubscription} startCheckoutSession={startCheckoutSession} />}
      {aiComment && (
        <CapyzenComment 
          feedback={aiComment} 
          isPremium={isPremium}
          startCheckoutSession={startCheckoutSession}
        />
      )}
    </div>
  );
};
