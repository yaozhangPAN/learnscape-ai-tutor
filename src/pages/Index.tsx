
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import DailyAdventureGrid from "@/components/home/DailyAdventureGrid";
import LearningSectionsGrid from "@/components/home/LearningSectionsGrid";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import PlaceholderImageBlock from "@/components/home/PlaceholderImageBlock";
import HomeNote from "@/components/home/HomeNote";
import { Video, Book, Star } from "lucide-react";

// 主色彩块数据
const colorBlocks = [
  {
    title: "Video Lessons",
    desc: "各科名师视频课程",
    className: "bg-[#71C479] text-white",
    icon: <Video className="w-8 h-8 mr-2" />,
    style: "row-span-2 flex-col justify-between",
    to: "/video-tutorials"
  },
  {
    title: "Question Bank",
    desc: "PSLE真题与模拟题",
    className: "bg-[#7FDBD7] text-[#31312D]",
    icon: <Book className="w-8 h-8 mr-2" />,
    style: "col-span-2",
    to: "/question-bank"
  },
  {
    title: "My Words",
    desc: "词语本&生词本",
    className: "bg-[#FFA64E] text-white",
    icon: <Star className="w-8 h-8 mr-2" />,
    style: "",
    to: "/vocabulary-builder"
  },
  {
    title: "AI Tutor",
    desc: "口语/写作/词汇练习",
    className: "bg-[#71C479] text-white",
    icon: <Star className="w-8 h-8 mr-2" />,
    style: "",
    to: "/ai-tutor"
  },
  {
    // Placeholder
    title: "",
    desc: "",
    className: "",
    icon: null,
    style: "row-span-2 flex items-center justify-center",
    to: ""
  },
  {
    // Daily Adventure
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
    to: "/dashboard"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <HomeHeader />

        <DailyAdventureGrid
          to={colorBlocks[5].to}
          className={colorBlocks[5].className}
          style={colorBlocks[5].style}
          desc={colorBlocks[5].desc}
        />

        <LearningSectionsGrid
          video={{
            to: colorBlocks[0].to,
            className: colorBlocks[0].className,
            icon: colorBlocks[0].icon,
            title: colorBlocks[0].title,
            desc: colorBlocks[0].desc
          }}
          aiTutor={{
            to: colorBlocks[3].to,
            className: colorBlocks[3].className,
            icon: colorBlocks[3].icon,
            title: colorBlocks[3].title,
            desc: colorBlocks[3].desc
          }}
        />

        <FeaturesGrid
          questionBank={{
            to: colorBlocks[1].to,
            className: colorBlocks[1].className,
            icon: colorBlocks[1].icon,
            title: colorBlocks[1].title,
            desc: colorBlocks[1].desc
          }}
          myWords={{
            to: colorBlocks[2].to,
            className: colorBlocks[2].className,
            icon: colorBlocks[2].icon,
            title: colorBlocks[2].title,
            desc: colorBlocks[2].desc
          }}
        />

        <PlaceholderImageBlock />

        <HomeNote />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
