
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, HelpCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CapyzenComment } from "./CapyzenComment";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";
import { useSubscription } from "@/contexts/SubscriptionContext";
import type { QuestionAnswerProps } from "./types";

const getAIFeedback = async (question: string, answer: string): Promise<string> => {
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
  questionText
}) => {
  const [answer, setAnswer] = useState('');
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();
  const { forwardToChat } = useCapyzenChat();
  const { isPremium, loadingSubscription, startCheckoutSession } = useSubscription();

  const toggleRecording = () => {
    if (!isPremium) {
      toast({
        title: "仅限付费会员",
        description: "开通会员即可使用语音输入与点评功能",
        variant: "destructive"
      });
      return;
    }
    if (isRecording) {
      stopRecording();
    } else {
      startRecording((transcript: string) => {
        setAnswer(prev => {
          const newText = prev ? prev + ' ' + transcript : transcript;
          return newText.trim();
        });
      });
    }
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
      answer
    );
    setAiComment(feedback);
    setIsLoading(false);
    toast({
      title: "点评已生成",
      variant: "success",
    });
  };

  // 付费限制说明
  const premiumHint = (
    <div className="flex items-center text-xs text-orange-600 mt-2 gap-1">
      <Lock className="w-4 h-4 mr-1" />
      仅付费会员可使用AI点评/对话，<button
        className="underline text-blue-600 hover:text-orange-500 ml-1"
        onClick={async () => {
          const url = await startCheckoutSession("premium_subscription");
          if (url) window.location.href = url;
        }}
      >立即开通</button>
    </div>
  );

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="在此输入您的答案..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1"
          disabled={false}
        />
        <Button
          variant={isRecording ? "destructive" : "secondary"}
          size="icon"
          onClick={toggleRecording}
          className="mt-1"
          disabled={isRecording ? false : loadingSubscription}
        >
          {isRecording ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
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
      {!isPremium && !loadingSubscription && premiumHint}
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
