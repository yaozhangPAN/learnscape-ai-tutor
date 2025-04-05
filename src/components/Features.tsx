
import { Book, Brain, Star, Users, FileText, Video, Map, Backpack, Trophy, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Features = () => {
  const freeFeatures = [
    {
      icon: <Map className="h-10 w-10 text-green-500" />,
      title: "Adventure",
      description: "Exciting learning quests with interactive questions to boost your knowledge.",
      link: "/question-bank"
    },
    {
      icon: <Book className="h-10 w-10 text-orange-500" />,
      title: "My Words",
      description: "Track vocabulary and review words you've learned on your journey.",
      link: ""
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Favorites",
      description: "Save your favorite activities and lessons for quick access.",
      link: ""
    },
    {
      icon: <Trophy className="h-10 w-10 text-amber-500" />,
      title: "Achievements",
      description: "Earn badges and rewards as you complete learning missions.",
      link: "/dashboard"
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      title: "Worksheets",
      description: "Download fun activities to practice offline.",
      link: "/worksheets"
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      title: "Friends",
      description: "Connect with other learners and see how they're doing.",
      link: "/leaderboard"
    }
  ];

  const premiumFeatures = [
    {
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
      title: "Helper",
      description: "Your friendly AI companion who can answer questions and guide your learning.",
      link: "/ai-tutor"
    },
    {
      icon: <Video className="h-10 w-10 text-purple-500" />,
      title: "Video Lessons",
      description: "Watch fun and educational videos with clear explanations.",
      link: "/video-tutorials"
    },
    {
      icon: <Gift className="h-10 w-10 text-red-500" />,
      title: "Daily Goal",
      description: "Special activities chosen just for you based on your learning journey.",
      link: "/dashboard"
    }
  ];

  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-learnscape-brown sm:text-4xl">
            Fun Learning Adventures
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Discover exciting ways to learn and grow with our playful activities!
          </p>
        </div>

        {/* Free Features Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-xl mr-4">
              <span>✓</span>
            </div>
            <h3 className="text-2xl font-bold text-learnscape-darkBlue">
              Free Adventures
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {freeFeatures.map((feature, index) => (
              <Card key={index} className={`card-hover border-4 border-white shadow-lg rounded-3xl ${feature.link ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}>
                {feature.link ? (
                  <Link to={feature.link} className="block h-full">
                    <CardHeader className="bg-gradient-to-b from-yellow-100 to-white rounded-t-2xl">
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white rounded-b-2xl">
                      <CardDescription className="text-gray-600 font-medium">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                ) : (
                  <>
                    <CardHeader className="bg-gradient-to-b from-yellow-100 to-white rounded-t-2xl">
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white rounded-b-2xl">
                      <CardDescription className="text-gray-600 font-medium">
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
              Special Adventures
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border-4 border-white shadow-lg bg-gradient-to-br from-white to-yellow-50 rounded-3xl cursor-pointer transition-transform hover:scale-105">
                <Link to={feature.link} className="block h-full">
                  <CardHeader className="bg-gradient-to-b from-yellow-100 to-white rounded-t-2xl">
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-2xl">
                    <CardDescription className="text-gray-600 font-medium">
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
            Free For All Young Learners
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Our basic adventures are completely free for everyone. Join us and start learning today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
