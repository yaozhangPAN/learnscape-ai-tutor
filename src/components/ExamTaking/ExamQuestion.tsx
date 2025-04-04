
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
  const renderMcqOptions = () => {
    if (question.type !== "MCQ" || !question.options) return null;

    return (
      <RadioGroup 
        value={userAnswer} 
        onValueChange={onAnswerChange}
        className="mt-4 space-y-3"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`option-${question.id}-${index}`} />
            <Label 
              htmlFor={`option-${question.id}-${index}`} 
              className="text-base cursor-pointer"
            >
              {option.label}
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
          placeholder="Enter your answer here..."
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
    );
  };

  const renderLongAnswer = () => {
    if (question.type !== "Essay") return null;

    return (
      <div className="mt-4">
        <Textarea
          placeholder="Enter your detailed answer here..."
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: question.text }} />
        
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
      
      {question.type === "MCQ" && renderMcqOptions()}
      {question.type === "ShortAnswer" && renderShortAnswer()}
      {question.type === "Essay" && renderLongAnswer()}
    </div>
  );
};

export default ExamQuestion;
