
import { Book, Brain, BarChart3, List, Star, Users, FileText, Video, Zap, Award, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Features = () => {
  const freeFeatures = [
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
      icon: <Flame className="h-10 w-10 text-orange-500" />,
      title: "Streak",
      description: "Track your daily learning progress and maintain your study streak for continuous improvement.",
      link: "/dashboard"
    },
    {
      icon: <FileText className="h-10 w-10 text-green-500" />,
      title: "Worksheets",
      description: "Free test papers and worksheets for downloading and practice at your own pace.",
      link: "/worksheets"
    },
    {
      icon: <Award className="h-10 w-10 text-indigo-500" />,
      title: "Leaderboard",
      description: "Encourage healthy competition and track your ranking among peer students to motivate consistent learning.",
      link: "/leaderboard"
    }
  ];

  const premiumFeatures = [
    {
      icon: <Brain className="h-10 w-10 text-green-500" />,
      title: "AI Tutor",
      description: "Get personalized help with challenging concepts through our AI-powered tutoring system.",
      link: "/ai-tutor"
    },
    {
      icon: <Video className="h-10 w-10 text-blue-500" />,
      title: "Star Teacher Video Lessons",
      description: "Premium video lessons explaining complex topics with step-by-step guidance.",
      link: "/video-tutorials"
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-500" />,
      title: "Daily Recommendations",
      description: "AI-based recommendations that push the most relevant questions based on your past mistakes.",
      link: "/dashboard"
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

        {/* Free Features Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center text-white font-bold text-xl mr-4">
              <span>✓</span>
            </div>
            <h3 className="text-2xl font-bold text-learnscape-darkBlue">
              Free Features
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {freeFeatures.map((feature, index) => (
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
        </div>

        <Separator className="my-16 bg-gray-200" />

        {/* Premium Features Section */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl mr-4">
              <span>✨</span>
            </div>
            <h3 className="text-2xl font-bold text-learnscape-darkBlue">
              Premium Features
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border border-gray-100 bg-gradient-to-br from-white to-yellow-50 shadow-md cursor-pointer transition-transform hover:scale-105">
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
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-learnscape-darkBlue">
            Free For All Singapore Students
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Learnscape is committed to making quality education accessible to everyone.
            All our basic resources are completely free for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
