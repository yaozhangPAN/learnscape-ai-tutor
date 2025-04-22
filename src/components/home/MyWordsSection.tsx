
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface MyWordsSectionProps {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const MyWordsSection: React.FC<MyWordsSectionProps> = ({ to, className, icon, title, desc }) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className} min-h-[144px]`}
  >
    <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
    <div className="text-sm font-medium">{desc}</div>
    <div className="flex-1 flex items-end justify-end pr-2">
      <img
        src="/lovable-uploads/673f2711-1205-4d7f-b4cd-7ac68b6ca77e.png"
        alt="My Words Custom Cartoon"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);

export default MyWordsSection;
