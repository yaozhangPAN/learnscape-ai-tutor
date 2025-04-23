
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Question } from "./types";

interface ExamQuestionProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
}

const ExamQuestion = ({ question, userAnswer, onAnswerChange }: ExamQuestionProps) => {
  const formatHtml = (text: string | undefined) => {
    if (!text) return "";
    return String(text).replace(/\n/g, "<br />");
  };

  const renderMcqOptions = () => {
    if (question.type !== "MCQ") return null;

    return (
      <RadioGroup 
        value={userAnswer} 
        onValueChange={onAnswerChange}
        className="mt-4 space-y-3"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
            <RadioGroupItem value={option.value} id={`option-${question.id}-${index}`} />
            <Label 
              htmlFor={`option-${question.id}-${index}`} 
              className="text-base cursor-pointer w-full"
            >
              <div dangerouslySetInnerHTML={{ __html: formatHtml(option.label) }} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const renderShortAnswer = () => {
    if (question.type !== "ShortAnswer") return null;

    return (
      <div className="mt-4">
        <Textarea
          placeholder="在此输入你的答案..."
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <div className="text-lg font-medium mb-4">
          <div dangerouslySetInnerHTML={{ __html: formatHtml(question.text) }} />
        </div>
        
        {question.image && (
          <div className="my-4">
            <img 
              src={question.image} 
              alt={`Question ${question.id} image`} 
              className="max-w-full rounded border border-gray-200"
            />
          </div>
        )}
      </div>
      
      {renderMcqOptions()}
      {renderShortAnswer()}
    </div>
  );
};

export default ExamQuestion;
