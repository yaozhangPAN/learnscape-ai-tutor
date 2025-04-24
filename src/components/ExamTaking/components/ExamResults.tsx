
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { ExamPaper, Question, UserAnswer } from "../types";

interface ExamResultsProps {
  exam: ExamPaper;
  score: number | null;
  userAnswers: UserAnswer[];
  onRetry: () => void;
  onReturn: () => void;
}

const ExamResults = ({ exam, score, userAnswers, onRetry, onReturn }: ExamResultsProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle className="h-6 w-6 text-green-500" />
            考试结束
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4">{exam.title}</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-600">学校: {exam.school}</p>
              <p className="text-gray-600">级别: {exam.level.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-600">类型: {exam.type}</p>
              <p className="text-gray-600">年份: {exam.year}</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">你的成绩</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold text-green-600">{score}</div>
              <div className="text-xl text-gray-500">/ {exam.totalMarks}</div>
              <div className="text-xl ml-auto">
                {score !== null && `${Math.round((score / exam.totalMarks) * 100)}%`}
              </div>
            </div>
            <Progress 
              value={score !== null ? (score / exam.totalMarks) * 100 : 0} 
              className="h-3 mb-2"
            />
          </div>
          
          <h3 className="text-lg font-bold mb-4">题目概览</h3>
          <div className="space-y-4">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">问题 {index + 1}</h4>
                  <div className={`px-2 py-1 rounded text-sm font-medium ${
                    userAnswers[index].isCorrect 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userAnswers[index].isCorrect ? '正确' : '不正确'}
                  </div>
                </div>
                {!userAnswers[index].isCorrect && question.correctAnswer && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">正确答案：</span>
                      {question.correctAnswer}
                    </p>
                  </div>
                )}
                <p className="mb-2 text-sm">{question.text.substring(0, 100)}...</p>
                <div className="flex justify-between text-sm">
                  <span>你的答案: {userAnswers[index].answer || '(没有答案)'}</span>
                  <span>得分: {userAnswers[index].marksAwarded}/{question.marks}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onReturn}>
            返回考试列表
          </Button>
          <Button onClick={onRetry}>
            重新考试
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExamResults;
