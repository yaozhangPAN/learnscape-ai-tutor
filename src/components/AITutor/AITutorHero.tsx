
import React from "react";

const AITutorHero = () => {
  const tutorImages = [
    "/lovable-uploads/a4ba9a86-c0e4-48b4-8154-e6d400663193.png",
    "/lovable-uploads/5f2da321-bb24-49ef-a4ed-e49a0eab42c1.png", 
    "/lovable-uploads/67cac78a-0f2f-4d46-bac8-47aa2d863a2c.png"
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#fce883] via-[#ffe29f] to-[#fbeadd] pt-14 pb-6 px-4 rounded-b-3xl shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 relative">
        <div className="flex justify-center -space-x-4 mb-6">
          {tutorImages.map((img, index) => (
            <div
              key={index}
              className={`w-24 h-24 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-200 z-${index * 10} overflow-hidden bg-white`}
            >
              <img
                src={img}
                alt={`AI Tutor ${index + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#6241a3] mb-3 tracking-tight drop-shadow-sm font-playfair relative">
          AI Tutor <span className="ml-2 animate-wiggle">✨</span>
        </h1>
        <p className="text-lg text-[#946e1a] text-center max-w-2xl mb-1 font-medium">
          你的AI学习伙伴，帮你写作、学英语、练听说，开启每天的元气新知识！
        </p>
      </div>
      <div className="absolute top-6 left-10 bg-pink-200 w-8 h-8 rounded-full opacity-60 animate-float" />
      <div className="absolute top-20 right-8 bg-blue-200 w-5 h-5 rounded-full opacity-60 animate-bounce-slow" />
      <div className="absolute bottom-4 right-6 bg-yellow-200 w-16 h-16 rounded-full opacity-40 blur-sm" />
      <div className="absolute bottom-12 left-4 bg-green-100 w-6 h-6 rounded-full opacity-60 animate-float" />
      <div className="absolute bottom-8 left-1/2 bg-purple-200 w-10 h-10 rounded-full opacity-70 blur-[1.5px] animate-pulse" />
    </div>
  );
};

export default AITutorHero;

