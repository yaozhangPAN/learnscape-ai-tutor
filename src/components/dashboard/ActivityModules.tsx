
import { Link } from "react-router-dom";
import { Book, BookX, Star } from "lucide-react";

interface ActivityModule {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  isLoading: boolean;
  link: string;
}

interface ActivityModulesProps {
  modules: ActivityModule[];
}

const ActivityModules = ({ modules }: ActivityModulesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {modules.map((module, index) => (
        <Link key={index} to={module.link}>
          <div className={`rounded-3xl ${module.color} p-6 shadow-sm flex flex-col items-center hover:opacity-90 transition-opacity`}>
            <div className="mb-2">{module.icon}</div>
            <h2 className="text-xl font-bold mb-1 text-white">{module.title}</h2>
            <div className="text-white/90 text-sm font-medium mb-2">{module.description}</div>
            <div className="text-3xl font-extrabold text-white mb-0">
              {module.isLoading ? (
                <div className="w-16 h-8 bg-white/20 rounded animate-pulse"></div>
              ) : (
                module.count
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ActivityModules;
