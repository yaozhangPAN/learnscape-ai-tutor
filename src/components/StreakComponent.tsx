import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import StreakHeader from "./streak/StreakHeader";
import StreakStats from "./streak/StreakStats";
import StreakMetrics from "./streak/StreakMetrics";
import StreakCalendar from "./streak/StreakCalendar";
import { streakColors } from "./streak/streakColors";

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
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

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
  }, [session?.user.id]);

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
    <div className={`${streakColors.mainBg} rounded-3xl p-4 md:p-8`}>
      <StreakHeader />
      
      <Tabs defaultValue="personal" className="w-full mb-4">
        <TabsList className={`w-full ${streakColors.tabBg} rounded-full h-12 mb-2 flex`}>
          <TabsTrigger
            value="personal"
            className={`w-1/2 rounded-full text-lg font-bold transition-all 
            ${activeTab === "personal" ? streakColors.activeTabBg : streakColors.inactiveTabBg}`}
            onClick={() => setActiveTab("personal")}
          >
            {t.STREAK.PERSONAL}
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className={`w-1/2 rounded-full text-lg font-bold transition-all 
            ${activeTab === "friends" ? streakColors.activeTabBg : streakColors.inactiveTabBg}`}
            onClick={() => setActiveTab("friends")}
          >
            {t.STREAK.FRIENDS}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-2">
          <StreakStats 
            currentStreak={currentStreak}
            isLoading={isLoading}
            t={t}
            colors={streakColors}
          />
          
          <StreakMetrics
            daysPracticed={daysPracticed}
            freezeUsed={freezeUsed}
            t={t}
            colors={streakColors}
          />
          
          <StreakCalendar
            calendarDays={calendarDays}
            currentMonth={currentMonth}
            colors={streakColors}
          />
        </TabsContent>

        <TabsContent value="friends">
          <div className={`${streakColors.card} text-center py-10 rounded-3xl`}>
            <Calendar className="h-16 w-16 mx-auto mb-2" style={{ color: streakColors.primary, opacity: 0.25 }} />
            <h3 className="text-lg font-medium" style={{ color: streakColors.primary }}>
              {t.STREAK.FRIENDS_MESSAGE}
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreakComponent;
