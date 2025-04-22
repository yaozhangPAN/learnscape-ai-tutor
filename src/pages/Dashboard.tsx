
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Star, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionModule from "@/components/QuestionModule";
import Navbar from "@/components/Navbar";
import StreakComponent from "@/components/StreakComponent";

// Learnscape 主色调
const mainBgGradient = "bg-gradient-to-br from-[#e2fded] via-[#fbed96] to-[#e5deff]";
const cardBgClasses = "bg-white/95 shadow-lg border-0 rounded-3xl";
const sectionBox = "rounded-3xl bg-learnscape-yellow/80 shadow-lg p-4 md:p-6 mb-8 border border-learnscape-blue/20";
const textMain = "text-[#1E5B3A]"; // learnscape-darkGreen
const textAccent = "text-[#4ABA79]"; // learnscape-blue，但改浅绿调
const borderAccent = "border-2 border-learnscape-blue/30";
const progressColors = {
  high: "bg-learnscape-blue",
  mid: "bg-yellow-400",
  low: "bg-red-400"
};

const Dashboard = () => {
  const [greeting] = useState(() => {
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
      color: "bg-gradient-to-br from-[#8fc888] to-[#6ee7b7] text-white",
    },
    {
      title: "Wrong Questions",
      description: "Track questions you missed",
      icon: <BookX className="h-6 w-6 text-white" />,
      count: 42,
      color: "bg-gradient-to-br from-[#ffd89b] to-[#ff9c9e] text-white",
    },
    {
      title: "Favorites",
      description: "Your saved questions",
      icon: <Star className="h-6 w-6 text-white" />,
      count: 78,
      color: "bg-gradient-to-br from-learnscape-purple to-[#b7f2e1] text-white",
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
    <div className={`${mainBgGradient} min-h-screen`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-[#4ABA79] drop-shadow-sm mb-1 tracking-tight">
            {greeting}, <span className="text-[#1E5B3A]">Student</span>
          </h1>
          <p className="text-lg text-[#6dcc99] font-semibold">
            Here's an overview of your learning progress
          </p>
        </div>

        {/* Streak Component */}
        <div className={`${sectionBox}`}>
          <StreakComponent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <div key={index} className={`rounded-3xl ${module.color} p-6 shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center`}>
              <div className="mb-2">{module.icon}</div>
              <h2 className="text-xl font-bold mb-1 text-white">{module.title}</h2>
              <div className="text-white text-sm font-medium mb-2">{module.description}</div>
              <div className="text-3xl font-extrabold text-white mb-0">{module.count}</div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="mb-8">
          <div className={`${cardBgClasses} p-0 md:p-2`}>
            <CardHeader className="rounded-t-3xl bg-gradient-to-r from-[#bafbcc]/80 to-[#fffbd9]/90 p-6 border-b border-[#e1ffd5]">
              <CardTitle className={`text-lg font-bold ${textMain}`}>Learning Progress</CardTitle>
              <CardDescription className="text-[#5bb88e] font-medium">
                Your performance across subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 py-4">
                {subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-[#4ABA79]">
                      <span>{subject.name}</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="h-3 bg-learnscape-yellow/70 rounded-full overflow-hidden drop-shadow">
                      <div 
                        className={`h-full rounded-full ${
                          subject.progress > 65 
                            ? progressColors.high
                            : subject.progress > 40 
                              ? progressColors.mid
                              : progressColors.low
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <div className={`${cardBgClasses} p-0 md:p-2`}>
            <CardHeader className="bg-gradient-to-r from-[#fceabb]/80 to-[#eba6a6]/80 p-6 rounded-t-3xl border-b border-[#ffe6b6]">
              <CardTitle className={`text-lg font-bold ${textAccent}`}>Recent Activities</CardTitle>
              <CardDescription className="text-[#de7f79] font-medium">
                Your learning journey in the past few days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#ffe6b6] bg-white/90 rounded-b-3xl">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-learnscape-blue">{activity.activity}</h4>
                      <p className="text-xs text-learnscape-purple">{activity.date}</p>
                    </div>
                    <div>
                      <span className={`px-4 py-1 rounded-full text-md font-semibold shadow 
                        ${
                          activity.score === "In progress" 
                            ? "bg-[#efe4fe] text-[#8257c1]"
                            : activity.score === "Complete" 
                              ? "bg-[#bbf7d0] text-[#1e5b3a]"
                              : "bg-[#fff6e7] text-[#f59639]"
                        }`
                      }>
                        {activity.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        <div className="text-center mb-8">
          <Button asChild className="btn-primary bg-gradient-to-r from-[#58ddaa] to-[#b0ecb9] hover:from-[#52c392] hover:to-[#b9e7d2] shadow-md text-lg font-bold px-8 py-4 rounded-full border-0">
            <Link to="/question-bank" className="flex items-center justify-center gap-2">
              <Search className="mr-2 h-5 w-5" />
              Explore Question Bank
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

