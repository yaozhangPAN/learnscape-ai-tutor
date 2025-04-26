
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Question } from "@/types/question";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

// Add the answer data array that was missing
export const answers = [
  { id: "1", value: "A" },
  { id: "2", value: "B" },
  { id: "3", value: "C" },
  { id: "4", value: "D" },
  { id: "5", value: "E" }
];

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  isOpen,
  onOpenChange,
  question,
}) => {
  if (!question) return null;

  // Parse the question content if it's a string
  const getQuestionContent = () => {
    if (!question.content) return { question: "Content not available", options: {} };
    
    if (typeof question.content === 'string') {
      try {
        return JSON.parse(question.content);
      } catch (error) {
        console.error("Error parsing question content:", error);
        return { question: question.content, options: {} };
      }
    }
    
    return question.content;
  };

  const content = getQuestionContent();
  const questionText = content.question || "Question text not available";
  const options = content.options || {};
  const hasOptions = Object.keys(options).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{question.title || "Untitled Question"}</DialogTitle>
          <DialogDescription>
            {question.subject} - {question.level} - {question.term}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Question:</h3>
            <div dangerouslySetInnerHTML={{ __html: questionText }} />
          </div>

          {hasOptions && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Options:</h3>
              <RadioGroup>
                {Object.entries(options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                    <RadioGroupItem value={key} id={`option-${key}`} />
                    <Label htmlFor={`option-${key}`} className="cursor-pointer flex-1">
                      {value as string}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {content.answer && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Answer:</h3>
              <div dangerouslySetInnerHTML={{ __html: content.answer }} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionViewer;
