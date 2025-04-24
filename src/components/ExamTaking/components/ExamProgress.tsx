
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserAnswer } from "../types";

interface ExamProgressProps {
  userAnswers: UserAnswer[];
  totalQuestions: number;
  onQuestionSelect: (index: number) => void;
  onSubmit: () => void;
}

const ExamProgress = ({ 
  userAnswers, 
  totalQuestions, 
  onQuestionSelect,
  onSubmit
}: ExamProgressProps) => {
  return (
    <Card className="sticky top-4">
      <CardHeader className="border-b">
        <CardTitle>作答进度</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-5 gap-2">
          {userAnswers.map((answer, index) => (
            <Button
              key={index}
              variant={answer.isAnswered ? "outline" : "ghost"}
              className={`h-10 w-10 p-0 ${
                answer.isAnswered ? "border-green-500 border-2" : "border"
              }`}
              onClick={() => onQuestionSelect(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2"></div>
            <span className="text-sm">已回答</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">
            已回答: {userAnswers.filter(a => a.isAnswered).length} / {totalQuestions}
          </p>
          <Progress 
            value={(userAnswers.filter(a => a.isAnswered).length / totalQuestions) * 100} 
            className="h-2"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant="destructive"
          onClick={onSubmit}
        >
          提交考试
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamProgress;
