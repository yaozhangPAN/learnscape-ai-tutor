
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

const QuestionModule = ({ title, description, icon, count, onClick, color }: QuestionModuleProps) => {
  return (
    <Card className="card-hover border-4 border-white h-full cursor-pointer rounded-3xl shadow-lg" onClick={onClick}>
      <CardHeader className="bg-gradient-to-b from-yellow-100 to-white">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div className="text-2xl font-bold flex items-center">
            <span>{count}</span>
            {title === "Collected Stars" && <span className="ml-1">⭐</span>}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-learnscape-darkBlue mt-4">
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow bg-white">
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="bg-white rounded-b-3xl pt-0">
        <Button className={`w-full flex items-center justify-center rounded-full ${color.includes('bg-green-500') ? 'text-white' : ''}`}>
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
