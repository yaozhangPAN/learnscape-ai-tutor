
import React from "react";

interface HomeNoteProps {
  className?: string;
}

const HomeNote: React.FC<HomeNoteProps> = ({ className = "" }) => (
  <div className={`bg-white/80 rounded-xl px-6 py-3 text-center text-[#955F1D] text-base shadow-sm font-semibold ${className}`}>
    点击各板块可进入对应功能。更多功能将在这里出现，敬请期待！
  </div>
);

export default HomeNote;

