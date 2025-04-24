
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import { DictationFilters } from './DictationFilters';

const DictationPractice = () => {
  const [grade, setGrade] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [canRead, setCanRead] = useState(true);
  const [canWrite, setCanWrite] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 text-2xl font-bold text-learnscape-darkBlue">
          <BookOpen className="h-8 w-8" />
          <h1>听写练习</h1>
        </div>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center">练习设置</CardTitle>
          </CardHeader>
          <CardContent>
            <DictationFilters 
              grade={grade}
              lessonNumber={lessonNumber}
              canRead={canRead}
              canWrite={canWrite}
              onGradeChange={setGrade}
              onLessonChange={setLessonNumber}
              onReadChange={(value) => setCanRead(value === 'true')}
              onWriteChange={(value) => setCanWrite(value === 'true')}
            />
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center">听写练习</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500">
              准备开始听写练习
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DictationPractice;
