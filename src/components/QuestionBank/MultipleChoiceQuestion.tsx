
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface Option {
  key: string;
  value: string;
}

interface MultipleChoiceQuestionProps {
  questionId: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  isUserLoggedIn: boolean;
  correctAnswer: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionId,
  options,
  selectedValue,
  onValueChange,
  isSubmitted,
  onSubmit,
  isUserLoggedIn,
  correctAnswer,
}) => {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedValue}
        onValueChange={onValueChange}
        disabled={isSubmitted}
      >
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-2 p-2">
            <RadioGroupItem
              value={String(optionIndex)}
              id={`${questionId}-${optionIndex}`}
              disabled={isSubmitted}
            />
            <label htmlFor={`${questionId}-${optionIndex}`} className="text-sm">
              {typeof option.value === 'string'
                ? option.value
                : JSON.stringify(option.value)}
            </label>
          </div>
        ))}
      </RadioGroup>

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

      {isSubmitted && selectedValue && (
        <span className={`inline-block px-3 py-1 rounded text-xs ${
          String(options[parseInt(selectedValue)]?.key) === correctAnswer
            ? "bg-green-200 text-green-900"
            : "bg-red-500 text-white"
        }`}>
          <span className="font-semibold mr-1">
            {String(options[parseInt(selectedValue)]?.key) === correctAnswer ? "Correct" : "Wrong"}
          </span>
          {String(options[parseInt(selectedValue)]?.key) !== correctAnswer && (
            <span>
              , the correct answer is: <span className="font-semibold">{correctAnswer}</span>
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
