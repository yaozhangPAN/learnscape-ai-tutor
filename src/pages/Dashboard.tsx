
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import StreakComponent from "@/components/StreakComponent";

// 主页风格配色
const mainBg = "bg-[#e2fded]";
const sectionBox = "rounded-3xl bg-[#fbed96] shadow-sm p-4 md:p-6 mb-8 border border-[#4ABA79]/10";
const cardBgClasses = "bg-white shadow-sm border-0 rounded-3xl";
const textMain = "text-[#1E5B3A]";
const textAccent = "text-[#4ABA79]";
const progressColors = {
  high: "bg-[#4ABA79]",
  mid: "bg-[#f6c244]",
  low: "bg-[#e47069]"
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
      color: "bg-[#4aba79]",
    },
    {
      title: "Wrong Questions",
      description: "Track questions you missed",
      icon: <BookX className="h-6 w-6 text-white" />,
      count: 42,
      color: "bg-[#ffe29f] text-[#c08e23]",
    },
    {
      title: "Favorites",
      description: "Your saved questions",
      icon: <Star className="h-6 w-6 text-white" />,
      count: 78,
      color: "bg-[#e5deff] text-[#6a42b2]",
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
    <div className={`${mainBg} min-h-screen`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-[#4ABA79] mb-1 tracking-tight">
            {greeting}, <span className="text-[#1E5B3A]">Student</span>
          </h1>
          <p className="text-lg text-[#69c49a] font-semibold">
            Here's an overview of your learning progress
          </p>
        </div>

        {/* Streak Component */}
        <div className={sectionBox}>
          <StreakComponent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <div key={index} className={`rounded-3xl ${module.color} p-6 shadow-sm flex flex-col items-center`}>
              <div className="mb-2">{module.icon}</div>
              <h2 className="text-xl font-bold mb-1 text-white">{module.title}</h2>
              <div className="text-white/90 text-sm font-medium mb-2">{module.description}</div>
              <div className="text-3xl font-extrabold text-white mb-0">{module.count}</div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="mb-8">
          <div className={cardBgClasses}>
            <CardHeader className="rounded-t-3xl bg-[#e5deff] p-6 border-b border-[#ededfa]">
              <CardTitle className={`text-lg font-bold ${textMain}`}>Learning Progress</CardTitle>
              <CardDescription className="text-[#4ABA79] font-medium">
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
                    <div className="h-3 bg-[#fbed96] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
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
          <div className={cardBgClasses}>
            <CardHeader className="bg-[#fbed96] p-6 rounded-t-3xl border-b border-[#faedca]">
              <CardTitle className={`text-lg font-bold ${textAccent}`}>Recent Activities</CardTitle>
              <CardDescription className="text-[#e2a44a] font-medium">
                Your learning journey in the past few days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#faedca] bg-white rounded-b-3xl">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-[#4ABA79]">{activity.activity}</h4>
                      <p className="text-xs text-[#b197d7]">{activity.date}</p>
                    </div>
                    <div>
                      <span className={`px-4 py-1 rounded-full text-md font-semibold shadow 
                        ${
                          activity.score === "In progress" 
                            ? "bg-[#e5deff] text-[#6a42b2]"
                            : activity.score === "Complete" 
                              ? "bg-[#d2f6e6] text-[#1e5b3a]"
                              : "bg-[#faedca] text-[#f6c244]"
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
          <Button asChild className="btn-primary bg-[#4ABA79] hover:bg-[#38895a] shadow text-lg font-bold px-8 py-4 rounded-full border-0">
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
