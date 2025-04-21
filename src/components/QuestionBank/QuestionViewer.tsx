import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface Question {
  id: number;
  title: string;
  content: any;
  subject: string;
  type: string;
  level: string;
  term: string;
  date: string;
}

interface QuestionViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

const anwser = [
  {
    id: "Q1",
    value: "2"
  },
  {
    id: "Q2",
    value: "1"
  },
  {
    id: "Q3",
    value: "4"
  },
  {
    id: "Q4",
    value: "3"
  },
  {
    id: "Q5",
    value: "3"
  },
  {
    id: "Q6",
    value: "1"
  },
  {
    id: "Q7",
    value: "4"
  },
  {
    id: "Q8",
    value: "4"
  },
  {
    id: "Q9",
    value: "3"
  },
  {
    id: "Q10",
    value: "2"
  },
  {
    id: "Q11",
    value: "1"
  },
  {
    id: "Q12",
    value: "3"
  },
  {
    id: "Q13",
    value: "2"
  },
  {
    id: "Q14",
    value: "4"
  },
  {
    id: "Q15",
    value: "3"
  },
  {
    id: "Q16",
    value: "4"
  },
  {
    id: "Q17",
    value: "2"
  },
  {
    id: "Q18",
    value: "3"
  },
  {
    id: "Q19",
    value: "1"
  },
  {
    id: "Q20",
    value: "3"
  },
  {
    id: "Q21",
    value: "2"
  },
  {
    id: "Q22",
    value: "3"
  },
  {
    id: "Q23",
    value: "1"
  },
  {
    id: "Q24",
    value: "3"
  },
  {
    id: "Q25",
    value: "4"
  },
  {
    id: "Q26",
    value: "6"
  },
  {
    id: "Q27",
    value: "8"
  },
  {
    id: "Q28",
    value: "7"
  },
  {
    id: "Q29",
    value: "3"
  },
  {
    id: "Q30",
    value: "4"
  },
  {
    id: "Q31",
    value: "3"
  },
  {
    id: "Q32",
    value: "2"
  },
  {
    id: "Q33",
    value: "明华,我知道你喜欢喝奶茶,想约你一起去明月光茶馆喝奶茶。明月光茶馆新店 6 月 8 日开幕,开幕当天有特别优惠,只要购买一份套餐就能得到一张贵宾卡。我们俩可以买一份双人好友套餐,我想得到这个特别优惠,你可以 6 月 8 日上午 11 点和我一起去喝奶茶吗?"
  },
  {
    id: "Q34",
    value: "连忙/赶紧"
  },
  {
    id: "Q35",
    value: "惭愧"
  },
  {
    id: "Q36",
    value: "作者每当看到哥哥能自己上学,能和朋友一起出去,能去帮妈妈买东西等等,就很想像哥哥一样可以做这些事情,他问爸爸什么时候才能像哥哥那样,但爸爸说等他长大再说,所以作者想快快长大。"
  },
  {
    id: "Q37",
    value: "起初爸爸不认为作者长大了, 作者感到很委屈,他认为哥哥和他只差三岁,觉得自己已经长大了。"
  },
  {
    id: "Q38",
    value: "爸爸一直到最后才认同作者长大了, 原因是作者和明华撞到一位瘦小的老婆婆,他没有像明华一样溜走,而是帮老婆婆拾起散落在地上的菜,并送老婆婆回家。爸爸认为这件事说明作者懂得为自己的行为负责,这才认同作者长大了。"
  },
  {
    id: "Q39",
    value: "这句话的意思是作者知道爸爸看到了明华和作者撞倒老婆婆,但是爸爸当时只是在人群中默默地看着他,这让他心里很慌,后来作者回到家,发现爸爸一直在他的房间里,这让作者感到更加不安,到了晚餐时间,爸爸坐下来后便看着他,他因此猜想爸爸一定会严厉批评他。"
  },
  {
    id: "Q40",
    value: "我认为当父母看到�����子懂得为自己的行为负责时,就会认为孩子“长大” 了。文中的作者和朋友明华去巴刹时,明华的脚踏车撞到了一位瘦小的老婆婆,作者没有像明华一样溜走,而是帮老婆婆拾起散落在地上的菜,并送老婆婆回家。作者懂得为自己的行为负责,愿意承担自己行为的后果,所以经过这件事以后,作者的爸爸认为作者长大了。"
  }
];

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  isOpen,
  onOpenChange,
  question
}) => {
  const { user } = useAuth();
  const [submittedIndexes, setSubmittedIndexes] = useState<{[key: number]: boolean}>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: { value: string; optionId: string } | undefined
  }>({});

  const renderTopicWithLineBreaks = (topic: string) => {
    if (!topic) return null;
    const html = topic.replace(/\n/g, "<br />");
    return (
      <div
        className="text-base mb-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const renderQuestionContent = (content: any) => {
    if (!content) return <p className="text-gray-500">No content available for this question.</p>;

    try {
      const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

      if (Array.isArray(parsedContent.questionList)) {
        return (
          <div className="space-y-8">
            {parsedContent.topic && (
              <div className="mb-6 mt-2">
                {renderTopicWithLineBreaks(parsedContent.topic)}
              </div>
            )}
            {parsedContent.questionList.map((questionItem, index) => {
              const isSubmitted = submittedIndexes[index] || false;
              const selectedObj = selectedOptions[index];
              const selectedValue = selectedObj?.value ?? "";

              const answerObj = anwser.find(a => a.id === questionItem.id);
              const correctValue = answerObj ? answerObj.value : "N/A";

              return (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-base font-medium mb-2">{questionItem.id}:</div>
                    <p className="text-sm mb-4">{questionItem.question}</p>
                    {Array.isArray(questionItem.options) && questionItem.options.length === 0 ? (
                      <>
                        <Input
                          placeholder="Type your answer here"
                          className="w-full mt-2"
                          disabled={isSubmitted}
                        />
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 rounded text-xs bg-gray-200 text-gray-700">
                            Correct Answer: <span className="font-semibold">{correctValue}</span>
                          </span>
                        </div>
                      </>
                    ) : questionItem.options ? (
                      <div className="space-y-4">
                        <RadioGroup
                          value={selectedValue}
                          onValueChange={(val) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [index]: {
                                value: val,
                                optionId: questionItem?.options?.[parseInt(val)]?.key
                                  ? `${questionItem.id}-${questionItem.options[parseInt(val)].key}`
                                  : `${questionItem.id}-${val}`
                              }
                            }));
                          }}
                          disabled={isSubmitted}
                        >
                          {questionItem.options.map((optionItem, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 p-2">
                              <RadioGroupItem
                                value={String(optionIndex)}
                                id={`${index}-${optionIndex}`}
                                disabled={isSubmitted}
                              />
                              <label htmlFor={`${index}-${optionIndex}`} className="text-sm">
                                {typeof optionItem.value === 'string'
                                  ? optionItem.value
                                  : JSON.stringify(optionItem.value)}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ) : null}

                    <div className="mt-4 flex items-center gap-3">
                      <Button
                        variant="default"
                        className="bg-learnscape-blue text-white"
                        disabled={!user || isSubmitted}
                        onClick={() => {
                          setSubmittedIndexes((prev) => ({
                            ...prev,
                            [index]: true
                          }));
                        }}
                      >
                        Submit
                      </Button>
                      {!user && (
                        <span className="text-xs text-gray-500">
                          Please log in to submit your answer.
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      {isSubmitted && selectedObj?.optionId && (
                        (() => {
                          const [questionId, questionValue] = selectedObj.optionId.split("-");
                          const answerObj = anwser.find(a => a.id === questionId);
                          const correctValue = answerObj ? answerObj.value : "N/A";
                          const isCorrect = questionValue === correctValue;
                          const labelBg =
                            isCorrect
                              ? "bg-green-200 text-green-900"
                              : "bg-red-500 text-white";

                          return (
                            <span className={`inline-block px-3 py-1 rounded text-xs ${labelBg}`}>
                              <span className="font-semibold mr-1">
                                {isCorrect ? "Correct" : "Wrong"}
                              </span>
                              {!isCorrect && (
                                <span>
                                  , the correct answer is: <span className="font-semibold">{correctValue}</span>
                                </span>
                              )}
                            </span>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-base font-medium mb-2">Internal Error</div>
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error parsing question content:', error);
      return <p className="text-red-500">Error displaying question content</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question?.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {question && renderQuestionContent(question.content)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionViewer;
