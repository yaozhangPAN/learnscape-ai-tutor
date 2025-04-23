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
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const COLOR_BG = "#FFF6D5";
const COLOR_CARD_BG = "#FFEFAE";
const COLOR_PRIMARY = "#2F5530";
const COLOR_TITLE = "#2F5530";
const COLOR_PURPLE = "#B39DDB";
const COLOR_ORANGE = "#F7941D";
const COLOR_MINT = "#26A69A";
const COLOR_BLUE = "#4FC3F7";
const COLOR_YELLOW = "#FBC02D";
const COLOR_GREEN = "#AED581";
const COLOR_RED = "#FF7043";
const COLOR_HOVER_PURPLE = "#AF93E5";
const COLOR_CARD_BORDER = "#E6DFBA";
const COLOR_CARD_BOXSHADOW = "0 3px 16px 0 rgba(47,85,48,0.07)";

const cardHoverMap = {
  "bg-[#e5deff]": COLOR_HOVER_PURPLE,
  "bg-[#d3e4fd]": "#B9DCF9",
  "bg-[#fbed96]": "#F8D418",
  "bg-[#e2fded]": "#A7E4D7",
  "bg-[#ffe3e3]": "#FFB3B3",
  "bg-[#fbeadd]": "#FFEBA2",
  "bg-[#FFEFAE]": "#FFE27A"
};

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
  const { t, lang } = useI18n();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleUpgradeNotice = () => {
    toast({
      title: lang === 'zh' ? "功能升级中" : "Feature Upgrading",
      description: lang === 'zh' ? "该功能正在升级中，敬请期待上线！" : "This feature is currently being upgraded. Stay tuned!",
      variant: "default",
    });
  };

  const handleLanguageArtsClick = () => {
    navigate("/ai-tutor/language-arts");
  };

  const tutorOptions = [
    {
      id: "writing-coach",
      title: t.AI_TUTOR.WRITING_COACH,
      subtitle: t.AI_TUTOR.SUBTITLE_WRITING,
      icon: "/lovable-uploads/1bd5d4e2-d0e7-4caf-a458-e87bbd5e7418.png",
      color: COLOR_PURPLE,
      description: t.AI_TUTOR.WRITING_COACH_DESC,
      path: "#",
      onClick: handleUpgradeNotice,
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: t.AI_TUTOR.ORAL_EXAM,
      subtitle: t.AI_TUTOR.SUBTITLE_ORAL,
      icon: "/lovable-uploads/eb69da2f-b824-461b-bcd4-3c65112631ff.png",
      color: COLOR_BLUE,
      description: t.AI_TUTOR.ORAL_EXAM_DESC,
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: t.AI_TUTOR.DICTATION,
      subtitle: t.AI_TUTOR.SUBTITLE_DICTATION,
      icon: "/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png",
      color: COLOR_MINT,
      description: t.AI_TUTOR.DICTATION_DESC,
      path: "#",
      onClick: handleUpgradeNotice,
      emoji: "🎧"
    },
    {
      id: "tutor-me",
      title: t.AI_TUTOR.TUTOR_ME,
      subtitle: t.AI_TUTOR.SUBTITLE_TUTOR,
      icon: "/lovable-uploads/134d4088-5005-41d9-9487-719568001089.png",
      color: COLOR_GREEN,
      description: t.AI_TUTOR.TUTOR_ME_DESC,
      path: "#",
      onClick: handleUpgradeNotice,
      emoji: "🧠"
    },
    {
      id: "vocabulary",
      title: t.AI_TUTOR.VOCABULARY,
      subtitle: t.AI_TUTOR.SUBTITLE_VOCAB,
      icon: "/lovable-uploads/3a8a17fe-664a-4c72-990a-dee148e1f5bb.png",
      color: COLOR_ORANGE,
      description: t.AI_TUTOR.VOCABULARY_DESC,
      path: "#",
      onClick: handleUpgradeNotice,
      emoji: "📚"
    },
    {
      id: "language-arts",
      title: t.AI_TUTOR.LANGUAGE_ARTS,
      subtitle: t.AI_TUTOR.SUBTITLE_LANGUAGE_ARTS,
      icon: "/lovable-uploads/35e5ebeb-cc32-46fc-961d-fb6241e51756.png",
      color: COLOR_YELLOW,
      description: t.AI_TUTOR.LANGUAGE_ARTS_DESC,
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝"
    }
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ background: COLOR_BG }}
    >
      <Navbar />
      <div className="relative z-10">
        <AITutorHero />
        <AITutorBubbleDecor />
      </div>
      <main className="flex-1 relative z-10">
        <div
          className={`max-w-7xl mx-auto px-4 pt-12 pb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {!isPremium && <SubscriptionBanner type="ai-tutor" />}
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-8 flex items-center gap-2 tracking-tight"
            style={{ color: COLOR_TITLE, letterSpacing: 0.5 }}
          >
            <Sparkles className="h-7 w-7" style={{ color: "#FFD700", marginRight: 8 }} />
            {t.AI_TUTOR.TITLE}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tutorOptions.map((option, i) => (
              <div
                key={option.id}
                className="relative group"
                onClick={option.onClick}
              >
                {option.path === "#" ? (
                  <div className="cursor-pointer">
                    <Card
                      className="rounded-3xl shadow-xl h-full overflow-hidden border-0 card-hover transition-transform opacity-75"
                      style={{
                        background: option.color,
                        boxShadow: COLOR_CARD_BOXSHADOW,
                        border: `2px solid ${COLOR_CARD_BORDER}`,
                      }}
                    >
                      <CardHeader className="flex flex-col items-center text-center pb-2 relative bg-transparent">
                        <div className="mb-2">
                          <img
                            src={option.icon}
                            alt={option.title}
                            className="w-20 h-20 rounded-full shadow-md border-4 border-white object-cover drop-shadow-xl bg-white"
                            draggable="false"
                          />
                        </div>
                        <CardTitle
                          className="text-xl md:text-2xl font-bold flex items-center group-hover:tracking-wide"
                          style={{ color: COLOR_PRIMARY }}
                        >
                          {option.title}
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce-slow">
                            {option.emoji}
                          </span>
                        </CardTitle>
                        <div
                          className="text-xs font-medium tracking-widest mt-1 mb-0.5"
                          style={{ color: "#8D6663" }}
                        >
                          {option.subtitle}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription
                          className="text-center text-base font-medium min-h-[62px]"
                          style={{
                            color: "#4E342E",
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 16,
                            lineHeight: 1.5
                          }}
                        >
                          {option.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-center mt-2">
                        <Button
                          variant="ghost"
                          className="rounded-lg shadow px-6 py-2 font-semibold"
                          style={{
                            background: COLOR_PRIMARY,
                            color: "#fff",
                            fontWeight: 700
                          }}
                        >
                          {t.AI_TUTOR.GO} {option.title}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
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
                    <Card
                      className="rounded-3xl shadow-xl h-full overflow-hidden border-0 card-hover transition-transform"
                      style={{
                        background: option.color,
                        boxShadow: COLOR_CARD_BOXSHADOW,
                        border: `2px solid ${COLOR_CARD_BORDER}`,
                      }}
                    >
                      <CardHeader className="flex flex-col items-center text-center pb-2 relative bg-transparent">
                        <div className="mb-2">
                          <img
                            src={option.icon}
                            alt={option.title}
                            className="w-20 h-20 rounded-full shadow-md border-4 border-white object-cover drop-shadow-xl bg-white"
                            draggable="false"
                          />
                        </div>
                        <CardTitle
                          className="text-xl md:text-2xl font-bold flex items-center group-hover:tracking-wide"
                          style={{ color: COLOR_PRIMARY }}
                        >
                          {option.title}
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce-slow">
                            {option.emoji}
                          </span>
                        </CardTitle>
                        <div
                          className="text-xs font-medium tracking-widest mt-1 mb-0.5"
                          style={{ color: "#8D6663" }}
                        >
                          {option.subtitle}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription
                          className="text-center text-base font-medium min-h-[62px]"
                          style={{
                            color: "#4E342E",
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 16,
                            lineHeight: 1.5
                          }}
                        >
                          {option.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-center mt-2">
                        <Button
                          variant="ghost"
                          className="rounded-lg shadow px-6 py-2 font-semibold"
                          style={{
                            background: COLOR_PRIMARY,
                            color: "#fff",
                            fontWeight: 700
                          }}
                        >
                          {t.AI_TUTOR.GO} {option.title}
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                )}
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
