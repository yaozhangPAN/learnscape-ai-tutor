import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Flame, Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CalendarDay {
  day: string;
  date: number | null;
  status?: string;
}

const StreakComponent = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [daysPracticed, setDaysPracticed] = useState(0);
  const [freezeUsed, setFreezeUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [calendarDays, setCalendarDays] = useState<Array<CalendarDay>>([]);
  const { t } = useI18n();
  const { session } = useAuth();
  const { toast } = useToast();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const colors = {
    mainBg: "bg-[#FFF6D5]",
    primary: "#2F5530",
    highlight: "#FFD700",
    card: "bg-[#FFEFAE]",
    streakSocietyBg: "bg-[#2F5530]",
    streakSocietyText: "text-white",
    tabBg: "bg-[#FFEFAE]",
    activeTabBg: "bg-[#2F5530] text-white",
    inactiveTabBg: "bg-[#FFEFAE] text-[#2F5530]",
    cardBgs: {
      practiced: "bg-[#AED581]",
      freeze: "bg-[#FBC02D]",
    },
    cardText: "text-[#2F5530]",
    button: "bg-[#2F5530] text-white hover:bg-[#21401f]",
    calendarDay: "bg-[#FFEFAE] text-[#2F5530]",
    calendarDone: "bg-[#AED581] text-[#2F5530] font-bold",
    calendarFreeze: "bg-[#FBC02D] text-white font-bold",
    calendarActive: "bg-[#FFD700] text-[#2F5530] font-bold",
    calendarToday: "bg-[#FF7043] text-white font-bold",
  };

  useEffect(() => {
    if (!session?.user.id) {
      setIsLoading(false);
      generateCalendar();
      return;
    }

    const fetchStreakData = async () => {
      setIsLoading(true);
      try {
        const { data: streaks, error } = await supabase
          .from('daily_streaks')
          .select('*')
          .eq('user_id', session.user.id)
          .order('streak_date', { ascending: false });

        if (error) throw error;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        let streak = 0;
        const practicesDays = new Set<string>();
        
        if (streaks && streaks.length > 0) {
          streaks.forEach(record => {
            if (typeof record.streak_date === 'string') {
              practicesDays.add(record.streak_date);
            }
          });

          const sortedDates = [...practicesDays].sort((a, b) => 
            new Date(b).getTime() - new Date(a).getTime()
          );
          
          let lastDate = currentDate;
          for (const dateStr of sortedDates) {
            const streakDate = new Date(dateStr);
            streakDate.setHours(0, 0, 0, 0);
            
            const diffDays = Math.round((lastDate.getTime() - streakDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 1) {
              streak++;
              lastDate = streakDate;
            } else {
              break;
            }
          }
        }
        
        setCurrentStreak(streak);
        setDaysPracticed(practicesDays.size);

        setFreezeUsed(Math.min(3, Math.floor(practicesDays.size / 10)));
        
        generateCalendar(practicesDays);
      } catch (error) {
        console.error('Error fetching streak data:', error);
        toast({
          title: "Error loading streak data",
          description: "Please refresh the page to try again.",
          variant: "destructive"
        });
        generateCalendar();
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreakData();
  }, [session?.user.id, toast]);

  const generateCalendar = (practicesDays?: Set<string>) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days: CalendarDay[] = [];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    
    for (let i = 0; i < 7; i++) {
      days.push({ day: dayNames[i], date: null });
    }
    
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayIndex = date.getDay();
      const dateStr = date.toISOString().split('T')[0];
      const isToday = i === today.getDate();
      
      let status = "inactive";
      
      if (isToday) {
        status = "today";
      } else if (practicesDays?.has(dateStr)) {
        status = "completed";
        
        if (i % 5 === 0) {
          status = "freeze";
        }
      } else if (i === today.getDate() + 1) {
        status = "active";
      }
      
      days[dayIndex + 7] = { 
        day: dayNames[dayIndex], 
        date: i,
        status: status
      };
    }
    
    setCalendarDays(days);
  };

  return (
    <div className={`${colors.mainBg} rounded-3xl p-4 md:p-8`}>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold" style={{ color: colors.primary, letterSpacing: "0.03em" }}>{t.STREAK.TITLE}</h1>
      </div>

      <Tabs defaultValue="personal" className="w-full mb-4">
        <TabsList className={`w-full ${colors.tabBg} rounded-full h-12 mb-2 flex`}>
          <TabsTrigger
            value="personal"
            className={`w-1/2 rounded-full text-lg font-bold transition-all 
            ${activeTab === "personal" ? colors.activeTabBg : colors.inactiveTabBg}`}
            onClick={() => setActiveTab("personal")}
          >
            {t.STREAK.PERSONAL}
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className={`w-1/2 rounded-full text-lg font-bold transition-all 
            ${activeTab === "friends" ? colors.activeTabBg : colors.inactiveTabBg}`}
            onClick={() => setActiveTab("friends")}
          >
            {t.STREAK.FRIENDS}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-2">
          <div className="mb-6 flex flex-col items-center">
            <div className={`${colors.streakSocietyBg} ${colors.streakSocietyText} py-2 px-5 rounded-full text-center font-semibold tracking-wide text-sm mb-4 flex items-center gap-2`}>
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: colors.highlight }} />
              {t.STREAK.STREAK_SOCIETY}
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: colors.primary }} />
              </div>
            ) : (
              <div className="flex items-center justify-between flex-wrap gap-6 w-full">
                <div>
                  <h2 className="text-7xl font-bold drop-shadow-sm" style={{ color: colors.primary, WebkitTextStroke: "2px #FFD700" }}>{currentStreak}</h2>
                  <p className="text-xl mt-1" style={{ color: colors.primary }}>{t.STREAK.DAY_STREAK}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Flame className="h-24 w-24" style={{ color: colors.highlight, filter: "drop-shadow(0 2px 8px #FFD70099)" }} />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Card className={`${colors.cardBgs.practiced} border-none flex-1 shadow`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-white/70 rounded-full p-2 mr-2">
                  <span className="text-[#2F5530] font-bold text-2xl">✓</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold" style={{ color: colors.primary }}>{daysPracticed}</h4>
                  <p className="font-semibold" style={{ color: colors.primary }}>{t.STREAK.DAYS_PRACTICED}</p>
                </div>
              </CardContent>
            </Card>
            <Card className={`${colors.cardBgs.freeze} border-none flex-1 shadow`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-white/70 rounded-full p-2 mr-2">
                  <span className="text-[#FFD700] font-bold text-2xl">❄</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold" style={{ color: colors.primary }}>{freezeUsed}</h4>
                  <p className="font-semibold" style={{ color: colors.primary }}>{t.STREAK.FREEZE_USED}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={`${colors.card} border border-[#f8e4a5] shadow-sm p-4`}>
            <CardContent>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <button className="text-xl font-bold" style={{ color: colors.primary }}>&lt;</button>
                  <h3 className="text-lg font-extrabold" style={{ color: colors.primary }}>{currentMonth}</h3>
                  <button className="text-xl font-bold" style={{ color: colors.primary }}>&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-1">
                  {calendarDays.slice(0, 7).map((day, index) => (
                    <div key={`day-${index}`} className="font-medium text-sm text-center" style={{ color: colors.primary, opacity: 0.7 }}>
                      {day.day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day.date) return <div key={`empty-${index}`}></div>;

                    let cellClass = `${colors.calendarDay} rounded-full w-9 h-9 flex items-center justify-center mx-auto font-semibold text-base border border-[#F0E0A8]`;
                    let content: React.ReactNode = day.date;

                    if (day.status === "completed") {
                      cellClass = `${colors.calendarDone} rounded-full w-9 h-9 flex items-center justify-center mx-auto border border-[#AED581]`;
                    } else if (day.status === "freeze") {
                      cellClass = `${colors.calendarFreeze} rounded-full w-9 h-9 flex items-center justify-center mx-auto border border-[#FFD700] relative`;
                      content = (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {day.date}
                          <span
                            className="absolute -bottom-1 -right-1 text-xs"
                            style={{
                              color: "#FFD700",
                              fontWeight: "bold",
                              textShadow: "1px 1px 1px #fff",
                            }}
                          >
                            ❄
                          </span>
                        </div>
                      );
                    } else if (day.status === "active") {
                      cellClass = `${colors.calendarActive} rounded-full w-9 h-9 flex items-center justify-center mx-auto border border-[#FFD700] animate-bounce-slow`;
                    } else if (day.status === "today") {
                      cellClass = `${colors.calendarToday} rounded-full w-9 h-9 flex items-center justify-center mx-auto border border-[#FF7043]`;
                    }

                    return (
                      <div key={`date-${index}`} className={cellClass}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends">
          <div className={`${colors.card} text-center py-10 rounded-3xl`}>
            <Calendar className="h-16 w-16 mx-auto mb-2" style={{ color: colors.primary, opacity: 0.25 }} />
            <h3 className="text-lg font-medium" style={{ color: colors.primary }}>
              {t.STREAK.FRIENDS_MESSAGE}
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreakComponent;
