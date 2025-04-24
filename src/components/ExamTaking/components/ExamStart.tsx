
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamPaper } from "../types";

interface ExamStartProps {
  exam: ExamPaper;
  onStart: () => void;
  onReturn: () => void;
}

const ExamStart = ({ exam, onStart, onReturn }: ExamStartProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          <CardTitle className="text-2xl">{exam.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-600">学校: {exam.school}</p>
              <p className="text-gray-600">科目: {exam.subject}</p>
              <p className="text-gray-600">级别: {exam.level.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-600">类型: {exam.type}</p>
              <p className="text-gray-600">年份: {exam.year}</p>
              <p className="text-gray-600">时长: {exam.durationMinutes} 分钟</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">考试说明</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>你有 {exam.durationMinutes} 分钟完成这次考试。</li>
              <li>考试包含 {exam.questions.length} 道题目，总分 {exam.totalMarks} 分。</li>
              <li>可以使用导航按钮在题目之间切换。</li>
              <li>你的进度会自动保存。</li>
              <li>可以随时点击"提交考试"按钮提交。</li>
              <li>提交后，不能重新开始考试。</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onReturn}>
            返回考试列表
          </Button>
          <Button onClick={onStart}>
            开始考试
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExamStart;
