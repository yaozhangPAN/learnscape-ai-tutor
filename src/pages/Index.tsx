
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HomeNote from "@/components/home/HomeNote";
import { Video, Book, Star, Grid2x2, LayoutGrid } from "lucide-react";
import OnlineClassroomSection from "@/components/home/OnlineClassroomSection";
import LeaderboardSection from "@/components/home/LeaderboardSection";
import { Link } from "react-router-dom";

// 颜色参考模版配色（写明 HEX 方便维护）
const mainBlocks = [
  // Row 1
  {
    key: "daily-adventure",
    title: "Daily Adventure",
    desc: (
      <div className="flex items-center mt-1">
        <span className="bg-[#FFD047] text-[#7C6020] text-xs rounded-full px-2 py-0.5 mr-2 font-bold">50 XP</span>
        完成今日目标
      </div>
    ),
    bg: "bg-[#38B87D]", // 嫩绿色，模版绿色
    text: "text-white",
    img: "/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png",
    to: "/dashboard",
    customBgImg: "/lovable-uploads/a6490d24-162c-4faf-af6e-426d16fe09ff.png",
    isCustomBg: true,
  },
  {
    key: "ai-tutor",
    title: "AI Tutor",
    desc: "口语/写作/词汇练习",
    bg: "bg-[#A48CF6]", // 粉紫色，模版紫色
    text: "text-white",
    icon: <Grid2x2 className="w-8 h-8 mr-2" />,
    img: "/lovable-uploads/3d8abec2-bc96-4d7b-80c1-4ee8efef5c9c.png",
    to: "/ai-tutor"
  },
  // Row 2
  {
    key: "video-lessons",
    title: "Video Lessons",
    desc: "各科名师视频课程",
    bg: "bg-[#FF9E43]", // 橙色
    text: "text-white",
    icon: <Video className="w-8 h-8 mr-2" />,
    img: "/lovable-uploads/02c00429-df63-4436-8a1b-a1a76314f56e.png",
    to: "/video-tutorials"
  },
  {
    key: "online-classroom",
    title: "Online Classroom",
    desc: "在线互动教室",
    bg: "bg-[#4CC7EA]", // 模版蓝绿色
    text: "text-white",
    icon: <LayoutGrid className="w-8 h-8 mr-2" />,
    to: "/zoom-courses",
    // 新建组件
  },
  // Row 3
  {
    key: "question-bank",
    title: "Question Bank",
    desc: "PSLE真题与模拟题",
    bg: "bg-[#19A69A]", // 模版蓝绿色
    text: "text-white",
    icon: <Book className="w-8 h-8 mr-2" />,
    img: "/lovable-uploads/f0df06aa-0094-4ce2-9d9a-d7d749143aed.png",
    to: "/question-bank"
  },
  {
    key: "my-words",
    title: "My Words",
    desc: "词语本&生词本",
    bg: "bg-[#FFCA52]", // 模版黄橙
    text: "text-[#8D6923]",
    icon: <Star className="w-8 h-8 mr-2" />,
    img: "/lovable-uploads/673f2711-1205-4d7f-b4cd-7ac68b6ca77e.png",
    to: "/vocabulary-builder"
  },
  // Row 4
  {
    key: "streak-progress",
    title: "Streak and Progress",
    desc: "",
    bg: "bg-white",
    text: "text-[#6D5A21]",
    img: "/lovable-uploads/a067619b-95eb-40fd-bb8a-8808598de71d.png",
    to: "/dashboard",
    isStreakBlock: true,
  },
  {
    key: "leaderboard",
    title: "Leaderboard",
    desc: "排行榜",
    bg: "bg-[#FADE61]", // 淡黄（与streak类似）
    text: "text-[#6D5A21]",
    icon: <LayoutGrid className="w-8 h-8 mr-2" />,
    to: "/leaderboard"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <HomeHeader />

        {/* 主模块区 4x2 */}
        <div className="grid grid-cols-2 grid-rows-4 gap-4 max-w-2xl w-full my-4 transition-all">

          {/* Row 1: Daily Adventure & AI Tutor */}
          {/* Daily Adventure（嫩绿色+背景图+小角色） */}
          <Link
            to={mainBlocks[0].to}
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${mainBlocks[0].bg} ${mainBlocks[0].text}`}
            style={{
              minHeight: 164,
              background: mainBlocks[0].isCustomBg
                ? `url('${mainBlocks[0].customBgImg}') no-repeat center center, #38B87D`
                : undefined,
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

          {/* AI Tutor（粉紫色+角色） */}
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

          {/* Row 2: Video Lessons & Online Classroom */}
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
            icon={mainBlocks[3].icon}
            title={mainBlocks[3].title}
            desc={mainBlocks[3].desc}
          />

          {/* Row 3: Question Bank & My Words */}
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
            <div className="flex items-center mb-2">{mainBlocks[5].icon}<span className="text-xl font-bold">{mainBlocks[5].title}</span></div>
            <div className="text-base font-medium">{mainBlocks[5].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              {mainBlocks[5].img && (
                <img
                  src={mainBlocks[5].img}
                  alt="My Words Cartoon"
                  className="w-24 h-32 object-contain select-none drop-shadow-lg"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              )}
            </div>
          </Link>

          {/* Row 4: Streak and Progress & Leaderboard */}
          {/* Streak and Progress 特别处理：背景图 */}
          <div className="flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative bg-white text-[#6D5A21] min-h-[164px] overflow-hidden">
            {/* 标题 */}
            <div className="absolute top-3 left-3 z-10 bg-white/80 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow">Streak and Progress</div>
            {/* 背景图片 */}
            <img
              src={mainBlocks[6].img}
              alt="Streak and Progress Block"
              className="object-cover w-full h-full opacity-100 rounded-2xl"
              style={{ position: "absolute", inset: 0, zIndex: 0, userSelect: "none" }}
              draggable={false}
            />
            {/* 亮光效果 */}
            <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 hover:opacity-20 transition-opacity z-10"></div>
            {/* 填充空间 */}
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

        <HomeNote />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
