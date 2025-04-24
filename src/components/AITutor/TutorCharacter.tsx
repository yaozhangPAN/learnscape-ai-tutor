
import React from 'react';

const TutorCharacter = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 relative">
        <img 
          src="/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png" 
          alt="Panda AI Tutor" 
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <p className="font-medium text-gray-800">小火球 / Fireball</p>
        <p className="text-gray-600 text-sm">你好！我是你的小熊猫老师，今天想练习科学问答题吗？</p>
      </div>
    </div>
  );
};

export default TutorCharacter;
