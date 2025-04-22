
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
    <div className="bg-[#f2fce2] rounded-3xl p-4 md:p-8">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-[#4ABA79] tracking-tight">Streak</h1>
      </div>

      <Tabs defaultValue="personal" className="w-full mb-4">
        <TabsList className="w-full bg-[#e5deff] rounded-full h-12 mb-2">
          <TabsTrigger 
            value="personal" 
            className="w-1/2 data-[state=active]:bg-white data-[state=active]:text-[#4ABA79] text-lg"
            onClick={() => setActiveTab("personal")}
          >
            PERSONAL
          </TabsTrigger>
          <TabsTrigger 
            value="friends" 
            className="w-1/2 data-[state=active]:bg-white data-[state=active]:text-[#4ABA79] text-lg"
            onClick={() => setActiveTab("friends")}
          >
            FRIENDS
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-2">
          <div className="mb-6">
            <div className="bg-[#fbed96] text-[#ad8a2c] py-2 px-4 rounded-full inline-block mb-4 text-center">
              <span className="font-bold text-sm tracking-wide">STREAK SOCIETY</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <h2 className="text-7xl font-bold text-[#ffd664] text-stroke drop-shadow">{currentStreak}</h2>
                <p className="text-[#d3a647] text-2xl mt-1">day streak!</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Flame className="h-24 w-24 text-[#ffd664] drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Card className="bg-[#e5deff] border-none flex-1 shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-[#4ABA79] rounded-full p-2 mr-2">
                  <span className="text-white font-bold text-2xl">✓</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#4ABA79]">{daysPracticed}</h4>
                  <p className="text-[#8268b5] font-semibold">Days practiced</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#fbed96] border-none flex-1 shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-[#38A169] rounded-full p-2 mr-2">
                  <span className="text-white font-bold text-2xl">❄</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#38A169]">{freezeUsed}</h4>
                  <p className="text-[#b58a37] font-semibold">Freeze used</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white border-none shadow-sm p-4">
            <CardContent>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <button className="text-[#b197d7] text-xl font-bold">&lt;</button>
                  <h3 className="text-lg font-extrabold text-[#4ABA79]">{currentMonth}</h3>
                  <button className="text-[#b197d7] text-xl font-bold">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-1">
                  {calendarDays.slice(0, 7).map((day, index) => (
                    <div key={`day-${index}`} className="text-[#b197d7] font-medium text-sm text-center">
                      {day.day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day.date) return <div key={`empty-${index}`}></div>;
                    
                    let bgColor = "bg-[#f3f3f3]";
                    let textColor = "text-[#bdbdbd]";
                    let content = day.date;
                    
                    if (day.status === "completed") {
                      bgColor = "bg-[#4ABA79]";
                      textColor = "text-white";
                    } else if (day.status === "freeze") {
                      bgColor = "bg-[#38A169]";
                      textColor = "text-white";
                      content = <div className="relative">{day.date}<span className="absolute -bottom-1 -right-1 text-xs">❄</span></div>;
                    } else if (day.status === "active") {
                      bgColor = "bg-[#f6c244]";
                      textColor = "text-white";
                    } else if (day.status === "today") {
                      bgColor = "bg-[#ffe29f]";
                      textColor = "text-[#c08e23]";
                    }
                    
                    return (
                      <div 
                        key={`date-${index}`} 
                        className={`${bgColor} ${textColor} rounded-full w-8 h-8 flex items-center justify-center mx-auto font-semibold text-base`}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Button className="bg-[#4ABA79] hover:bg-[#38895a] text-white text-lg px-8 py-3 rounded-full font-bold shadow">
              EXTEND STREAK
            </Button>
            <div className="mt-2 text-[#4ABA79] font-semibold">
              <Clock className="inline-block mr-2 h-5 w-5 text-[#e47069]" />
              Less than 2 hours to extend your streak!
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="friends">
          <div className="text-center py-10">
            <Calendar className="h-16 w-16 text-[#b197d7] mx-auto mb-2" />
            <h3 className="text-lg font-medium text-[#b197d7]">
              Connect with friends to see their streaks and compete together!
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreakComponent;
