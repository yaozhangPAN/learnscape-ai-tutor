
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeworkQuestionAnswer } from "./HomeworkQuestionAnswer";
import { CapyzenChatFloating } from "./CapyzenChatFloating";
import type { HomeworkQuestion } from "./types";

const mockHomeworkQuestions: HomeworkQuestion[] = [
  {
    id: "1",
    title: "巧练题（一）",
    content: "唐伯虎在杭州有一个非常要好的朋友，名叫祝枝山。他们兴趣一样，常常在一起写诗作画，交换学习的心得，因此建立了深厚的感情。两人不但称兄道弟，对各自的性格、脾气也十分了解。",
    question: "问题：从哪里可以看出唐伯虎和祝枝山友谊深厚？"
  },
  {
    id: "2",
    title: "巧练题（二）",
    content: "大发动机自高自大，谁也瞧不起，小螺丝更不在它的眼里了。大发动机天天夸耀自己：\"看，我多么伟大，只有我发动，才能使机器轮子转动起来。\" 小螺丝钉听了不言不语，照常埋头工作。于是大发动机更加大吹大擂起来，说一切都得听从它的指挥。",
    question: "问题：从哪里可以看出大发动机非常骄傲？"
  },
  {
    id: "3",
    title: "巧练题（三）",
    content: "妈妈去世后，爸爸又当爹又当妈，真是累坏了他。尽管工作忙碌，每天下班回家后还是无微不至地照顾我们三个兄弟姐妹的饮食起居。\n\n爸爸的生日快到了，哥哥姐妹都忙着准备礼物。在家里我最小，哥哥和姐姐都考上了大学后，爸爸几乎把所有的心血都放在我身上。我应该送什么给爸爸呢？\n\n哥哥寄了一封点歌的信件去电台。在爸爸生日那天，电台将会播出一首爸爸最爱听的歌曲，节目主持人会说明这是哥哥专门为爸爸的生日点的歌。\n\n爸爸平时省吃俭用，把最好的一切都留给了我们。因此，细心的姐姐用自己储蓄的零用钱买了一件上衣给爸爸，姐姐说爸爸一定会喜欢，因为妈妈在世时总喜欢买这类款式的上衣给爸爸。",
    question: "问题（一）：从哪里可以看出文中的爸爸很疼爱孩子？\n问题（二）：从哪里可以看出三个孩子很有孝心？"
  }
];

// 新增“看图作文”题
const compositionImage = "/lovable-uploads/79c5dc6f-48f4-4be9-bc6a-08855242b9b2.png";

export const CourseHomework: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>课后作业</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {mockHomeworkQuestions.map((question) => (
                <Card key={question.id} className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="whitespace-pre-wrap text-gray-700">{question.content}</div>
                    <div className="font-medium text-gray-900">{question.question}</div>
                    <HomeworkQuestionAnswer
                      questionId={question.id}
                      questionContent={question.content}
                      questionText={question.question}
                    />
                  </CardContent>
                </Card>
              ))}

              {/* 新增图片作文题 */}
              <Card className="border-2 border-purple-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">看图作文题</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={compositionImage}
                      alt="看图作文"
                      className="rounded max-w-full max-h-[340px] shadow-lg border border-gray-300"
                      style={{ background: "#fff" }}
                    />
                  </div>
                  <div className="font-medium text-gray-900 mt-2 mb-2">
                    请认真观察上面的图片，发挥想象力，用不少于80字写一段小故事（也可以合理使用图片中的词语和成语）。
                  </div>
                  <HomeworkQuestionAnswer
                    questionId="img1"
                    questionContent="请根据以上图片内容与右侧词语写一段小故事。"
                    questionText="至少80字，可以合理使用指定词语或成语。"
                  />
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <CapyzenChatFloating />
    </div>
  );
};
