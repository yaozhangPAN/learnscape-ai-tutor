
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { GuidedWritingChat } from "./GuidedWritingChat";
import type { QuestionAnswerProps } from "./types";

export const HomeworkQuestionAnswer: React.FC<QuestionAnswerProps> = ({
  questionId,
  questionContent,
  questionText
}) => {
  const [currentStep, setCurrentStep] = useState<'understanding' | 'outlining' | 'drafting' | 'revising'>('understanding');
  const { toast } = useToast();
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();
  const { isPremium, loadingSubscription, startCheckoutSession } = useSubscription();

  const handleStepComplete = () => {
    switch (currentStep) {
      case 'understanding':
        setCurrentStep('outlining');
        break;
      case 'outlining':
        setCurrentStep('drafting');
        break;
      case 'drafting':
        setCurrentStep('revising');
        break;
      case 'revising':
        // Final step completed
        toast({
          title: "恭喜完成作文！",
          description: "你已经完成了所有写作步骤。",
          variant: "success"
        });
        break;
    }
  };

  const toggleRecording = () => {
    if (!isPremium) {
      toast({
        title: "仅限付费会员",
        description: "开通会员即可使用语音输入功能",
        variant: "destructive"
      });
      return;
    }
    if (isRecording) {
      stopRecording();
    } else {
      startRecording((transcript: string) => {
        // Handle voice input if needed
        console.log("Voice input:", transcript);
      });
    }
  };

  // Premium restriction notice
  const premiumHint = (
    <div className="flex items-center text-xs text-orange-600 mt-2 gap-1">
      <Lock className="w-4 h-4 mr-1" />
      仅付费会员可使用AI辅导，
      <button
        className="underline text-blue-600 hover:text-orange-500"
        onClick={async () => {
          const url = await startCheckoutSession("premium_subscription");
          if (url) window.location.href = url;
        }}
      >
        立即开通
      </button>
    </div>
  );

  if (!isPremium && !loadingSubscription) {
    return premiumHint;
  }

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center gap-2 justify-end">
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
      </div>
      
      <GuidedWritingChat
        imageUrl={questionContent}
        currentStep={currentStep}
        onStepComplete={handleStepComplete}
      />
    </div>
  );
};
