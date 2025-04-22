
import React from "react";
import DailyAdventure from "./DailyAdventure";

interface Props {
  to: string;
  className: string;
  style: string;
  desc: React.ReactNode;
}

const DailyAdventureGrid: React.FC<Props> = ({ to, className, style, desc }) => (
  <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4 transition-all">
    <DailyAdventure to={to} className={className} style={style} desc={desc} />
  </div>
);

export default DailyAdventureGrid;
