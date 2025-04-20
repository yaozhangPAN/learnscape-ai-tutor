
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const renderQuestionContent = (content: any) => {
    if (!content) return <p className="text-gray-500">No content available for this question.</p>;

    try {
      const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
      
      if (Array.isArray(parsedContent)) {
        return (
          <div className="space-y-8">
            {parsedContent.map((questionItem, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Question {index + 1}:</h3>
                  <p className="text-sm mb-4">{questionItem.question}</p>

                  {questionItem.options && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Options:</h4>
                      <RadioGroup defaultValue={questionItem.correctAnswer}>
                        {Object.entries(questionItem.options).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2 p-2">
                            <RadioGroupItem value={key} id={`${index}-${key}`} />
                            <label htmlFor={`${index}-${key}`} className="text-sm">
                              {typeof value === 'string' ? value : JSON.stringify(value)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
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
            <h3 className="text-lg font-medium mb-2">Question:</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {JSON.stringify(parsedContent.question, null, 2)}
            </pre>
          </div>

          {parsedContent.options && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Options:</h3>
              <RadioGroup defaultValue={parsedContent.correctAnswer}>
                {Object.entries(parsedContent.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 p-2">
                    <RadioGroupItem value={key} id={key} />
                    <label htmlFor={key} className="text-sm">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
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
