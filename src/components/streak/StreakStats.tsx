
import { Loader2, Flame } from "lucide-react";

interface StreakStatsProps {
  currentStreak: number;
  isLoading: boolean;
  t: any;
  colors: {
    primary: string;
    highlight: string;
    streakSocietyBg: string;
    streakSocietyText: string;
  };
}

const StreakStats = ({ currentStreak, isLoading, t, colors }: StreakStatsProps) => {
  return (
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
            <h2 className="text-7xl font-bold drop-shadow-sm" style={{ color: colors.primary, WebkitTextStroke: "2px #FFD700" }}>
              {currentStreak}
            </h2>
            <p className="text-xl mt-1" style={{ color: colors.primary }}>{t.STREAK.DAY_STREAK}</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Flame className="h-24 w-24" style={{ color: colors.highlight, filter: "drop-shadow(0 2px 8px #FFD70099)" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakStats;
