
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Flame } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const StreakComponent = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const currentStreak = 157;
  const currentMonth = "April 2025";
  const daysPracticed = 3;
  const freezeUsed = 1;
  const { t } = useI18n();

  // Updated color palette with more saturation
  const colors = {
    background: "bg-gradient-to-br from-[#2ecc71] to-[#27ae60]", // Vibrant green gradient
    streakSocietyBg: "bg-[#e74c3c]", // Bright red
    streakText: "text-white", // White text for better contrast
    tabBackground: "bg-gradient-to-br from-[#3498db] to-[#2980b9]", // Blue gradient
    activeTabBg: "bg-white text-[#2ecc71]", // White background with green text
    cardBgs: {
      practiced: "bg-gradient-to-br from-[#2ecc71] to-[#27ae60]", // Green gradient
      freeze: "bg-gradient-to-br from-[#3498db] to-[#2980b9]" // Blue gradient
    }
  };

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
    <div className={`${colors.background} rounded-3xl p-4 md:p-8 text-white`}>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">{t.STREAK.TITLE}</h1>
      </div>

      <Tabs defaultValue="personal" className="w-full mb-4">
        <TabsList className={`w-full ${colors.tabBackground} rounded-full h-12 mb-2`}>
          <TabsTrigger 
            value="personal" 
            className={`w-1/2 data-[state=active]:${colors.activeTabBg} text-lg`}
            onClick={() => setActiveTab("personal")}
          >
            {t.STREAK.PERSONAL}
          </TabsTrigger>
          <TabsTrigger 
            value="friends" 
            className={`w-1/2 data-[state=active]:${colors.activeTabBg} text-lg`}
            onClick={() => setActiveTab("friends")}
          >
            {t.STREAK.FRIENDS}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-2">
          <div className="mb-6">
            <div className={`${colors.streakSocietyBg} ${colors.streakText} py-2 px-4 rounded-full inline-block mb-4 text-center`}>
              <span className="font-bold text-sm tracking-wide">{t.STREAK.STREAK_SOCIETY}</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <h2 className="text-7xl font-bold text-white text-stroke drop-shadow">{currentStreak}</h2>
                <p className="text-white/90 text-2xl mt-1">{t.STREAK.DAY_STREAK}</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Flame className="h-24 w-24 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Card className={`${colors.cardBgs.practiced} border-none flex-1 shadow text-white`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-white/30 rounded-full p-2 mr-2">
                  <span className="text-white font-bold text-2xl">✓</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">{daysPracticed}</h4>
                  <p className="font-semibold text-white/90">{t.STREAK.DAYS_PRACTICED}</p>
                </div>
              </CardContent>
            </Card>
            <Card className={`${colors.cardBgs.freeze} border-none flex-1 shadow text-white`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-white/30 rounded-full p-2 mr-2">
                  <span className="text-white font-bold text-2xl">❄</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">{freezeUsed}</h4>
                  <p className="font-semibold text-white/90">{t.STREAK.FREEZE_USED}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-sm p-4">
            <CardContent>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <button className="text-white/80 text-xl font-bold">&lt;</button>
                  <h3 className="text-lg font-extrabold text-white">{currentMonth}</h3>
                  <button className="text-white/80 text-xl font-bold">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-1">
                  {calendarDays.slice(0, 7).map((day, index) => (
                    <div key={`day-${index}`} className="text-white/80 font-medium text-sm text-center">
                      {day.day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day.date) return <div key={`empty-${index}`}></div>;
                    
                    let bgColor = "bg-white/10";
                    let textColor = "text-white/60";
                    let content = day.date;
                    
                    if (day.status === "completed") {
                      bgColor = "bg-[#2ecc71]";
                      textColor = "text-white";
                    } else if (day.status === "freeze") {
                      bgColor = "bg-[#3498db]";
                      textColor = "text-white";
                      content = <div className="relative">{day.date}<span className="absolute -bottom-1 -right-1 text-xs">❄</span></div>;
                    } else if (day.status === "active") {
                      bgColor = "bg-[#f1c40f]";
                      textColor = "text-white";
                    } else if (day.status === "today") {
                      bgColor = "bg-[#e74c3c]";
                      textColor = "text-white";
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
            <Button className="bg-white text-[#2ecc71] hover:bg-white/90 text-lg px-8 py-3 rounded-full font-bold shadow">
              {t.STREAK.EXTEND_STREAK}
            </Button>
            <div className="mt-2 text-white font-semibold">
              <Clock className="inline-block mr-2 h-5 w-5 text-white/80" />
              {t.STREAK.STREAK_WARNING}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="friends">
          <div className="text-center py-10">
            <Calendar className="h-16 w-16 text-white/80 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-white">
              {t.STREAK.FRIENDS_MESSAGE}
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreakComponent;
