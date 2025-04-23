import React from "react";
import DailyAdventure from "./DailyAdventure";

interface Props {
  to: string;
  className: string;
  style: string;
  desc: React.ReactNode;
}

const DailyAdventureGrid: React.FC<Props> = ({ to, className, style, desc }) => (
  <div className="max-w-7xl w-full mx-auto mb-4">
    <DailyAdventure
      to={to}
      className={className}
      style="bg-[#F7941D]"
      desc={desc}
    />
  </div>
);

export default DailyAdventureGrid;
