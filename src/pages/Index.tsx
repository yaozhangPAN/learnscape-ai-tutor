
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HomeNote from "@/components/home/HomeNote";
import { Video, Book, Star, Grid2x2, LayoutGrid } from "lucide-react";
import OnlineClassroomSection from "@/components/home/OnlineClassroomSection";
import LeaderboardSection from "@/components/home/LeaderboardSection";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { t, lang } = useI18n();

  const mainBlocks = [
    {
      key: "daily-adventure",
      // 多语言
      title: t.DAILY_PLAN.TITLE,
      desc: (
        <div className="flex items-center mt-1">
          <span className="bg-[#FFD047] text-[#7C6020] text-xs rounded-full px-2 py-0.5 mr-2 font-bold">{t.DAILY_PLAN.XP}</span>
          {t.DAILY_PLAN.DESC}
        </div>
      ),
      bg: "bg-[#F7941D]",
      text: "text-white",
      img: "/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png",
      to: "/daily-plan",
      customBgImg: "/lovable-uploads/a6490d24-162c-4faf-af6e-426d16fe09ff.png",
      isCustomBg: true,
      debugColor: "#F7941D",
    },
    {
      key: "ai-tutor",
      title: t.NAV.AI_TUTOR,
      desc: lang === "zh" ? "口语/写作/词汇练习" : "Speaking/Writing/Vocabulary Practice",
      bg: "bg-[#A48CF6]",
      text: "text-white",
      icon: <Grid2x2 className="w-8 h-8 mr-2" />,
      img: "/lovable-uploads/3d8abec2-bc96-4d7b-80c1-4ee8efef5c9c.png",
      to: "/ai-tutor"
    },
    {
      key: "video-lessons",
      title: t.NAV.VIDEO_LESSONS,
      desc: lang === "zh" ? "各科名师视频课程" : "Expert Video Lessons",
      bg: "bg-[#38B87D]",
      text: "text-white",
      icon: <Video className="w-8 h-8 mr-2" />,
      img: "/lovable-uploads/02c00429-df63-4436-8a1b-a1a76314f56e.png",
      to: "/video-tutorials"
    },
    {
      key: "online-classroom",
      title: t.NAV.ONLINE_CLASSROOM,
      desc: lang === "zh" ? "在线互动教室" : "Online Interactive Class",
      bg: "bg-[#4CC7EA]",
      text: "text-white",
      icon: <LayoutGrid className="w-8 h-8 mr-2" />,
      to: "/zoom-courses",
    },
    {
      key: "question-bank",
      title: t.NAV.QUESTION_BANK,
      desc: lang === "zh" ? "PSLE真题与模拟题" : "PSLE Real & Practice Questions",
      bg: "bg-[#19A69A]",
      text: "text-white",
      icon: <Book className="w-8 h-8 mr-2" />,
      img: "/lovable-uploads/f0df06aa-0094-4ce2-9d9a-d7d749143aed.png",
      to: "/question-bank"
    },
    {
      key: "my-words",
      title: t.NAV.MOCK_EXAM,
      desc: lang === "zh" ? "自适应模拟考试" : "Adaptive Mock Exam",
      bg: "bg-[#FFCA52]",
      text: "text-[#8D6923]",
      icon: (
        <img
          src="/lovable-uploads/47623492-7d97-4968-aa79-e349f06e68b4.png"
          alt="Mock Exam Icon"
          className="w-8 h-8 mr-2"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      ),
      img: "/lovable-uploads/47623492-7d97-4968-aa79-e349f06e68b4.png",
      to: "/mock-exam"
    },
    {
      key: "streak-progress",
      title: t.NAV.STREAK_PROGRESS,
      desc: "",
      bg: "bg-white",
      text: "text-[#6D5A21]",
      img: "/lovable-uploads/db9f7a45-8c5c-4cea-a1cc-534fd2cf61f5.png",
      to: "/dashboard",
      isStreakBlock: true,
    },
    {
      key: "leaderboard",
      title: t.NAV.LEADERBOARD,
      desc: lang === "zh" ? "排行榜" : "Leaderboard",
      bg: "bg-[#FFB300]",
      text: "text-[#6D5A21]",
      icon: (
        <img
          src="/lovable-uploads/1eabcd5f-326e-4849-bf2d-db471b7a4428.png"
          alt="Leaderboard Red Panda Icon"
          className="w-8 h-8 mr-2"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      ),
      to: "/leaderboard"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <HomeHeader />

        <div className="grid grid-cols-2 grid-rows-4 gap-4 max-w-2xl w-full my-4 transition-all">
          <Link
            to={mainBlocks[0].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[0].bg} ${mainBlocks[0].text}`}
            style={{
              minHeight: 164,
              background: mainBlocks[0].isCustomBg
                ? `url('${mainBlocks[0].customBgImg}') no-repeat center center, ${mainBlocks[0].debugColor}`
                : mainBlocks[0].debugColor,
              backgroundSize: mainBlocks[0].isCustomBg ? "cover" : undefined
            }}
          >
            <span className="text-xl font-bold mb-1 drop-shadow">{mainBlocks[0].title}</span>
            <div className="text-base drop-shadow">{mainBlocks[0].desc}</div>
            <div className="flex-1 flex items-end justify-end pr-2">
              {mainBlocks[0].img && (
                <img
                  src={mainBlocks[0].img}
                  alt="Daily Adventure Cartoon Character"
                  className="w-20 h-20 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          <Link
            to={mainBlocks[1].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[1].bg} ${mainBlocks[1].text}`}
            style={{ minHeight: 164 }}
          >
            <div className="flex items-center mb-2">{mainBlocks[1].icon}<span className="text-xl font-bold">{mainBlocks[1].title}</span></div>
            <div className="text-base font-medium">{mainBlocks[1].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              {mainBlocks[1].img && (
                <img
                  src={mainBlocks[1].img}
                  alt="AI Tutor Cartoon"
                  className="w-24 h-32 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          <Link
            to={mainBlocks[2].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[2].bg} ${mainBlocks[2].text}`}
            style={{ minHeight: 164 }}
          >
            <div className="flex items-center mb-2">{mainBlocks[2].icon}<span className="text-xl font-bold">{mainBlocks[2].title}</span></div>
            <div className="text-base font-medium">{mainBlocks[2].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              {mainBlocks[2].img && (
                <img
                  src={mainBlocks[2].img}
                  alt="Video Lessons Cartoon"
                  className="w-24 h-32 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          <OnlineClassroomSection
            to={mainBlocks[3].to}
            className={`${mainBlocks[3].bg} ${mainBlocks[3].text}`}
            icon={<img src="/lovable-uploads/7a7e4714-d8d9-4f9c-acdc-a5e2aaae7344.png" alt="Online Classroom Icon" className="w-8 h-8 mr-2" />}
            title={mainBlocks[3].title}
            desc={mainBlocks[3].desc}
          />

          <Link
            to={mainBlocks[4].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[4].bg} ${mainBlocks[4].text}`}
            style={{ minHeight: 164 }}
          >
            <div className="flex items-center mb-2">{mainBlocks[4].icon}<span className="text-xl font-bold">{mainBlocks[4].title}</span></div>
            <div className="text-base font-medium">{mainBlocks[4].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              {mainBlocks[4].img && (
                <img
                  src={mainBlocks[4].img}
                  alt="Question Bank Cartoon"
                  className="w-24 h-32 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          <Link
            to={mainBlocks[5].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[5].bg} ${mainBlocks[5].text}`}
            style={{ minHeight: 164 }}
          >
            <div className="flex items-center mb-2">
              {mainBlocks[5].icon}
              <span className="text-xl font-bold">{mainBlocks[5].title}</span>
            </div>
            <div className="text-base font-medium">{mainBlocks[5].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              {mainBlocks[5].img && (
                <img
                  src={mainBlocks[5].img}
                  alt="Mock Exam Cartoon"
                  className="w-24 h-32 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          <div 
            onClick={() => window.location.href = mainBlocks[6].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative bg-white text-[#6D5A21] min-h-[164px] overflow-hidden cursor-pointer`}
          >
            <div className="absolute top-3 left-3 z-10 bg-white/80 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow">{mainBlocks[6].title}</div>
            <img
              src={mainBlocks[6].img}
              alt="Streak and Progress Block"
              className="object-cover w-full h-full opacity-100 rounded-2xl"
              style={{ position: "absolute", inset: 0, zIndex: 0, userSelect: "none" }}
              draggable={false}
            />
            <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 hover:opacity-20 transition-opacity z-10"></div>
            <div className="flex-1 z-20"></div>
          </div>

          <LeaderboardSection
            to={mainBlocks[7].to}
            className={`${mainBlocks[7].bg} ${mainBlocks[7].text}`}
            icon={mainBlocks[7].icon}
            title={mainBlocks[7].title}
            desc={mainBlocks[7].desc}
          />
        </div>

        <HomeNote 
          className="max-w-2xl w-full"
          // 传递多语言文本
          note={
            lang === "zh"
              ? "点击各板块可进入对应功能。更多功能将在这里出现，敬请期待！"
              : "Click each module to visit its page. More features will show up here soon. Stay tuned!"
          }
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

