
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DailyAdventure from "@/components/home/DailyAdventure";
import VideoSection from "@/components/home/VideoSection";
import QuestionBankSection from "@/components/home/QuestionBankSection";
import MyWordsSection from "@/components/home/MyWordsSection";
import AITutorSection from "@/components/home/AITutorSection";
import EmptyBlock from "@/components/home/EmptyBlock";
import { Video, Book, Star } from "lucide-react";
import { Link } from "react-router-dom";

// 主色彩块数据
const colorBlocks = [
  {
    title: "Video Lessons",
    desc: "各科名师视频课程",
    className: "bg-[#71C479] text-white",
    icon: <Video className="w-8 h-8 mr-2" />,
    style: "row-span-2 flex-col justify-between",
    to: "/video-tutorials",
    placeholder: "预留插图"
  },
  {
    title: "Question Bank",
    desc: "PSLE真题与模拟题",
    className: "bg-[#7FDBD7] text-[#31312D]",
    icon: <Book className="w-8 h-8 mr-2" />,
    style: "col-span-2",
    to: "/question-bank",
    placeholder: "预留插图"
  },
  {
    title: "My Words",
    desc: "词语本&生词本",
    className: "bg-[#FFA64E] text-white",
    icon: <Star className="w-8 h-8 mr-2" />,
    style: "",
    to: "/vocabulary-builder",
    placeholder: "预留插图"
  },
  {
    title: "AI Tutor",
    desc: "口语/写作/词汇练习",
    className: "bg-[#71C479] text-white",
    icon: <Star className="w-8 h-8 mr-2" />,
    style: "",
    to: "/ai-tutor",
    placeholder: "预留插图"
  },
  {
    title: "",
    desc: "",
    className: "",
    icon: null,
    style: "row-span-2 flex items-center justify-center",
    to: "",
    placeholder: "预留插图"
  },
  {
    title: "Daily Adventure",
    desc: (
      <>
        <div className="flex items-center mt-1">
          <span className="bg-[#FF5E5B] text-white text-xs rounded-full px-2 py-0.5 mr-2">50 XP</span>
          完成今日目标
        </div>
      </>
    ),
    className: "bg-white border-2 border-[#FFEEAE] text-[#31312D]",
    icon: null,
    style: "col-span-2 flex-col justify-center",
    to: "/dashboard",
    placeholder: "预留插图"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#915723] mb-2 tracking-tight" style={{ fontFamily: "Nunito, sans-serif" }}>
          My Learning
        </h1>
        <div className="mb-6 flex space-x-2">
          <span className="w-4 h-4 bg-white/70 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-200 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
        </div>
        
        {/* Daily Adventure section moved to the top */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4 transition-all">
          <DailyAdventure
            to={colorBlocks[5].to}
            className={colorBlocks[5].className}
            style={colorBlocks[5].style}
            desc={colorBlocks[5].desc}
          />
        </div>

        {/* 顶部双并排大块 (Video Lessons + AI Tutor) */}
        <div className="grid grid-cols-2 grid-rows-1 gap-4 max-w-2xl w-full mb-4 transition-all">
          <VideoSection
            to={colorBlocks[0].to}
            className={colorBlocks[0].className}
            icon={colorBlocks[0].icon}
            title={colorBlocks[0].title}
            desc={colorBlocks[0].desc}
          />
          <AITutorSection
            to={colorBlocks[3].to}
            className={colorBlocks[3].className}
            icon={colorBlocks[3].icon}
            title={colorBlocks[3].title}
            desc={colorBlocks[3].desc}
          />
        </div>
        
        {/* 第二行：Question Bank + My Words */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4 transition-all">
          <QuestionBankSection
            to={colorBlocks[1].to}
            className={colorBlocks[1].className}
            icon={colorBlocks[1].icon}
            title={colorBlocks[1].title}
            desc={colorBlocks[1].desc}
          />
          <MyWordsSection
            to={colorBlocks[2].to}
            className={colorBlocks[2].className}
            icon={colorBlocks[2].icon}
            title={colorBlocks[2].title}
            desc={colorBlocks[2].desc}
          />
        </div>
        
        {/* 第三行：留白模块 */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-8 transition-all">
          <EmptyBlock />
        </div>
        
        {/* 温馨提示 */}
        <div className="bg-white/80 rounded-xl px-6 py-3 text-center text-[#955F1D] text-base shadow-sm font-semibold max-w-md mx-auto">
          角色卡通将在这里出现，敬请期待！点击各板块可进入对应功能。
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
