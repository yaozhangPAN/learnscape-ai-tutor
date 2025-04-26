
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

interface QuestionCardProps {
  question: {
    id: number | string;
    title: string;
    subject?: string;
    level?: string;
    term?: string;
    date?: string;
    content?: any;
  };
  onView: (question: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onView }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString.slice(0, 10).replace(/-/g, '/');
      }
      
      return formatDistance(date, new Date(), { 
        addSuffix: true,
        locale: zhCN
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{question.title}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          {question.subject && (
            <p>科目: <span className="text-foreground">{question.subject}</span></p>
          )}
          {question.level && (
            <p>年级: <span className="text-foreground">{question.level}</span></p>
          )}
          {question.term && (
            <p>学期: <span className="text-foreground">{question.term}</span></p>
          )}
          {question.date && (
            <p>日期: <span className="text-foreground">{formatDate(question.date)}</span></p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button 
          className="w-full justify-center bg-learnscape-blue" 
          onClick={() => onView(question)}
        >
          <Eye className="h-4 w-4 mr-2" /> 查看题目
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
