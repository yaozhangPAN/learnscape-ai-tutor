import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import AITutorHero from "@/components/AITutor/AITutorHero";
import AITutorBubbleDecor from "@/components/AITutor/AITutorBubbleDecor";

// 定义配色方案
const cardColors = [
  "bg-[#e5deff]", // 淡紫
  "bg-[#d3e4fd]", // 淡蓝
  "bg-[#fbed96]", // 淡黄
  "bg-[#e2fded]", // 嫩绿
  "bg-[#ffe3e3]", // 淡粉
  "bg-[#fbeadd]", // 奶油色
];

// 可用的卡通图片（建议轮换）
const cartoonImages = [
  "/lovable-uploads/3d8abec2-bc96-4d7b-80c1-4ee8efef5c9c.png",
  "/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png",
  "/lovable-uploads/9a9791df-299b-4d4f-b4e4-4cd232ecf481.png",
  "/lovable-uploads/47623492-7d97-4968-aa79-e349f06e68b4.png",
  "/lovable-uploads/810634f8-55f5-400e-b770-6eed83a82bec.png",
  "/lovable-uploads/db9f7a45-8c5c-4cea-a1cc-534fd2cf61f5.png"
];

const AITutor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageArtsClick = () => {
    navigate("/ai-tutor/language-arts");
  };

  // 卡片内容配置
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      subtitle: "写作教练",
      icon: "/lovable-uploads/ea629f6c-6bb6-4da1-a355-703f3196322d.png", // New bear icon
      color: cardColors[0],
      description: "提升写作技巧，获得AI写作反馈和建议。",
      path: "/ai-tutor/writing-coach",
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      subtitle: "口语闯关",
      icon: cartoonImages[1],
      color: cardColors[1],
      description: "趣味口语练习，助你自信拿下面试。",
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: "Dictation Practice",
      subtitle: "英语听写",
      icon: "/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png",
      color: cardColors[2],
      description: "中英文听写训练，语音输入更轻松！",
      path: "/ai-tutor/dictation-practice",
      emoji: "🎧"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      subtitle: "一对一提问",
      icon: cartoonImages[3],
      color: cardColors[3],
      description: "学科难题不会怕，问AI随时随地答。",
      path: "/ai-tutor/tutor-me",
      emoji: "🧠"
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      subtitle: "词汇冲关",
      icon: "/lovable-uploads/dd362a8e-2391-4d80-aa88-c1d33876d724.png",
      color: cardColors[4],
      description: "闯关答题记单词，词汇量UP!",
      path: "/ai-tutor/vocabulary",
      emoji: "📚"
    },
    {
      id: "language-arts",
      title: "Language Arts Workshop",
      subtitle: "语文工坊",
      icon: cartoonImages[5],
      color: cardColors[5],
      description: "创意写作&阅读理解，全面提升语文能力。",
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fd] relative overflow-x-hidden">
      <Navbar />
      {/* Banner 插图和大��题区域 */}
      <div className="relative z-10"> 
        <AITutorHero />
        <AITutorBubbleDecor />
      </div>

      <main className="flex-1 relative">
        <div className={`max-w-7xl mx-auto px-4 pt-12 pb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          {!isPremium && <SubscriptionBanner type="ai-tutor" />}
          <h2 className="text-2xl md:text-3xl text-[#6641b5] font-extrabold mb-8 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            选择你需要的AI学习助手
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tutorOptions.map((option, i) => (
              <div 
                key={option.id}
                className={`relative group`}
                onClick={option.onClick}
              >
                <Link
                  to={option.path}
                  onClick={e => {
                    if (option.onClick) {
                      e.preventDefault();
                      option.onClick();
                    }
                  }}
                  className="no-underline"
                >
                  <Card className={`${option.color} rounded-3xl shadow-xl h-full overflow-hidden border-2 border-[#d1d5db] hover:scale-105 transition-transform group hover:shadow-2xl`}>
                    <CardHeader className="flex flex-col items-center text-center pb-2 relative">
                      <div className="mb-2">
                        <img 
                          src={option.icon}
                          alt={option.title}
                          className="w-20 h-20 rounded-full shadow-md border-4 border-white object-cover drop-shadow-xl bg-white"
                          draggable="false"
                        />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold flex items-center text-[#5a42b2] group-hover:tracking-wide">
                        {option.title}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce-slow">{option.emoji}</span>
                      </CardTitle>
                      <div className="text-xs text-[#b58a37] font-medium tracking-widest mt-1 mb-0.5">{option.subtitle}</div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-[#684c2c] text-base font-medium min-h-[62px]">
                        {option.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-center mt-2">
                      <Button variant="ghost" className="bg-white/90 rounded-lg shadow group-hover:bg-[#f6f3ff] tracking-wide transition-all px-6 py-2 text-[#6a38a4] font-semibold">
                        进入 {option.title}
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
