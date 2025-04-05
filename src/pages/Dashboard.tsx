
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Star, Brain, BarChart3, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionModule from "@/components/QuestionModule";
import Navbar from "@/components/Navbar";
import PremiumStatus from "@/components/PremiumStatus";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });

  const modules = [
    {
      title: "Question Bank",
      description: "Customizable practice questions",
      icon: <Book className="h-6 w-6 text-white" />,
      count: 2500,
      color: "bg-learnscape-blue text-white",
    },
    {
      title: "Wrong Questions",
      description: "Track questions you missed",
      icon: <BookX className="h-6 w-6 text-white" />,
      count: 42,
      color: "bg-learnscape-purple text-white",
    },
    {
      title: "Favorites",
      description: "Your saved questions",
      icon: <Star className="h-6 w-6 text-white" />,
      count: 78,
      color: "bg-yellow-500 text-white",
    },
  ];

  const subjects = [
    { name: "Mathematics", progress: 75 },
    { name: "English", progress: 60 },
    { name: "Science", progress: 45 },
    { name: "Chinese", progress: 30 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      activity: "Completed Mathematics practice", 
      date: "1 hour ago", 
      score: "8/10" 
    },
    { 
      id: 2, 
      activity: "Started English vocabulary quiz", 
      date: "Yesterday", 
      score: "In progress" 
    },
    { 
      id: 3, 
      activity: "Reviewed Science concepts", 
      date: "2 days ago", 
      score: "Complete" 
    },
  ];

  const dailyRecommendations = [
    {
      id: 1,
      title: "English Comprehension",
      description: "Improve your reading skills",
      progress: 0,
      difficulty: "Medium",
      estimatedTime: "20 mins",
    },
    {
      id: 2,
      title: "Mathematics Problem Set",
      description: "Practice with fractions and decimals",
      progress: 35,
      difficulty: "Hard",
      estimatedTime: "30 mins",
    },
    {
      id: 3,
      title: "Science Quiz",
      description: "Test your knowledge on plants",
      progress: 75,
      difficulty: "Easy",
      estimatedTime: "15 mins",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue">
            {greeting}, Student
          </h1>
          <p className="text-gray-600">
            Here's an overview of your learning progress
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
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your performance across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{subject.name}</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            subject.progress > 65 
                              ? 'bg-green-500' 
                              : subject.progress > 40 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
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
            <PremiumStatus />
          </div>
        </div>

        {/* Daily Recommendations Module */}
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl font-bold text-learnscape-darkBlue">
                  Today's Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized questions based on your learning progress
                </CardDescription>
              </div>
              <Button asChild variant="ghost" className="text-learnscape-blue hover:text-learnscape-darkBlue">
                <Link to="/question-bank?tab=daily-recommendations">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyRecommendations.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-lg transition hover:bg-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex space-x-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          item.difficulty === 'Easy' 
                            ? 'bg-green-100 text-green-800' 
                            : item.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {item.difficulty}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {item.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button asChild size="sm" className="bg-learnscape-blue hover:bg-blue-700">
                        <Link to={`/question-bank?tab=daily-recommendations&topic=${item.id}`}>
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your learning journey in the past few days</CardDescription>
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
                          : activity.score === "Complete" 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
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
          <Button asChild className="bg-learnscape-blue hover:bg-blue-700">
            <Link to="/question-bank">
              <Search className="mr-2 h-4 w-4" />
              Explore Question Bank
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
