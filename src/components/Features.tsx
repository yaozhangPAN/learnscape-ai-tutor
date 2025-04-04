
import { Book, Brain, BarChart3, List, Star, Users, FileText, Video, Zap } from "lucide-react";
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
      icon: <BarChart3 className="h-10 w-10 text-red-500" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed insights into strengths and areas for improvement.",
      link: "/dashboard"
    },
    {
      icon: <FileText className="h-10 w-10 text-green-500" />,
      title: "Worksheets",
      description: "Free test papers and worksheets for downloading and practice at your own pace.",
      link: "/worksheets"
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      title: "Community Learning",
      description: "Connect with other students and share resources in a collaborative environment.",
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
      title: "Video Tutorials",
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
    <div id="features" className="py-16 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-learnscape-yellow/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-learnscape-purple/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-40 left-10 w-16 h-16 bg-learnscape-blue/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center text-white font-bold text-xl mr-4 animate-bounce" style={{ animationDuration: '2s' }}>
              <span>✓</span>
            </div>
            <h3 className="text-2xl font-bold text-learnscape-darkBlue">
              Free Features
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {freeFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`card-hover border border-gray-100 ${feature.link ? 'cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-learnscape-blue/50' : ''} relative overflow-hidden group`}
              >
                {feature.link ? (
                  <Link to={feature.link} className="block h-full">
                    <CardHeader>
                      <div className="mb-2 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">{feature.icon}</div>
                      <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                    {/* Fun background element only visible on hover */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tl from-learnscape-yellow/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ) : (
                  <>
                    <CardHeader>
                      <div className="mb-2 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">{feature.icon}</div>
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

        <div className="relative my-16">
          <Separator className="my-4 bg-gray-200" />
          {/* Animated pencil crossing the separator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="h-12 w-3 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-300 rounded-t-full animate-bounce" style={{animationDuration: '1.5s'}}></div>
            <div className="h-1 w-3 bg-gray-300 rounded-b-sm"></div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl mr-4 animate-pulse">
              <span>✨</span>
            </div>
            <h3 className="text-2xl font-bold text-learnscape-darkBlue">
              Premium Features
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {premiumFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="card-hover border border-gray-100 bg-gradient-to-br from-white to-yellow-50 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group relative overflow-hidden"
              >
                <Link to={feature.link} className="block h-full">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100 rounded-bl-full z-0 transform rotate-0 group-hover:rotate-45 transition-transform duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="mb-2 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  {/* Sparkle effect (visible only on hover) */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-400 animate-pulse">✨</div>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 left-1/4 w-4 h-4 bg-learnscape-purple/30 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
          <div className="absolute -top-10 right-1/4 w-6 h-6 bg-learnscape-yellow/40 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
          
          <h3 className="text-2xl font-bold text-learnscape-darkBlue">
            Free For All Singapore Students
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Learnscape is committed to making quality education accessible to everyone.
            All our basic resources are completely free for all users.
          </p>
          
          {/* Flying paper airplane animation */}
          <div className="absolute bottom-0 left-0 animate-flyAcross">
            <div className="transform rotate-12">
              <div className="w-10 h-10 bg-white border border-gray-200 rotate-45 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these keyframe animations to the stylesheet */}
      <style jsx>{`
        @keyframes flyAcross {
          0% { transform: translateX(-100%) translateY(0) rotate(0); }
          50% { transform: translateX(50vw) translateY(-20vh) rotate(15deg); }
          100% { transform: translateX(100vw) translateY(0) rotate(0); }
        }
        
        .animate-flyAcross {
          animation: flyAcross 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Features;
