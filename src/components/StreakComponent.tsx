
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Flame } from "lucide-react";

const StreakComponent = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const currentStreak = 157;
  const currentMonth = "April 2025";
  const daysPracticed = 3;
  const freezeUsed = 1;

  // Mock calendar data for current month
  const calendarDays = [
    { day: "Su", date: null },
    { day: "Mo", date: null },
    { day: "Tu", date: 1, status: "completed" },
    { day: "We", date: 2, status: "freeze" },
    { day: "Th", date: 3, status: "completed" },
    { day: "Fr", date: 4, status: "active" },
    { day: "Sa", date: 5, status: "inactive" },
    { day: "Su", date: 6, status: "inactive" },
    { day: "Mo", date: 7, status: "inactive" },
    { day: "Tu", date: 8, status: "inactive" },
    { day: "We", date: 9, status: "inactive" },
    { day: "Th", date: 10, status: "inactive" },
    { day: "Fr", date: 11, status: "inactive" },
    { day: "Sa", date: 12, status: "inactive" },
    { day: "Su", date: 13, status: "inactive" },
    { day: "Mo", date: 14, status: "inactive" },
    { day: "Tu", date: 15, status: "inactive" },
    { day: "We", date: 16, status: "inactive" },
    { day: "Th", date: 17, status: "inactive" },
    { day: "Fr", date: 18, status: "inactive" },
    { day: "Sa", date: 19, status: "inactive" },
    { day: "Su", date: 20, status: "inactive" },
    { day: "Mo", date: 21, status: "inactive" },
    { day: "Tu", date: 22, status: "today" },
    { day: "We", date: 23, status: "inactive" },
    { day: "Th", date: 24, status: "inactive" },
    { day: "Fr", date: 25, status: "inactive" },
    { day: "Sa", date: 26, status: "inactive" },
    { day: "Su", date: 27, status: "inactive" },
    { day: "Mo", date: 28, status: "inactive" },
    { day: "Tu", date: 29, status: "inactive" },
    { day: "We", date: 30, status: "inactive" },
  ];

  return (
    <div className="bg-amber-50 rounded-lg p-4 mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Streak</h1>
      </div>

      <Tabs defaultValue="personal" className="w-full mb-6">
        <TabsList className="w-full bg-amber-100">
          <TabsTrigger 
            value="personal" 
            className="w-1/2 data-[state=active]:bg-white"
            onClick={() => setActiveTab("personal")}
          >
            <span className="text-xl text-cyan-500 font-bold">PERSONAL</span>
          </TabsTrigger>
          <TabsTrigger 
            value="friends" 
            className="w-1/2 data-[state=active]:bg-white"
            onClick={() => setActiveTab("friends")}
          >
            <span className="text-xl text-gray-600 font-bold">FRIENDS</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <div className="mb-8">
            <div className="bg-amber-200 text-amber-800 py-2 px-4 rounded-full inline-block mb-4">
              <span className="font-bold">STREAK SOCIETY</span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-8">
                <h2 className="text-8xl font-bold text-amber-300 stroke-text">{currentStreak}</h2>
                <p className="text-amber-500 text-2xl">day streak!</p>
              </div>
              
              <div className="flex-1">
                <Flame className="h-32 w-32 text-amber-200" />
              </div>
            </div>
          </div>
          
          <Card className="bg-white border-none shadow-md mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-red-500 mr-4" />
                <div>
                  <p className="text-gray-600 text-xl">
                    Less than 2 hours to extend your {currentStreak} day streak!
                  </p>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-lg py-6">
                EXTEND STREAK
              </Button>
            </CardContent>
          </Card>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-400"><span className="text-2xl">←</span></button>
              <h3 className="text-2xl font-bold text-gray-700">{currentMonth}</h3>
              <button className="text-gray-400"><span className="text-2xl">→</span></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-white border-none shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full p-2 mr-3">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{daysPracticed}</h4>
                    <p className="text-gray-500">Days practiced</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border-none shadow-sm p-4">
                <div className="flex items-center">
                  <div className="bg-cyan-500 rounded-full p-2 mr-3">
                    <span className="text-white font-bold">❄</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{freezeUsed}</h4>
                    <p className="text-gray-500">Freeze used</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="bg-white border-none shadow-sm p-4">
              <div className="text-center">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {calendarDays.slice(0, 7).map((day, index) => (
                    <div key={`day-${index}`} className="text-gray-500 font-medium">
                      {day.day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day.date) return <div key={`empty-${index}`}></div>;
                    
                    let bgColor = "bg-gray-100";
                    let textColor = "text-gray-400";
                    let content = day.date;
                    
                    if (day.status === "completed") {
                      bgColor = "bg-amber-500";
                      textColor = "text-white";
                    } else if (day.status === "freeze") {
                      bgColor = "bg-cyan-400";
                      textColor = "text-white";
                      content = <div className="relative">
                        {day.date}
                        <span className="absolute -bottom-1 -right-1 text-xs">❄</span>
                      </div>;
                    } else if (day.status === "active") {
                      bgColor = "bg-amber-500";
                      textColor = "text-white";
                    } else if (day.status === "today") {
                      bgColor = "bg-amber-100";
                      textColor = "text-amber-500";
                    }
                    
                    return (
                      <div 
                        key={`date-${index}`} 
                        className={`${bgColor} ${textColor} rounded-full w-8 h-8 flex items-center justify-center mx-auto font-medium text-lg`}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="friends">
          <div className="text-center py-10">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-2" />
            <h3 className="text-xl font-medium text-gray-500">
              Connect with friends to see their streaks and compete together!
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreakComponent;
