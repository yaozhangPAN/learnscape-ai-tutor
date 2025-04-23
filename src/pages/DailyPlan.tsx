import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

const DailyPlan = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-[#fbed96]">
      <Navbar />
      {/* 顶部橙色 Banner，与主页保持一致 */}
      <div className="bg-[#F7941D] text-white py-10 rounded-b-3xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4">
          {/* 卡通角色 */}
          <img
            src="/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png"
            alt="Daily Adventure Cartoon Character"
            className="w-24 h-24 object-contain drop-shadow-lg mr-0 md:mr-8"
            draggable={false}
            style={{ userSelect: "none" }}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-playfair drop-shadow mb-2 flex items-center gap-3">
              <Calendar className="h-10 w-10 text-white/90" />
              <span>{t.DAILY_PLAN.TITLE}</span>
              <span className="bg-[#FFD047] text-[#7C6020] text-xs rounded-full px-3 py-1 ml-2 font-bold shadow-md">{t.DAILY_PLAN.XP}</span>
            </h1>
            <p className="text-lg max-w-3xl mt-1 font-semibold text-white/90">
              {t.DAILY_PLAN.DESC}
            </p>
          </div>
        </div>
      </div>
      {/* 内容卡片 + 今日路径 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 白色卡片，带有柔和阴影与圆角 */}
        <div className="bg-white rounded-3xl shadow p-6 md:p-10 -mt-12 relative z-10 border border-[#fcd063]/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/a6490d24-162c-4faf-af6e-426d16fe09ff.png"
                alt="Daily Adventure Bg"
                className="w-16 h-16 object-contain rounded-xl shadow"
                draggable={false}
                style={{ userSelect: "none" }}
              />
              <h2 className="text-2xl font-bold text-[#E2923A] tracking-tight">
                {t.DAILY_PLAN.PATH_TITLE}
              </h2>
            </div>
            <Link to="/zoom-courses">
              <Button variant="outline" className="gap-2 border-[#4ABA79] text-[#4ABA79] font-bold bg-[#e2fded] hover:bg-[#4ABA79] hover:text-white transition">
                {t.DAILY_PLAN.JOIN_ZOOM}
              </Button>
            </Link>
          </div>
          <DailyRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
