
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  desc: React.ReactNode;
  bg: string;
  textColor: string;
  xpText: string;
  xpBg: string;
  img?: string;
  bgImg?: string;
  isCustomBg?: boolean;
  debugColor?: string;
  iconImg?: string;
}

const HomeDailyAdventureSection: React.FC<Props> = ({
  to, title, desc, bg, textColor, xpText, xpBg, img, bgImg, isCustomBg, debugColor, iconImg,
}) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${bg} ${textColor}`}
    style={{
      minHeight: 180,
      background: isCustomBg && bgImg
        ? `url('${bgImg}') no-repeat center center, ${debugColor || "#F7941D"}`
        : debugColor || undefined,
      backgroundSize: isCustomBg ? "cover" : undefined,
      width: "100%",
      maxWidth: "100%"
    }}
  >
    <div className="flex items-center mb-1">
      {iconImg &&
        <img
          src={iconImg}
          alt="Daily Adventure Small Icon"
          className="w-8 h-8 mr-2"
          style={{ userSelect: "none" }}
          draggable={false}
        />}
      <span className="text-xl font-bold drop-shadow">{title}</span>
    </div>
    <div className="flex items-center mt-1">
      <span className={`${xpBg} text-xs rounded-full px-2 py-0.5 mr-2 font-bold`}>{xpText}</span>
      <span className="text-base drop-shadow">{desc}</span>
    </div>
    <div className="flex-1 flex items-end justify-end pr-2">
      {img &&
        <img
          src={img}
          alt="Daily Adventure Cartoon Character"
          className="w-24 h-24 object-contain select-none drop-shadow-lg"
          draggable={false}
          style={{ userSelect: "none" }}
        />}
    </div>
  </Link>
);

export default HomeDailyAdventureSection;
