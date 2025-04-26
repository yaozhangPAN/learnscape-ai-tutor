
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/question";

interface QuestionViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

// Answer data array
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

  const renderQuestionContent = () => {
    if (!question.content) {
      return <p className="text-gray-500">题目内容不可用</p>;
    }

    try {
      const content = typeof question.content === 'string' 
        ? JSON.parse(question.content) 
        : question.content;
      
      if (content.questionList && Array.isArray(content.questionList)) {
        // Handle question lists (multiple questions in one content)
        return (
          <div className="space-y-8">
            <h3 className="font-medium text-lg">{content.topic || '题目'}</h3>
            
            {content.questionList.map((subQuestion: any, index: number) => (
              <div key={index} className="space-y-4 border-l-2 border-learnscape-blue pl-4">
                <div className="font-medium">问题 {index + 1}:</div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {subQuestion.question}
                </div>

                {subQuestion.options && Array.isArray(subQuestion.options) && (
                  <RadioGroup defaultValue="">
                    {subQuestion.options.map((option: any, optIndex: number) => (
                      <div key={optIndex} className="flex items-center space-x-2 p-2">
                        <RadioGroupItem value={option.key || String(optIndex)} id={`q${index}-opt${optIndex}`} />
                        <Label htmlFor={`q${index}-opt${optIndex}`} className="text-sm">
                          {String.fromCharCode(65 + optIndex)}. {option.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
          </div>
        );
      } else if (content.question) {
        // Handle single question format
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">题目:</h3>
              <div>{content.question}</div>
            </div>

            {content.options && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">选项:</h3>
                <RadioGroup defaultValue="">
                  {Object.entries(content.options).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 p-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="text-sm">
                        {value as string}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        );
      } else {
        // Fallback for other content formats
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        );
      }
    } catch (error) {
      console.error('Error parsing question content:', error);
      return <p className="text-red-500">显示题目内容时出错</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{question.title}</DialogTitle>
          <DialogDescription>
            {question.subject && <span className="mr-3">科目: {question.subject}</span>}
            {question.level && <span className="mr-3">年级: {question.level}</span>}
            {question.term && <span>学期: {question.term}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {renderQuestionContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionViewer;
