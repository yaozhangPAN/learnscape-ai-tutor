
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface QuestionRevealAnswerProps {
  showAnswer: boolean;
  isLoadingAnswer: boolean;
  dbAnswer: string;
  onToggle: () => void;
}

export const QuestionRevealAnswer: React.FC<QuestionRevealAnswerProps> = ({
  showAnswer,
  isLoadingAnswer,
  dbAnswer,
  onToggle,
}) => (
  <div className="mt-4">
    <Button
      onClick={onToggle}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isLoadingAnswer}
    >
      <Eye className="h-4 w-4" />
      {isLoadingAnswer ? "加载中..." : showAnswer ? "隐藏答案" : "查看答案"}
    </Button>
    {showAnswer && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-800 whitespace-pre-wrap">{dbAnswer}</p>
      </div>
    )}
  </div>
);
