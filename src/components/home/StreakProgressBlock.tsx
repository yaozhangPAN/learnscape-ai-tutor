
import React from "react";

const StreakProgressBlock: React.FC = () => (
  <div className="flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative bg-white text-[#6D5A21] min-h-[164px] overflow-hidden">
    <div className="absolute top-3 left-3 z-10 bg-white/80 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow">Streak and Progress</div>
    <img
      src="/lovable-uploads/db9f7a45-8c5c-4cea-a1cc-534fd2cf61f5.png"
      alt="Streak and Progress Block"
      className="object-cover w-full h-full opacity-100 rounded-2xl"
      style={{ position: "absolute", inset: 0, zIndex: 0, userSelect: "none" }}
      draggable={false}
    />
    <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 hover:opacity-20 transition-opacity z-10"></div>
    <div className="flex-1 z-20"></div>
  </div>
);

export default StreakProgressBlock;
