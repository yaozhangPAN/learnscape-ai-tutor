
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface QuestionModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const QuestionModule = ({ title, description, icon, count, color }: QuestionModuleProps) => {
  // Determine the route based on the title
  const getRoute = () => {
    if (title === "Question Bank") return "/question-bank";
    if (title === "Wrong Questions") return "/question-bank?filter=wrong";
    if (title === "Favorites") return "/question-bank?filter=favorites";
    if (title === "Leaderboard") return "/leaderboard";
    return "/";
  };

  // Determine button text based on the title
  const getButtonText = () => {
    if (title === "Leaderboard") return "View Rankings";
    return "View Questions";
  };

  return (
    <Link to={getRoute()} className="block">
      <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full bg-white border-2 border-gray-100">
        <div className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-2xl ${color}`}>
                {icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-learnscape-darkBlue">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-3xl font-bold text-learnscape-darkBlue">
                {count.toLocaleString()}
              </span>
              <span className="text-learnscape-blue flex items-center text-sm font-medium hover:underline group">
                {getButtonText()}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionModule;
