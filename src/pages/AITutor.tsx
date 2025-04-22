
import { useState, useEffect } from "react";
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

  // 更新后的卡片风格和配置
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      subtitle: "写作教练",
      icon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=128&q=80",
      bg: "from-[#FFE29F] via-[#FFDFC4] to-[#FFD1FA]",
      description: "提升写作技巧，获得AI写作反馈和建议。",
      path: "/ai-tutor/writing-coach",
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      subtitle: "口语闯关",
      icon: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=facearea&w=128&q=80",
      bg: "from-[#e0e7ff] via-[#ffe29f] to-[#fae8ff]",
      description: "趣味口语练习，助你自信拿下面试。",
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: "Dictation Practice",
      subtitle: "英语听写",
      icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=128&q=80",
      bg: "from-[#c3edfa] via-[#ffe29f] to-[#fbeadd]",
      description: "中英文听写训练，语音输入更轻松！",
      path: "/ai-tutor/dictation-practice",
      emoji: "🎧"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      subtitle: "一对一提问",
      icon: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&w=128&q=80",
      bg: "from-[#d2ffd2] via-[#d6bcfa] to-[#fbed96]",
      description: "学科难题不会怕，问AI随时随地答。",
      path: "/ai-tutor/tutor-me",
      emoji: "🧠"
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      subtitle: "词汇冲关",
      icon: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=128&q=80",
      bg: "from-[#ffe3e3] via-[#fffae3] to-[#d4fcf6]",
      description: "闯关答题记单词，词汇量UP!",
      path: "/ai-tutor/vocabulary",
      emoji: "📚"
    },
    {
      id: "language-arts",
      title: "Language Arts Workshop",
      subtitle: "语文工坊",
      icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=128&q=80",
      bg: "from-[#cbe3f7] via-[#ffd29a] to-[#fae8ff]",
      description: "创意写作&阅读理解，全面提升语文能力。",
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f7dffb] via-[#fffbea] to-[#e2fded] relative overflow-x-hidden">
      <Navbar />
      {/* Banner 插图和大标题区域 */}
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
                className="relative group"
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
                  <Card className={`rounded-3xl shadow-xl h-full overflow-hidden border-2 border-transparent hover:scale-105 transition-transform bg-gradient-to-br ${option.bg} group hover:shadow-2xl`}>
                    <CardHeader className="flex flex-col items-center text-center pb-2 relative">
                      <div className="mb-2">
                        <img 
                          src={option.icon}
                          alt={option.title}
                          className="w-16 h-16 rounded-full shadow-md border-4 border-white object-cover drop-shadow-xl bg-white"
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
                      <Button variant="ghost" className="bg-white/90 rounded-lg shadow group-hover:bg-[#fff6df] tracking-wide transition-all px-6 py-2 text-[#6a38a4] font-semibold">
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
