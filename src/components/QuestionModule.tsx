
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type QuestionModuleProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  onClick?: () => void;
};

const QuestionModule = ({ title, description, icon, count, color, onClick }: QuestionModuleProps) => {
  // Mapping old color classes to new theme colors
  const getColorClass = (oldColor: string) => {
    const colorMap: Record<string, string> = {
      'bg-learnscape-blue': 'bg-learnscape-blue text-white',
      'bg-learnscape-purple': 'bg-learnscape-orange text-white', 
      'bg-blue-100': 'bg-learnscape-lightblue',
      'bg-purple-100': 'bg-learnscape-lightorange',
      'bg-green-100': 'bg-learnscape-lightgreen',
      'bg-yellow-100': 'bg-learnscape-yellow',
      'bg-red-100': 'bg-red-100',
      'bg-indigo-100': 'bg-blue-100',
      'text-blue-500': 'text-learnscape-blue',
      'text-purple-500': 'text-learnscape-orange',
      'text-green-500': 'text-learnscape-green',
      'text-yellow-500': 'text-yellow-500',
      'text-red-500': 'text-red-500',
      'text-indigo-500': 'text-blue-500',
    };
    
    return colorMap[oldColor] || 'bg-learnscape-lightblue';
  };

  const buttonColorClass = color.includes('bg-learnscape-blue') 
    ? 'bg-learnscape-blue hover:bg-blue-600 text-white' 
    : color.includes('bg-learnscape-purple') || color.includes('bg-purple-100')
      ? 'bg-learnscape-orange hover:bg-orange-600 text-white'
      : 'bg-learnscape-green hover:bg-green-600 text-white';

  return (
    <Card className="card-hover border border-gray-100 h-full cursor-pointer rounded-3xl overflow-hidden" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClass(color)}`}>
            {icon}
          </div>
          <div className="text-2xl font-bold text-learnscape-darkBlue">{count}</div>
        </div>
        <CardTitle className="text-xl font-bold text-learnscape-darkBlue mt-4">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full flex items-center justify-center rounded-full ${buttonColorClass}`}>
          Watch Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
