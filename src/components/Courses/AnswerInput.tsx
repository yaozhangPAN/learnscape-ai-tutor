
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface AnswerInputProps {
  answer: string;
  setAnswer: (val: string) => void;
  isRecording: boolean;
  startRecording: (callback: (transcript: string) => void) => void;
  stopRecording: () => void;
  loadingSubscription: boolean;
  isPremium: boolean;
  onNotPremium: () => void;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  answer,
  setAnswer,
  isRecording,
  startRecording,
  stopRecording,
  loadingSubscription,
  isPremium,
  onNotPremium
}) => {
  const handleRecording = () => {
    if (!isPremium) {
      onNotPremium();
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

  return (
    <div className="flex items-end gap-2">
      <Textarea
        placeholder="在此输入您的答案..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="flex-1"
        disabled={false}
      />
      <Button
        variant={isRecording ? "destructive" : "secondary"}
        size="icon"
        onClick={handleRecording}
        className="mt-1"
        disabled={isRecording ? false : loadingSubscription}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </div>
  );
};
