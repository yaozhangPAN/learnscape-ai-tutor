
import React from "react";
import QuestionBankSection from "./QuestionBankSection";
import MyWordsSection from "./MyWordsSection";

interface SectionItem {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

interface Props {
  questionBank: SectionItem;
  myWords: SectionItem;
}

const FeaturesGrid: React.FC<Props> = ({ questionBank, myWords }) => (
  <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4 transition-all">
    <QuestionBankSection {...questionBank} />
    <MyWordsSection {...myWords} />
  </div>
);

export default FeaturesGrid;
