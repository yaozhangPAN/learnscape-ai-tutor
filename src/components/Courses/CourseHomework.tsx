
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeworkQuestionAnswer } from "./HomeworkQuestionAnswer";
import { CapyzenChatFloating } from "./CapyzenChatFloating";
import { supabase } from "@/integrations/supabase/client";
import type { HomeworkQuestion } from "./types";

interface ParsedQuestionContent {
  content?: string;
  question?: string;
  image_url?: string;
  [key: string]: any;
}

export const CourseHomework: React.FC = () => {
  const [homeworkQuestions, setHomeworkQuestions] = useState<HomeworkQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworkQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('level', '小六')
          .eq('subject', '华文')
          .eq('term', 'CA1')
          .order('created_at', { ascending: true }); // 按照创建时间排序

        if (error) throw error;

        const transformedQuestions: HomeworkQuestion[] = data.map(question => {
          let parsedContent: ParsedQuestionContent = {};
          if (typeof question.content === 'string') {
            try {
              parsedContent = JSON.parse(question.content);
            } catch (e) {
              console.error('Error parsing content:', e);
            }
          } else if (question.content && typeof question.content === 'object') {
            parsedContent = question.content;
          }

          return {
            id: question.id,
            title: question.title || '',
            content: parsedContent.content || '',
            question: parsedContent.question || '',
            imageUrl: parsedContent.image_url || undefined
          };
        });

        // 手动排序题目
        const orderMap = {
          '巧练题（一）': 0,
          '巧练题（二）': 1,
          '巧练题（三）': 2,
          '看图作文': 3
        };

        const orderedQuestions = transformedQuestions.sort((a, b) => 
          (orderMap[a.title] ?? 4) - (orderMap[b.title] ?? 4)
        );

        setHomeworkQuestions(orderedQuestions);
      } catch (error) {
        console.error('Error fetching homework questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeworkQuestions();
  }, []);

  if (isLoading) {
    return <div>Loading homework questions...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>课后作业</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {homeworkQuestions.map((question) => (
                <Card key={question.id} className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="whitespace-pre-wrap text-gray-700">{question.content}</div>
                    <div className="font-medium text-gray-900">{question.question}</div>
                    
                    {question.imageUrl && (
                      <div className="flex justify-center">
                        <img
                          src={question.imageUrl}
                          alt={question.title}
                          className="rounded max-w-full max-h-[340px] shadow-lg border border-gray-300"
                          style={{ background: "#fff" }}
                        />
                      </div>
                    )}
                    
                    <HomeworkQuestionAnswer
                      questionId={question.id}
                      questionContent={question.content}
                      questionText={question.question}
                      imageUrl={question.imageUrl}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <CapyzenChatFloating />
    </div>
  );
};
