
import React from "react";
import { Link } from "react-router-dom";

interface OnlineClassroomSectionProps {
  to: string;
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const OnlineClassroomSection: React.FC<OnlineClassroomSectionProps> = ({ to, className = "", icon, title, desc }) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className}`}
    style={{ minHeight: 164 }}
  >
    <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold ml-2">{title}</span></div>
    <div className="text-base font-medium">{desc}</div>
    <div className="flex-1 flex items-end justify-end">
      <img
        src="/lovable-uploads/7a7e4714-d8d9-4f9c-acdc-a5e2aaae7344.png"
        alt="Online Classroom Cartoon"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);

export default OnlineClassroomSection;
