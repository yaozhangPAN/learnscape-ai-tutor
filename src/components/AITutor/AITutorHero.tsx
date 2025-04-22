
import React from "react";

const AITutorHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#fce883] via-[#ffe29f] to-[#fbeadd] pt-14 pb-6 px-4 rounded-b-3xl shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#6241a3] mb-3 tracking-tight drop-shadow-sm font-playfair relative">
          AI Tutor <span className="ml-2 animate-wiggle">✨</span>
        </h1>
        <p className="text-lg text-[#946e1a] text-center max-w-2xl mb-1 font-medium">
          你的AI学习伙伴，帮你写作、学英语、练听说，开启每天的元气新知识！
        </p>
      </div>
      {/* 彩色气泡装饰 */}
      <div className="absolute top-6 left-10 bg-pink-200 w-8 h-8 rounded-full opacity-60 animate-float" />
      <div className="absolute top-20 right-8 bg-blue-200 w-5 h-5 rounded-full opacity-60 animate-bounce-slow" />
      <div className="absolute bottom-4 right-6 bg-yellow-200 w-16 h-16 rounded-full opacity-40 blur-sm" />
      <div className="absolute bottom-12 left-4 bg-green-100 w-6 h-6 rounded-full opacity-60 animate-float" />
      <div className="absolute bottom-8 left-1/2 bg-purple-200 w-10 h-10 rounded-full opacity-70 blur-[1.5px] animate-pulse" />
    </div>
  );
};

export default AITutorHero;

