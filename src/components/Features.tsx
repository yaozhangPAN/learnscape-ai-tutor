
import { Book, Brain, BarChart3, List, Star, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: <Book className="h-10 w-10 text-learnscape-blue" />,
      title: "Question Bank",
      description: "Access thousands of Singapore primary school curriculum questions with customizable practice sessions.",
      link: "/question-bank"
    },
    {
      icon: <List className="h-10 w-10 text-learnscape-purple" />,
      title: "Wrong Questions",
      description: "System automatically collects questions you answered incorrectly for targeted revision.",
      link: ""
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Favorites",
      description: "Save important questions for quick access and create your own study collection.",
      link: ""
    },
    {
      icon: <Brain className="h-10 w-10 text-green-500" />,
      title: "AI Tutor",
      description: "Get personalized help with challenging concepts through our AI-powered tutoring system.",
      link: "/ai-tutor"
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-red-500" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed insights into strengths and areas for improvement.",
      link: "/dashboard"
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      title: "Community Learning",
      description: "Connect with other students and share resources in a collaborative environment.",
      link: "/leaderboard"
    }
  ];

  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-learnscape-darkBlue sm:text-4xl">
            Features That Enhance Learning
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Learnscape offers comprehensive tools to support Singapore primary school students' educational journey.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className={`card-hover border border-gray-100 ${feature.link ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}>
              {feature.link ? (
                <Link to={feature.link} className="block h-full">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              ) : (
                <>
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-learnscape-darkBlue">
            Free For All Singapore Students
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Learnscape is committed to making quality education accessible to everyone.
            All our resources are completely free for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
