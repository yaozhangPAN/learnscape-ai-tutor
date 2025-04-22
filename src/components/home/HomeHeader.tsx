
import React from "react";

const HomeHeader: React.FC = () => (
  <div className="flex flex-col items-center">
    <h1
      className="text-4xl sm:text-5xl font-extrabold text-[#915723] mb-2 tracking-tight"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      My Learning
    </h1>
    <div className="mb-6 flex space-x-2">
      <span className="w-4 h-4 bg-white/70 rounded-full"></span>
      <span className="w-3 h-3 bg-yellow-200 rounded-full"></span>
      <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
    </div>
  </div>
);

export default HomeHeader;
