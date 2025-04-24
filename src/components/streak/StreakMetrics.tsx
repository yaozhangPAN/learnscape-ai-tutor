
import { Card, CardContent } from "@/components/ui/card";

interface StreakMetricsProps {
  daysPracticed: number;
  freezeUsed: number;
  t: any;
  colors: {
    primary: string;
    cardBgs: {
      practiced: string;
      freeze: string;
    };
  };
}

const StreakMetrics = ({ daysPracticed, freezeUsed, t, colors }: StreakMetricsProps) => {
  return (
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
  );
};

export default StreakMetrics;
