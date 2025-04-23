
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeworkQuestionAnswer } from "./HomeworkQuestionAnswer";
import { CapyzenChatFloating } from "./CapyzenChatFloating";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from 'react-router-dom';
import type { HomeworkQuestion } from "./types";
import { useI18n } from "@/contexts/I18nContext";

interface ParsedQuestionContent {
  content?: string;
  question?: string;
  image_url?: string;
  [key: string]: any;
}

export const CourseHomework: React.FC = () => {
  const [homeworkQuestions, setHomeworkQuestions] = useState<HomeworkQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { courseId } = useParams<{ courseId: string }>();
  const { lang } = useI18n();

  useEffect(() => {
    const fetchHomeworkQuestions = async () => {
      try {
        // For masterclass course, use predefined questions if no data from API
        if (courseId === 'psle-chinese-masterclass') {
          // Try to get from database first
          const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('level', '小六')
            .eq('subject', '华文')
            .eq('term', 'CA1')
            .order('created_at', { ascending: true });

          if (error) throw error;

          if (data && data.length > 0) {
            // Use data from database if available
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
          } else {
            // Use predefined questions if none in database
            const predefinedQuestions: HomeworkQuestion[] = [
              {
                id: '1',
                title: '巧练题（一）',
                content: '唐伯虎在杭州有一个非常要好的朋友，名叫祝枝山。他们兴趣一样，常常在一起写诗作画，交换学习的心得，因此建立了深厚的感情。两人不但称兄道弟，对各自的性格、脾气也十分了解。',
                question: '问题: 从哪里可以看出唐伯虎和祝枝山友谊深厚?',
                imageUrl: undefined
              },
              {
                id: '2',
                title: '巧练题（二）',
                content: '大发动机自高自大，谁也瞧不起，小螺（liú）丝更不在它的眼里了。大发动机天天夸耀自己: "看，我多么伟大，只有我发动，才能使机器轮子转动起来。"\n小螺丝听了不言不语，照常埋头工作。于是大发动机更加大吹大擂起来，说一切都得听从它的指挥。',
                question: '问题: 从哪里可以看出大发动机非常骄傲?',
                imageUrl: undefined
              },
              {
                id: '3',
                title: '巧练题（三）',
                content: '妈妈去世后，爸爸又当爹又当妈，真是累坏了他。尽管工作忙碌，每天下班回家后还是无微不至地照顾我们三个兄弟姐妹的饮食起居。\n爸爸的生日快到了，哥哥姐姐都忙着准备礼物。在家里我最小，哥哥和姐姐都考上了大学后，爸爸几乎把所有的心血都放在我身上。我应该送什么给爸爸呢？\n哥哥寄了一封点歌的信件去电台。在爸爸生日那天，电台将会播出一首爸爸最爱听的歌曲，节目主持人会说明这是哥哥专门为爸爸的生日点的歌。\n爸爸平时省吃俭用，把最好的一切都留给了我们。因此，细心的姐姐用自己储蓄的零用钱买了一件上衣给爸爸。姐姐说爸爸一定会喜欢，因为妈妈在世时总喜欢买这类款式的上衣给爸爸。',
                question: '问题(一): 从哪里可以看出文中的爸爸很疼爱孩子?\n问题(二): 从哪里可以看出三个孩子很有孝心?',
                imageUrl: undefined
              },
              {
                id: '4',
                title: '看图作文',
                content: '请根据下面的图片，写一篇作文。',
                question: '',
                imageUrl: '/lovable-uploads/a8195f04-2d55-4a47-8de8-f8e6861076d0.png'
              }
            ];
            setHomeworkQuestions(predefinedQuestions);
          }
        } else {
          // For other courses, fetch from database
          let query = supabase
            .from('questions')
            .select('*')
            .eq('level', '小六')
            .eq('subject', '华文');
            
          const { data, error } = await query.order('created_at', { ascending: true });

          if (error) throw error;

          if (data && data.length > 0) {
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
            setHomeworkQuestions(transformedQuestions);
          }
        }
      } catch (error) {
        console.error('Error fetching homework questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeworkQuestions();
  }, [courseId]);

  if (isLoading) {
    return <div>{lang === 'zh' ? '加载作业中...' : 'Loading homework questions...'}</div>;
  }

  if (homeworkQuestions.length === 0) {
    return <div className="text-center p-6">
      {lang === 'zh' ? '暂无作业' : 'No homework available for this course.'}
    </div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{lang === 'zh' ? '课后作业' : 'Homework'}</CardTitle>
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
