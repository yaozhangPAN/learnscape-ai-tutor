
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TextInputQuestionProps {
  questionId: string;
  question: string;
  correctValue: string;
  isSubmitted: boolean;
  onSubmit: () => void;
  isUserLoggedIn: boolean;
}

const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  questionId,
  question,
  correctValue,
  isSubmitted,
  onSubmit,
  isUserLoggedIn,
}) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Type your answer here"
        className="w-full mt-2"
        disabled={isSubmitted}
      />

      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="default"
          className="bg-learnscape-blue text-white"
          disabled={!isUserLoggedIn || isSubmitted}
          onClick={onSubmit}
        >
          Submit
        </Button>
        {!isUserLoggedIn && (
          <span className="text-xs text-gray-500">
            Please log in to submit your answer.
          </span>
        )}
      </div>

      {isSubmitted && (
        <div className="mt-3">
          <span className="inline-block px-3 py-1 rounded text-xs bg-gray-200 text-gray-700">
            Correct Answer: <span className="font-semibold">{correctValue}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default TextInputQuestion;
