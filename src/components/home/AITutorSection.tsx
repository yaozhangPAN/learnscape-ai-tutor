
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface AITutorSectionProps {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const AITutorSection: React.FC<AITutorSectionProps> = ({ to, className, icon, title, desc }) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className}`}
    style={{ minHeight: 180 }}>
    <div>
      <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
      <div className="text-sm font-medium">{desc}</div>
    </div>
    <div className="flex-1 flex items-end justify-end">
      <img
        src="/lovable-uploads/3d8abec2-bc96-4d7b-80c1-4ee8efef5c9c.png"
        alt="Cartoon Character"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);
export default AITutorSection;
