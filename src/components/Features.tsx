
import { Book, Brain, BarChart3, List, Star, Users, FileText, Video, Zap, Award, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
      icon: <FileText className="h-10 w-10 text-green-500" />,
      title: "Mock Exam",
      description: "Practice with full-length exam papers from top Singapore schools. The system automatically times and scores your paper.",
      link: "/mock-exam"
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
      title: "AI Powered Daily Study Plan",
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
          <div className="grid gap-8 md:grid-cols-2">
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

        {/* Free For All Singapore Students section moved here */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-learnscape-darkBlue">
            Free For All Singapore Students
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Learnscape is committed to making quality education accessible to everyone.
            All our basic resources are completely free for all users.
          </p>
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

        {/* Premium Subscription Banner */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-2xl shadow-md border border-amber-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-learnscape-darkBlue flex items-center">
                <Award className="h-6 w-6 mr-2 text-amber-500" />
                Upgrade to Premium
              </h3>
              <p className="mt-2 text-gray-600 max-w-lg">
                Get unlimited access to AI Tutor, Daily Recommendations, and all Video Tutorials.
              </p>
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="inline-block w-5 h-5 mr-2 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Unlimited AI tutor sessions
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="inline-block w-5 h-5 mr-2 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  Personalized daily study plan
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="inline-block w-5 h-5 mr-2 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  S$50 credits for purchasing premium video lessons
                </li>
              </ul>
              
              <div className="mt-6">
                <Link to="/login">
                  <Button className="bg-[#FFA500] hover:bg-[#FF6F00] text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Subscribe for S$99/month
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex flex-col items-center">
              <div className="text-4xl font-bold text-learnscape-darkBlue">S$99</div>
              <div className="text-sm text-gray-500">per month</div>
              <div className="mt-2 text-amber-600 text-sm font-medium">Cancel anytime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
