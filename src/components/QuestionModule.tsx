
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
  // Special treatment for Leaderboard if needed
  const isLeaderboard = title.toLowerCase() === "leaderboard";
  
  // Get a pastel background color based on the title
  const getBgColor = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('exam')) return 'bg-gradient-to-br from-blue-50 to-indigo-50';
    if (titleLower.includes('paper')) return 'bg-gradient-to-br from-green-50 to-teal-50';
    if (titleLower.includes('worksheet')) return 'bg-gradient-to-br from-yellow-50 to-amber-50';
    if (titleLower.includes('leader')) return 'bg-gradient-to-br from-purple-50 to-pink-50';
    if (titleLower.includes('question')) return 'bg-gradient-to-br from-rose-50 to-red-50';
    return 'bg-gradient-to-br from-orange-50 to-amber-50';
  };
  
  return (
    <Card className={`card-hover border-2 h-full cursor-pointer transition-all duration-300 ${getBgColor()}`} onClick={onClick}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
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
        <Button className={`w-full flex items-center justify-center rounded-full ${color.includes('bg-learnscape-blue') ? 'text-white' : ''} transition-all hover:shadow-lg`}>
          {isLeaderboard ? "View Rankings" : "View All"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
