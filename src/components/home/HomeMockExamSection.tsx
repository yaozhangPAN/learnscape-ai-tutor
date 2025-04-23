
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  desc: React.ReactNode;
  bg: string;
  textColor: string;
  icon: React.ReactNode;
  img: string;
}

const HomeMockExamSection: React.FC<Props> = ({
  to, title, desc, bg, textColor, icon, img
}) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${bg} ${textColor}`}
    style={{ minHeight: 180 }}
  >
    <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
    <div className="text-base font-medium">{desc}</div>
    <div className="flex-1 flex items-end justify-end">
      <img
        src={img}
        alt="Mock Exam Cartoon"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);
export default HomeMockExamSection;
