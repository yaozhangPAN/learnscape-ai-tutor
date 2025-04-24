
import React from 'react';
import TutorOptionCard from './TutorOptionCard';
import { MessageSquare, PenLine, Mic, Book, LineChart, Camera, Brain, BookOpen } from 'lucide-react';
import MaskOverlay from '@/components/MaskOverlay';
import { useI18n } from '@/contexts/I18nContext';

const TutorOptionsGrid = () => {
  const { t } = useI18n();

  const options = [
    {
      title: t.AI_TUTOR.TUTOR_ME || "Tutor Me",
      description: t.AI_TUTOR.TUTOR_ME_DESC || "Ask AI any academic question anytime.",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/ai-tutor/tutor-me",
      color: "bg-gradient-to-br from-blue-400 to-indigo-500",
      showMask: false, // Disabled mask for TutorMe
      emoji: "✨",
      subtitle: t.AI_TUTOR.SUBTITLE_TUTOR || "One-on-one Q&A"
    },
    {
      title: t.AI_TUTOR.WRITING_COACH || "Writing Coach",
      description: t.AI_TUTOR.WRITING_COACH_DESC || "Improve writing skills with AI feedback and suggestions.",
      icon: <PenLine className="h-5 w-5" />,
      path: "/ai-tutor/writing-coach",
      color: "bg-gradient-to-br from-pink-500 to-red-500",
      showMask: true,
      emoji: "📝",
      subtitle: t.AI_TUTOR.SUBTITLE_WRITING || "Writing Coach"
    },
    {
      title: t.AI_TUTOR.ORAL_EXAM || "Oral Exam Practice",
      description: t.AI_TUTOR.ORAL_EXAM_DESC || "Fun oral practice to help you ace interviews.",
      icon: <Mic className="h-5 w-5" />,
      path: "/ai-tutor/oral-exam",
      color: "bg-gradient-to-br from-green-400 to-teal-500",
      showMask: true,
      emoji: "🎤",
      subtitle: t.AI_TUTOR.SUBTITLE_ORAL || "Oral Exam"
    },
    {
      title: t.AI_TUTOR.DICTATION || "Dictation Practice",
      description: t.AI_TUTOR.DICTATION_DESC || "Chinese & English dictation training, easier with voice input!",
      icon: <Book className="h-5 w-5" />,
      path: "/ai-tutor/dictation-practice",
      color: "bg-gradient-to-br from-orange-400 to-yellow-500",
      showMask: true,
      emoji: "🔊",
      subtitle: t.AI_TUTOR.SUBTITLE_DICTATION || "Dictation"
    },
    {
      title: t.AI_TUTOR.ERROR_ANALYSIS || "Error Analysis",
      description: t.AI_TUTOR.ERROR_ANALYSIS_DESC || "Analyze and learn from your mistakes.",
      icon: <LineChart className="h-5 w-5" />,
      path: "/ai-tutor/error-analysis",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      showMask: true,
      emoji: "📊",
      subtitle: "Error Analysis"
    },
    {
      title: t.AI_TUTOR.SNAP_AND_SOLVE || "Snap and Solve",
      description: t.AI_TUTOR.SNAP_AND_SOLVE_DESC || "Take a photo of your problem and get an instant solution.",
      icon: <Camera className="h-5 w-5" />,
      path: "/ai-tutor/snap-and-solve",
      color: "bg-gradient-to-br from-lime-500 to-green-500",
      showMask: true,
      emoji: "📸",
      subtitle: "Snap and Solve"
    },
    {
      title: t.AI_TUTOR.VOCABULARY || "Vocabulary Builder",
      description: t.AI_TUTOR.VOCABULARY_DESC || "Level-up and remember words by answering word quizzes!",
      icon: <Brain className="h-5 w-5" />,
      path: "/ai-tutor/vocabulary",
      color: "bg-gradient-to-br from-teal-500 to-blue-500",
      showMask: true,
      emoji: "🔤",
      subtitle: t.AI_TUTOR.SUBTITLE_VOCAB || "Vocabulary Builder"
    },
    {
      title: t.AI_TUTOR.LANGUAGE_ARTS || "Language Arts Workshop",
      description: t.AI_TUTOR.LANGUAGE_ARTS_DESC || "Creative writing & reading comprehension to improve language.",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/ai-tutor/language-arts",
      color: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
      showMask: true,
      emoji: "📚",
      subtitle: t.AI_TUTOR.SUBTITLE_LANGUAGE_ARTS || "Language Arts Workshop"
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {options.map((option, index) => (
        <div key={index}>
          <TutorOptionCard
            id={`tutor-option-${index}`}
            title={option.title}
            subtitle={option.subtitle}
            icon={option.icon.type.render().props.name}
            description={option.description}
            color={option.color}
            path={option.path}
            emoji={option.emoji}
          >
            {option.showMask && <MaskOverlay />}
          </TutorOptionCard>
        </div>
      ))}
    </div>
  );
};

export default TutorOptionsGrid;
