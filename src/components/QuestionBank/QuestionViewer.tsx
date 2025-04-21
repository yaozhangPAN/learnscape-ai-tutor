
import React from "react";
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

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  isOpen,
  onOpenChange,
  question
}) => {
  const { user } = useAuth();

  // Renders topic with line breaks and HTML
  const renderTopicWithLineBreaks = (topic: string) => {
    if (!topic) return null;
    // Replace \n with <br/> for HTML rendering
    const html = topic.replace(/\n/g, "<br />");
    return (
      <div
        className="text-base mb-2"
        // Be careful here: this will render HTML. Only use on trusted content!
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
            {parsedContent.questionList.map((questionItem, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-base font-medium mb-2">{questionItem.id}:</div>
                  <p className="text-sm mb-4">{questionItem.question}</p>

                  {/* Text box if options is an empty array, else show RadioGroup */}
                  {Array.isArray(questionItem.options) && questionItem.options.length === 0 ? (
                    <Input
                      placeholder="Type your answer here"
                      className="w-full mt-2"
                    />
                  ) : questionItem.options ? (
                    <div className="space-y-4">
                      <RadioGroup defaultValue={questionItem.correctAnswer}>
                        {questionItem.options.map((optionItem, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2 p-2">
                            <RadioGroupItem value={optionIndex} id={`${index}-${optionIndex}`} />
                            <label htmlFor={`${index}-${optionIndex}`} className="text-sm">
                              {typeof optionItem.value === 'string' ? optionItem.value : JSON.stringify(optionItem.value)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ) : null}

                  {/* Submit button, only enabled if logged in */}
                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      variant="default"
                      className="bg-learnscape-blue text-white"
                      disabled={!user}
                    >
                      Submit
                    </Button>
                    {!user && (
                      <span className="text-xs text-gray-500">
                        Please log in to submit your answer.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }

      // Fallback for single question format
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

