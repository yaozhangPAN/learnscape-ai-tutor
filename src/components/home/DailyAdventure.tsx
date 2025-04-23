import React from "react";
import { Link } from "react-router-dom";

interface DailyAdventureProps {
  to: string;
  className: string;
  style: string;
  desc: React.ReactNode;
}

const DailyAdventure: React.FC<DailyAdventureProps> = ({ to, className, style, desc }) => {
  return (
    <Link 
      to={to}
      className={`flex flex-col rounded-2xl p-6 sm:p-10 shadow-lg ${className} ${style} relative transition-all`}
      style={{
        background: "#F7941D",
        minHeight: "200px",
      }}>
      <span className="text-xl font-bold mb-1 text-white drop-shadow" style={{ letterSpacing: 1 }}>
        Daily Adventure
      </span>
      <div className="text-white drop-shadow text-base font-medium">{desc}</div>
      <div className="flex-1 flex items-end justify-end pr-2 pt-6">
        <img
          src="/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png"
          alt="Daily Adventure Cartoon Character"
          className="w-24 h-24 object-contain select-none drop-shadow-xl"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>
    </Link>
  );
};
export default DailyAdventure;
