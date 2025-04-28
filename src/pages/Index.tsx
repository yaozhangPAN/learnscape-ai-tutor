
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HomeNote from "@/components/home/HomeNote";
import { Video, Grid2x2, LayoutGrid } from "lucide-react";
import OnlineClassroomSection from "@/components/home/OnlineClassroomSection";
import { useI18n } from "@/contexts/I18nContext";
import HomeAITutorSection from "@/components/home/HomeAITutorSection";
import HomeVideoLessonsSection from "@/components/home/HomeVideoLessonsSection";

const Index = () => {
  const { t, lang } = useI18n();

  const mainBlocks = [
    {
      key: "ai-tutor",
      title: t.NAV.AI_TUTOR,
      desc: lang === "zh" ? "口语/写作/词汇练习" : "Speaking/Writing/Vocabulary Practice",
      bg: "bg-[#A48CF6]",
      text: "text-white",
      icon: <Grid2x2 className="w-8 h-8 mr-2" />,
      img: "/lovable-uploads/08dd607c-c712-4811-a7fb-d18a717613dd.png",
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
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <HomeHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full my-4 transition-all">
          <HomeAITutorSection
            to={mainBlocks[0].to}
            title={mainBlocks[0].title}
            desc={mainBlocks[0].desc}
            bg={mainBlocks[0].bg}
            textColor={mainBlocks[0].text}
            icon={mainBlocks[0].icon}
            img={mainBlocks[0].img}
          />
          <HomeVideoLessonsSection
            to={mainBlocks[1].to}
            title={mainBlocks[1].title}
            desc={mainBlocks[1].desc}
            bg={mainBlocks[1].bg}
            textColor={mainBlocks[1].text}
            icon={mainBlocks[1].icon}
            img={mainBlocks[1].img}
          />
          <OnlineClassroomSection
            to={mainBlocks[2].to}
            className={`${mainBlocks[2].bg} ${mainBlocks[2].text}`}
            icon={<img src="/lovable-uploads/7a7e4714-d8d9-4f9c-acdc-a5e2aaae7344.png" alt="Online Classroom Icon" className="w-8 h-8 mr-2" />}
            title={mainBlocks[2].title}
            desc={mainBlocks[2].desc}
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
