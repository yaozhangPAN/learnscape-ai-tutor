
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
      className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg ${className} ${style} relative`}
      style={{
        background: `url('/lovable-uploads/a6490d24-162c-4faf-af6e-426d16fe09ff.png') no-repeat center center`,
        backgroundSize: 'cover',
      }}>
      <span className="text-lg font-bold mb-1 text-white drop-shadow">Daily Adventure</span>
      <div className="text-white drop-shadow">{desc}</div>
      <div className="flex-1 flex items-end justify-end pr-2">
        <img
          src="/lovable-uploads/82136408-7a17-4f22-a7fb-c770e52e2c20.png"
          alt="Daily Adventure Cartoon Character"
          className="w-20 h-20 object-contain select-none drop-shadow-lg"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>
    </Link>
  );
};
export default DailyAdventure;
