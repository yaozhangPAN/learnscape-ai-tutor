
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import { DictationFilters } from './DictationFilters';
import { useCharacterList } from '@/hooks/useCharacterList';

const DictationPractice = () => {
  // Initialize with empty strings to not filter initially
  const [grade, setGrade] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  // Initialize with null instead of boolean to not filter initially
  const [canRead, setCanRead] = useState<boolean | null>(null);
  const [canWrite, setCanWrite] = useState<boolean | null>(null);

  const { characters, loading } = useCharacterList(
    grade,
    lessonNumber,
    canRead as boolean,
    canWrite as boolean
  );

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
              canRead={canRead === null ? true : canRead}
              canWrite={canWrite === null ? true : canWrite}
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
            {loading ? (
              <div className="text-center text-gray-500">加载中...</div>
            ) : characters.length === 0 ? (
              <div className="text-center text-gray-500">
                没有找到符合条件的汉字
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className="flex items-center justify-center p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl">{char.character}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DictationPractice;
