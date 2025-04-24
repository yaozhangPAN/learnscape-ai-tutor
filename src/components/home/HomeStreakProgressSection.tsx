
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  to: string;
  title: string;
  img: string;
}

const HomeStreakProgressSection: React.FC<Props> = ({
  to, title, img
}) => {
  const { session } = useAuth();
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const fetchStreakData = async () => {
      if (!session?.user.id) {
        setLoading(false);
        return;
      }

      try {
        const { data: streaks, error } = await supabase
          .from('daily_streaks')
          .select('*')
          .eq('user_id', session.user.id)
          .order('streak_date', { ascending: false })
          .limit(30);

        if (error) throw error;

        // Calculate current streak from the data
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        let streak = 0;
        const practicesDays = new Set<string>();
        
        if (streaks && streaks.length > 0) {
          // Add all streak dates to a set for counting unique days
          streaks.forEach(record => {
            if (typeof record.streak_date === 'string') {
              practicesDays.add(record.streak_date);
            }
          });

          // Calculate the consecutive streak
          const sortedDates = [...practicesDays].sort((a, b) => 
            new Date(b).getTime() - new Date(a).getTime()
          );
          
          // Start from today and count backwards
          let lastDate = currentDate;
          for (const dateStr of sortedDates) {
            const streakDate = new Date(dateStr);
            streakDate.setHours(0, 0, 0, 0);
            
            const diffDays = Math.round((lastDate.getTime() - streakDate.getTime()) / (1000 * 60 * 60 * 24));
            
            // If this day is consecutive with the last one or it's today
            if (diffDays <= 1) {
              streak++;
              lastDate = streakDate;
            } else {
              break;
            }
          }
        }
        
        setCurrentStreak(streak);
      } catch (error) {
        console.error('Error fetching streak data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
  }, [session?.user.id]);

  return (
    <Link 
      to={to}
      className="flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative bg-white text-[#6D5A21] min-h-[180px] overflow-hidden cursor-pointer w-full"
    >
      <div className="absolute top-3 left-3 z-10 bg-white/80 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow">{title}</div>
      <img
        src={img}
        alt="Streak and Progress Block"
        className="object-cover w-full h-full opacity-100 rounded-2xl"
        style={{ position: "absolute", inset: 0, zIndex: 0, userSelect: "none" }}
        draggable={false}
      />
      <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 hover:opacity-20 transition-opacity z-10"></div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center z-20">
          <Loader2 className="h-6 w-6 animate-spin text-[#C48829]" />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C48829]">{currentStreak}</div>
            <div className="text-sm text-[#6D5A21]">{t.STREAK.DAY_STREAK}</div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default HomeStreakProgressSection;
