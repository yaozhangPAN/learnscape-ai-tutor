
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CapyzenComment } from "./CapyzenComment";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";
import type { QuestionAnswerProps } from "./types";

const mockGetAIFeedback = async (question: string, answer: string): Promise<string> => {
  return new Promise((res) => setTimeout(() =>
    res(`Capyzen点评：你的答案体现了对问题的理解，但可以补充更多细节。例如：……"`),
    1300
  ));
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

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      // Changed how we use startRecording to handle the transcript update
      startRecording((transcript: string) => {
        setAnswer(prev => {
          const newText = prev ? prev + ' ' + transcript : transcript;
          return newText.trim();
        });
      });
    }
  };

  const handleAIFeedback = async () => {
    if (!answer.trim()) {
      toast({
        title: "请输入答案后再点评",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setAiComment(null);
    const feedback = await mockGetAIFeedback(
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

  const handleForwardToChat = () => {
    // First, forward the content to the chat context
    console.log("Forwarding to chat:", {
      question: `${questionContent}\n${questionText}`,
      answer
    });
    
    forwardToChat({
      question: `${questionContent}\n${questionText}`,
      answer
    });
    
    // Then, dispatch custom event to open the chat dialog
    const event = new CustomEvent("capyzen-chat-open");
    window.dispatchEvent(event);
    
    toast({
      title: "已转发到AI对话",
      description: "请在右下角聊天窗口中继续咨询",
      variant: "success",
    });
  };

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="在此输入您的答案..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1"
        />
        <Button
          variant={isRecording ? "destructive" : "secondary"}
          size="icon"
          onClick={toggleRecording}
          className="mt-1"
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
          disabled={isLoading}
          className="flex items-center gap-1 whitespace-nowrap px-3 py-2"
          title="让Capyzen点评"
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
      {aiComment && (
        <CapyzenComment feedback={aiComment} onForwardToChat={handleForwardToChat} />
      )}
    </div>
  );
};
