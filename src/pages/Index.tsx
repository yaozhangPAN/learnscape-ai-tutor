import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Video, Book, Star } from "lucide-react";

// 主色彩块
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
    title: "Daily Goal",
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
        {/* 新布局: 顶部双并排大块 (Video Lessons + AI Tutor) */}
        <div className="grid grid-cols-2 grid-rows-1 gap-4 max-w-2xl w-full mb-4 transition-all">
          {/* Video Lessons */}
          <Link 
            to={colorBlocks[0].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${colorBlocks[0].className}`} 
            style={{ minHeight: 180 }}
          >
            <div>
              <div className="flex items-center mb-2">{colorBlocks[0].icon}<span className="text-xl font-bold">{colorBlocks[0].title}</span></div>
              <div className="text-sm font-medium">{colorBlocks[0].desc}</div>
            </div>
            <div className="mt-6 flex-1 flex items-end justify-center">
              <img
                src="/lovable-uploads/3d8abec2-bc96-4d7b-80c1-4ee8efef5c9c.png"
                alt="Cartoon Character"
                className="w-24 h-32 object-contain select-none drop-shadow-lg"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          </Link>
          {/* AI Tutor */}
          <Link 
            to={colorBlocks[3].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${colorBlocks[3].className}`} 
            style={{ minHeight: 180 }}
          >
            <div>
              <div className="flex items-center mb-2">{colorBlocks[3].icon}<span className="text-xl font-bold">{colorBlocks[3].title}</span></div>
              <div className="text-sm font-medium">{colorBlocks[3].desc}</div>
            </div>
            <div className="flex-1 flex items-end justify-center">
              <div className="w-20 h-20 bg-white/40 rounded-xl flex items-center justify-center font-bold text-[#B1B1B1] text-sm">{colorBlocks[3].placeholder}</div>
            </div>
          </Link>
        </div>
        {/* 第二行：Question Bank + My Words */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4 transition-all">
          {/* Question Bank | 题库 */}
          <Link 
            to={colorBlocks[1].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${colorBlocks[1].className} min-h-[144px]`}
          >
            <div className="flex items-center mb-2">{colorBlocks[1].icon}<span className="text-xl font-bold">{colorBlocks[1].title}</span></div>
            <div className="text-sm font-semibold">{colorBlocks[1].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              <img
                src="/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png"
                alt="Question Bank Cartoon Character"
                className="w-24 h-32 object-contain select-none drop-shadow-lg"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          </Link>
          {/* My Words | 词语本 */}
          <Link 
            to={colorBlocks[2].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${colorBlocks[2].className} min-h-[144px]`}
          >
            <div className="flex items-center mb-2">{colorBlocks[2].icon}<span className="text-xl font-bold">{colorBlocks[2].title}</span></div>
            <div className="text-sm font-medium">{colorBlocks[2].desc}</div>
            <div className="flex-1 flex items-end justify-end">
              <img
                src="/lovable-uploads/256e4bed-3c15-4fde-9f35-2b4259d122b7.png"
                alt="My Words Cartoon Character"
                className="w-24 h-32 object-contain select-none drop-shadow-lg"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          </Link>
        </div>
        {/* 第三行：留白模块 + Daily Goal */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-8 transition-all">
          {/* 留白块 */}
          <div className="flex items-center justify-center rounded-2xl bg-white/50 border-2 border-white shadow-lg min-h-[144px]">
            {colorBlocks[4].placeholder}
          </div>
          {/* Daily Goal */}
          <Link 
            to={colorBlocks[5].to} 
            className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg ${colorBlocks[5].className} ${colorBlocks[5].style}`}
          >
            <span className="text-lg font-bold mb-1">{colorBlocks[5].title}</span>
            {colorBlocks[5].desc}
            <div className="flex-1 flex items-end">
              <div className="w-20 h-20 bg-white/40 rounded-xl flex items-center justify-center font-bold text-[#B1B1B1] text-sm">{colorBlocks[5].placeholder}</div>
            </div>
          </Link>
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
