
import React from "react";
import { Link } from "react-router-dom";

interface DailyAdventureProps {
  to: string;
  className: string;
  style: string;
  title: string;
  desc: React.ReactNode;
  xpText?: string;
  xpBg?: string;
  iconImg?: string;
}

const DailyAdventure: React.FC<DailyAdventureProps> = ({
  to,
  className,
  style,
  title,
  desc,
  xpText,
  xpBg,
  iconImg
}) => {
  return (
    <Link
      to={to}
      className={`flex flex-col rounded-2xl p-6 sm:p-10 shadow-lg ${className} ${style} relative transition-all`}
      style={{
        background: "#F7941D",
        minHeight: "200px",
      }}>
      <div className="flex items-center mb-1">
        {iconImg && (
          <img
            src={iconImg}
            alt="Daily Adventure Small Icon"
            className="w-8 h-8 mr-2"
            style={{ userSelect: "none" }}
            draggable={false}
          />
        )}
        <span className="text-xl font-bold text-white drop-shadow" style={{ letterSpacing: 1 }}>
          {title}
        </span>
      </div>
      {xpText && (
        <div className="flex items-center mt-1">
          <span className={`${xpBg} text-xs rounded-full px-2 py-0.5 mr-2 font-bold`}>{xpText}</span>
          <span className="text-white drop-shadow">{desc}</span>
        </div>
      )}
      {!xpText && (
        <div className="text-white drop-shadow text-base font-medium">{desc}</div>
      )}
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

