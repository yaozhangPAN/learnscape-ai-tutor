
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type QuestionModuleProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
};

const QuestionModule = ({ title, description, icon, count, color }: QuestionModuleProps) => {
  return (
    <Card className="card-hover border border-gray-100 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div className="text-2xl font-bold">{count}</div>
        </div>
        <CardTitle className="text-xl font-bold text-learnscape-darkBlue mt-4">
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full flex items-center justify-center ${color.includes('bg-learnscape-blue') ? 'text-white' : ''}`}>
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
