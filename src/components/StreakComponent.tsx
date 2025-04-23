
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

  // 按照首页配色重定义色卡
  const colors = {
    mainBg: "bg-[#FFF6D5]", // 奶黄，整体背景
    primary: "#2F5530",      // 深绿色
    highlight: "#FFD700",    // 黄色高光点
    card: "bg-[#FFEFAE]",    // 卡片背景奶黄
    streakSocietyBg: "bg-[#2F5530]", // 深绿色
    streakSocietyText: "text-white",
    tabBg: "bg-[#FFEFAE]", // tab 背景卡片色，未激活奶黄
    activeTabBg: "bg-[#2F5530] text-white",
    inactiveTabBg: "bg-[#FFEFAE] text-[#2F5530]",
    cardBgs: {
      practiced: "bg-[#AED581]", // 草绿
      freeze: "bg-[#FBC02D]",    // 金黄
    },
    cardText: "text-[#2F5530]",
    button: "bg-[#2F5530] text-white hover:bg-[#21401f]",
    calendarDay: "bg-[#FFEFAE] text-[#2F5530]", // 日历普通天
    calendarDone: "bg-[#AED581] text-[#2F5530] font-bold", // 打卡完成天
    calendarFreeze: "bg-[#FBC02D] text-white font-bold", // 冻结
    calendarActive: "bg-[#FFD700] text-[#2F5530] font-bold", // 重点
    calendarToday: "bg-[#FF7043] text-white font-bold", // 今日高亮
  };

  // 日历数据不变
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

        {/* 个人连续打卡 */}
        <TabsContent value="personal" className="mt-2">
          <div className="mb-6 flex flex-col items-center">
            <div className={`${colors.streakSocietyBg} ${colors.streakSocietyText} py-2 px-5 rounded-full text-center font-semibold tracking-wide text-sm mb-4 flex items-center gap-2`}>
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: colors.highlight }} />
              {t.STREAK.STREAK_SOCIETY}
            </div>
            <div className="flex items-center justify-between flex-wrap gap-6 w-full">
              <div>
                <h2 className="text-7xl font-bold drop-shadow-sm" style={{ color: colors.primary, WebkitTextStroke: "2px #FFD700" }}>{currentStreak}</h2>
                <p className="text-xl mt-1" style={{ color: colors.primary }}>{t.STREAK.DAY_STREAK}</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Flame className="h-24 w-24" style={{ color: colors.highlight, filter: "drop-shadow(0 2px 8px #FFD70099)" }} />
              </div>
            </div>
          </div>

          {/* 已练习天数、冻结 */}
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

          {/* 日历 */}
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
                    let content = day.date;

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

          {/* 继续打卡按钮和提醒 */}
          <div className="mt-6 text-center">
            <Button className={`${colors.button} text-lg px-8 py-3 rounded-full font-bold shadow`} style={{ backgroundColor: colors.primary, color: "#FFF" }}>
              {t.STREAK.EXTEND_STREAK}
            </Button>
            <div className="mt-2 font-semibold flex justify-center items-center gap-2" style={{ color: colors.primary }}>
              <Clock className="inline-block h-5 w-5 mr-1" style={{ color: colors.highlight }} />
              {t.STREAK.STREAK_WARNING}
            </div>
          </div>
        </TabsContent>

        {/* 好友 */}
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
