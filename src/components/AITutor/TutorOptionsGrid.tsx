import React from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import TutorOptionCard from "./TutorOptionCard";
import { COLORS } from "./constants";
import MaskOverlay from "@/components/MaskOverlay";

const TutorOptionsGrid = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleLanguageArtsClick = () => {
    navigate("/ai-tutor/language-arts");
  };

  const tutorOptions = [
    {
      id: "writing-coach",
      title: t.AI_TUTOR.WRITING_COACH,
      subtitle: t.AI_TUTOR.SUBTITLE_WRITING,
      icon: "/lovable-uploads/1bd5d4e2-d0e7-4caf-a458-e87bbd5e7418.png",
      color: COLORS.PURPLE,
      description: t.AI_TUTOR.WRITING_COACH_DESC,
      path: "/ai-tutor/writing-coach",
      emoji: "✏️",
      disabled: false // Changed from true to false to enable Writing Coach
    },
    {
      id: "oral-exam",
      title: t.AI_TUTOR.ORAL_EXAM,
      subtitle: t.AI_TUTOR.SUBTITLE_ORAL,
      icon: "/lovable-uploads/eb69da2f-b824-461b-bcd4-3c65112631ff.png",
      color: COLORS.BLUE,
      description: t.AI_TUTOR.ORAL_EXAM_DESC,
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: t.AI_TUTOR.DICTATION,
      subtitle: t.AI_TUTOR.SUBTITLE_DICTATION,
      icon: "/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png",
      color: COLORS.MINT,
      description: t.AI_TUTOR.DICTATION_DESC,
      path: "/ai-tutor/dictation-practice",
      emoji: "🎧",
      disabled: true
    },
    {
      id: "tutor-me",
      title: t.AI_TUTOR.TUTOR_ME,
      subtitle: t.AI_TUTOR.SUBTITLE_TUTOR,
      icon: "/lovable-uploads/134d4088-5005-41d9-9487-719568001089.png",
      color: COLORS.GREEN,
      description: t.AI_TUTOR.TUTOR_ME_DESC,
      path: "/ai-tutor/tutor-me",
      emoji: "🧠"
    },
    {
      id: "vocabulary",
      title: t.AI_TUTOR.VOCABULARY,
      subtitle: t.AI_TUTOR.SUBTITLE_VOCAB,
      icon: "/lovable-uploads/3a8a17fe-664a-4c72-990a-dee148e1f5bb.png",
      color: COLORS.ORANGE,
      description: t.AI_TUTOR.VOCABULARY_DESC,
      path: "/ai-tutor/vocabulary",
      emoji: "📚",
      disabled: true
    },
    {
      id: "language-arts",
      title: t.AI_TUTOR.LANGUAGE_ARTS,
      subtitle: t.AI_TUTOR.SUBTITLE_LANGUAGE_ARTS,
      icon: "/lovable-uploads/35e5ebeb-cc32-46fc-961d-fb6241e51756.png",
      color: COLORS.YELLOW,
      description: t.AI_TUTOR.LANGUAGE_ARTS_DESC,
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {tutorOptions.map((option) => (
        <div key={option.id} className="relative group">
          <TutorOptionCard {...option} />
          
          {/* Add mask overlay for disabled options */}
          {option.disabled && <MaskOverlay />}
        </div>
      ))}
    </div>
  );
};

export default TutorOptionsGrid;
