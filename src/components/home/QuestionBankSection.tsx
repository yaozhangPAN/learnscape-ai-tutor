
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

interface QuestionBankSectionProps {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const QuestionBankSection: React.FC<QuestionBankSectionProps> = ({ to, className, icon, title, desc }) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className} min-h-[144px]`}
  >
    <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
    <div className="text-sm font-semibold">{desc}</div>
    <div className="flex-1 flex items-end justify-end pr-2">
      <img
        src="/lovable-uploads/f0df06aa-0094-4ce2-9d9a-d7d749143aed.png"
        alt="Question Bank Cartoon Character"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);

export default QuestionBankSection;
