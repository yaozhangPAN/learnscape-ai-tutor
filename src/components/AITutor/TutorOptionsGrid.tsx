import React from 'react';
import TutorOptionCard from './TutorOptionCard';
import { MessageSquare, PenLine, Mic, Book, LineChart, Camera, Brain, BookOpen } from 'lucide-react';
import MaskOverlay from '@/components/MaskOverlay';
import { useI18n } from '@/contexts/I18nContext';

const TutorOptionsGrid = () => {
  const { t } = useI18n();

  const options = [
    {
      title: t.AI_TUTOR.OPTIONS.TUTOR_ME.TITLE,
      desc: t.AI_TUTOR.OPTIONS.TUTOR_ME.DESC,
      icon: <MessageSquare className="h-5 w-5" />,
      to: "/ai-tutor/tutor-me",
      bg: "bg-gradient-to-br from-blue-400 to-indigo-500",
      showMask: false // Disabled mask for TutorMe
    },
    {
      title: t.AI_TUTOR.OPTIONS.WRITING_COACH.TITLE,
      desc: t.AI_TUTOR.OPTIONS.WRITING_COACH.DESC,
      icon: <PenLine className="h-5 w-5" />,
      to: "/ai-tutor/writing-coach",
      bg: "bg-gradient-to-br from-pink-500 to-red-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.ORAL_EXAM.TITLE,
      desc: t.AI_TUTOR.OPTIONS.ORAL_EXAM.DESC,
      icon: <Mic className="h-5 w-5" />,
      to: "/ai-tutor/oral-exam",
      bg: "bg-gradient-to-br from-green-400 to-teal-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.DICTATION_PRACTICE.TITLE,
      desc: t.AI_TUTOR.OPTIONS.DICTATION_PRACTICE.DESC,
      icon: <Book className="h-5 w-5" />,
      to: "/ai-tutor/dictation-practice",
      bg: "bg-gradient-to-br from-orange-400 to-yellow-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.ERROR_ANALYSIS.TITLE,
      desc: t.AI_TUTOR.OPTIONS.ERROR_ANALYSIS.DESC,
      icon: <LineChart className="h-5 w-5" />,
      to: "/ai-tutor/error-analysis",
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.SNAP_AND_SOLVE.TITLE,
      desc: t.AI_TUTOR.OPTIONS.SNAP_AND_SOLVE.DESC,
      icon: <Camera className="h-5 w-5" />,
      to: "/ai-tutor/snap-and-solve",
      bg: "bg-gradient-to-br from-lime-500 to-green-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.VOCABULARY_BUILDER.TITLE,
      desc: t.AI_TUTOR.OPTIONS.VOCABULARY_BUILDER.DESC,
      icon: <Brain className="h-5 w-5" />,
      to: "/ai-tutor/vocabulary",
      bg: "bg-gradient-to-br from-teal-500 to-blue-500",
      showMask: true
    },
    {
      title: t.AI_TUTOR.OPTIONS.LANGUAGE_ARTS.TITLE,
      desc: t.AI_TUTOR.OPTIONS.LANGUAGE_ARTS.DESC,
      icon: <BookOpen className="h-5 w-5" />,
      to: "/ai-tutor/language-arts",
      bg: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
      showMask: true
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {options.map((option, index) => (
        <TutorOptionCard key={index} {...option}>
          {option.showMask && <MaskOverlay />}
        </TutorOptionCard>
      ))}
    </div>
  );
};

export default TutorOptionsGrid;
