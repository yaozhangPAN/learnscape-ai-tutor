
import { Card, CardContent } from "@/components/ui/card";

interface CalendarDay {
  day: string;
  date: number | null;
  status?: string;
}

interface StreakCalendarProps {
  calendarDays: CalendarDay[];
  currentMonth: string;
  colors: {
    primary: string;
    card: string;
    calendarDay: string;
    calendarDone: string;
    calendarFreeze: string;
    calendarActive: string;
    calendarToday: string;
  };
}

const StreakCalendar = ({ calendarDays, currentMonth, colors }: StreakCalendarProps) => {
  return (
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
  );
};

export default StreakCalendar;
