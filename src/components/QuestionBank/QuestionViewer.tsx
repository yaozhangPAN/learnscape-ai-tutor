
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Question } from "@/types/question";

interface QuestionViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  isOpen,
  onOpenChange,
  question,
}) => {
  if (!question) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{question.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            {typeof question.content === 'object' && 'question' in question.content ? (
              <div dangerouslySetInnerHTML={{ __html: question.content.question }} />
            ) : (
              <p>Question content not available</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionViewer;
