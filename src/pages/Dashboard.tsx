
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Star, Brain, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionModule from "@/components/QuestionModule";
import Navbar from "@/components/Navbar";
import StreakComponent from "@/components/StreakComponent";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue">
            {greeting}, Student
          </h1>
          <p className="text-gray-600">
            Here's an overview of your learning progress
          </p>
        </div>

        {/* Streak Component */}
        <StreakComponent />

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

        <div className="mb-8">
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
