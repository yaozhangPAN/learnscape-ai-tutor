
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
  
  return (
    <Card 
      className="card-hover border-2 border-[#03353E] h-full cursor-pointer bg-learnscape-mint shadow-lg rounded-3xl" 
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} border border-[#03353E]`}>
            {icon}
          </div>
          <div className="text-2xl font-bold">{count}</div>
        </div>
        <CardTitle className="text-xl font-bold text-[#03353E] mt-4">
          {title}
        </CardTitle>
        <CardDescription className="text-[#03353E]/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-[#03353E]/60">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full flex items-center justify-center rounded-full border border-[#03353E] ${
            color.includes('bg-learnscape-blue') 
              ? 'bg-[#4ABA79] hover:bg-[#4ABA79]/90 text-[#03353E]' 
              : 'bg-[#F9B64C] hover:bg-[#F9B64C]/90 text-[#03353E]'
          }`}
        >
          {isLeaderboard ? "View Rankings" : "View All"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
