
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HomeNote from "@/components/home/HomeNote";
import { Video, Book, Grid2x2, LayoutGrid } from "lucide-react";
import OnlineClassroomSection from "@/components/home/OnlineClassroomSection";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import HomeDailyAdventureSection from "@/components/home/HomeDailyAdventureSection";
import HomeAITutorSection from "@/components/home/HomeAITutorSection";
import HomeVideoLessonsSection from "@/components/home/HomeVideoLessonsSection";
import HomeQuestionBankSection from "@/components/home/HomeQuestionBankSection";
import HomeMockExamSection from "@/components/home/HomeMockExamSection";
import HomeStreakProgressSection from "@/components/home/HomeStreakProgressSection";
import HomeLeaderboardSection from "@/components/home/HomeLeaderboardSection";

const Index = () => {
  const { t, lang } = useI18n();

  // DAILY ADVENTURE 小图标
  const dailyIcon = "/lovable-uploads/134d4088-5005-41d9-9487-719568001089.png";

  const mainBlocks = [
    {
      key: "daily-adventure",
      title: t.DAILY_PLAN.TITLE,
      desc: t.DAILY_PLAN.DESC,
      xp: t.DAILY_PLAN.XP,
      xpBg: "bg-[#FFD047] text-[#7C6020]",
      bg: "bg-[#F7941D]",
      text: "text-white",
      img: "/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png",
      to: "/daily-plan",
      customBgImg: "/lovable-uploads/a6490d24-162c-4faf-af6e-426d16fe09ff.png",
      isCustomBg: true,
      debugColor: "#F7941D",
      iconImg: dailyIcon,
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
      img: "/lovable-uploads/db9f7a45-8c5c-4cea-a1cc-534fd2cf61f5.png",
      to: "/dashboard",
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
        <div className="grid grid-cols-2 grid-rows-4 gap-4 max-w-7xl w-full my-4 transition-all">
          <HomeDailyAdventureSection
            to={mainBlocks[0].to}
            title={mainBlocks[0].title}
            desc={mainBlocks[0].desc}
            bg={mainBlocks[0].bg}
            textColor={mainBlocks[0].text}
            xpText={mainBlocks[0].xp}
            xpBg={mainBlocks[0].xpBg}
            img={mainBlocks[0].img}
            bgImg={mainBlocks[0].customBgImg}
            isCustomBg={mainBlocks[0].isCustomBg}
            debugColor={mainBlocks[0].debugColor}
            iconImg={mainBlocks[0].iconImg}
          />
          <HomeAITutorSection
            to={mainBlocks[1].to}
            title={mainBlocks[1].title}
            desc={mainBlocks[1].desc}
            bg={mainBlocks[1].bg}
            textColor={mainBlocks[1].text}
            icon={mainBlocks[1].icon}
            img={mainBlocks[1].img}
          />
          <HomeVideoLessonsSection
            to={mainBlocks[2].to}
            title={mainBlocks[2].title}
            desc={mainBlocks[2].desc}
            bg={mainBlocks[2].bg}
            textColor={mainBlocks[2].text}
            icon={mainBlocks[2].icon}
            img={mainBlocks[2].img}
          />
          <OnlineClassroomSection
            to={mainBlocks[3].to}
            className={`${mainBlocks[3].bg} ${mainBlocks[3].text}`}
            icon={<img src="/lovable-uploads/7a7e4714-d8d9-4f9c-acdc-a5e2aaae7344.png" alt="Online Classroom Icon" className="w-8 h-8 mr-2" />}
            title={mainBlocks[3].title}
            desc={mainBlocks[3].desc}
          />
          <HomeQuestionBankSection
            to={mainBlocks[4].to}
            title={mainBlocks[4].title}
            desc={mainBlocks[4].desc}
            bg={mainBlocks[4].bg}
            textColor={mainBlocks[4].text}
            icon={mainBlocks[4].icon}
            img={mainBlocks[4].img}
          />
          <HomeMockExamSection
            to={mainBlocks[5].to}
            title={mainBlocks[5].title}
            desc={mainBlocks[5].desc}
            bg={mainBlocks[5].bg}
            textColor={mainBlocks[5].text}
            icon={mainBlocks[5].icon}
            img={mainBlocks[5].img}
          />
          <HomeStreakProgressSection
            to={mainBlocks[6].to}
            title={mainBlocks[6].title}
            img={mainBlocks[6].img}
          />
          <HomeLeaderboardSection
            to={mainBlocks[7].to}
            className={`${mainBlocks[7].bg} ${mainBlocks[7].text}`}
            icon={mainBlocks[7].icon}
            title={mainBlocks[7].title}
            desc={mainBlocks[7].desc}
          />
        </div>
        <HomeNote
          className="max-w-7xl w-full"
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
