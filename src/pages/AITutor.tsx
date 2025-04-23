
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import AITutorHero from "@/components/AITutor/AITutorHero";
import AITutorBubbleDecor from "@/components/AITutor/AITutorBubbleDecor";
import { useI18n } from "@/contexts/I18nContext";
import TutorOptionsGrid from "@/components/AITutor/TutorOptionsGrid";
import { COLORS } from "@/components/AITutor/constants";

const AITutor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isPremium } = useSubscription();
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ background: COLORS.BG }}
    >
      <Navbar />
      <div className="relative z-10">
        <AITutorHero />
        <AITutorBubbleDecor />
      </div>
      <main className="flex-1 relative z-10">
        <div
          className={`max-w-7xl mx-auto px-4 pt-12 pb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {!isPremium && <SubscriptionBanner type="ai-tutor" />}
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-8 flex items-center gap-2 tracking-tight"
            style={{ color: COLORS.TITLE, letterSpacing: 0.5 }}
          >
            <Sparkles className="h-7 w-7" style={{ color: "#FFD700", marginRight: 8 }} />
            {t.AI_TUTOR.TITLE}
          </h2>
          <TutorOptionsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
