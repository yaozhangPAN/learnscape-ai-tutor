
import React from "react";
import VideoSection from "./VideoSection";
import AITutorSection from "./AITutorSection";

interface SectionItem {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

interface Props {
  video: SectionItem;
  aiTutor: SectionItem;
}

const LearningSectionsGrid: React.FC<Props> = ({ video, aiTutor }) => (
  <div className="grid grid-cols-2 grid-rows-1 gap-4 max-w-2xl w-full mb-4 transition-all">
    <VideoSection {...video} />
    <AITutorSection {...aiTutor} />
  </div>
);

export default LearningSectionsGrid;
