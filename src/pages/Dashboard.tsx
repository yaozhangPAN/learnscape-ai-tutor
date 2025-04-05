
import { useState } from "react";
import { Link } from "react-router-dom";
import { Map, BookOpen, Star, Brain, Search, Award, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionModule from "@/components/QuestionModule";
import Navbar from "@/components/Navbar";
import PremiumStatus from "@/components/PremiumStatus";

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });

  const modules = [
    {
      title: "Adventure",
      description: "Exciting learning quests",
      icon: <Map className="h-6 w-6 text-white" />,
      count: 25,
      color: "bg-green-500 text-white",
    },
    {
      title: "My Words",
      description: "Words you've learned",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      count: 42,
      color: "bg-orange-500 text-white",
    },
    {
      title: "Collected Stars",
      description: "Your rewards",
      icon: <Star className="h-6 w-6 text-white" />,
      count: 78,
      color: "bg-yellow-500 text-white",
    },
  ];

  const subjects = [
    { name: "Math Adventure", progress: 75 },
    { name: "Reading Quest", progress: 60 },
    { name: "Science Explorer", progress: 45 },
    { name: "Language Journey", progress: 30 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      activity: "Completed Math puzzle", 
      date: "1 hour ago", 
      score: "8/10 stars" 
    },
    { 
      id: 2, 
      activity: "Started Reading adventure", 
      date: "Yesterday", 
      score: "In progress" 
    },
    { 
      id: 3, 
      activity: "Discovered Science secret", 
      date: "2 days ago", 
      score: "Badge earned" 
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-learnscape-brown flex items-center">
            {greeting}, Explorer! <Trophy className="ml-2 h-6 w-6 text-amber-500" />
          </h1>
          <p className="text-gray-600">
            Here's a look at your learning adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <QuestionModule
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              count={module.count}
              color={module.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-4 border-white rounded-3xl shadow-lg">
              <CardHeader className="bg-gradient-to-b from-yellow-100 to-white">
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-6 w-6 text-amber-500" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your adventure completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{subject.name}</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-white">
                        <div 
                          className={`h-full rounded-full ${
                            subject.progress > 65 
                              ? 'bg-green-500' 
                              : subject.progress > 40 
                                ? 'bg-yellow-500' 
                                : 'bg-orange-500'
                          }`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-4 border-white rounded-3xl shadow-lg bg-gradient-to-b from-cyan-100 to-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-6 w-6 text-cyan-500" />
                  Daily Goal
                </CardTitle>
                <CardDescription>Special mission for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-xl shadow-inner border border-cyan-200">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                  </div>
                  <p className="text-center font-medium text-gray-700">Complete 3 math puzzles today!</p>
                  <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
                    Start Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <Card className="border-4 border-white rounded-3xl shadow-lg">
            <CardHeader className="bg-gradient-to-b from-yellow-100 to-white">
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-amber-500" />
                Recent Adventures
              </CardTitle>
              <CardDescription>Your learning journey so far</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activity.score === "In progress" 
                          ? "bg-blue-100 text-blue-800" 
                          : activity.score === "Badge earned" 
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                      }`}>
                        {activity.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button asChild className="bg-green-500 hover:bg-green-600 rounded-full text-white">
            <Link to="/question-bank">
              <Map className="mr-2 h-4 w-4" />
              Start New Adventure
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
