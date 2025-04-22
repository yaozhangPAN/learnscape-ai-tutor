
import React from "react";
import { Link } from "react-router-dom";

const PlaceholderImageBlock: React.FC = () => (
  <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-8 transition-all">
    <Link
      to="/dashboard"
      className="flex items-center justify-center rounded-2xl bg-white/50 border-2 border-white shadow-lg min-h-[144px] w-full overflow-hidden relative group focus:outline-none focus:ring-2 focus:ring-[#fbc02d] transition-all"
      style={{ textDecoration: 'none' }}
      draggable={false}
    >
      {/* 标题 */}
      <div className="absolute top-3 left-3 z-10 bg-white/70 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow group-hover:bg-yellow-100 transition-colors">
        Streak and Progress
      </div>
      {/* 新图片作为背景 */}
      <img
        src="/lovable-uploads/810634f8-55f5-400e-b770-6eed83a82bec.png"
        alt="Streak and Progress"
        className="object-cover w-full h-full opacity-100 transition-all duration-200"
        draggable={false}
        style={{ userSelect: "none" }}
      />
      {/* 点击区域做 hover 动效，可选加亮 */}
      <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 group-hover:opacity-20 transition-opacity"></div>
    </Link>
  </div>
);

export default PlaceholderImageBlock;
