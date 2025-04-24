
const TutorCharacter = () => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-32 h-32 relative">
        <img 
          src="/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png" 
          alt="Panda AI Tutor" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border">
        <p className="text-xl text-gray-800">你好！我是你的小熊猫老师。有什么我可以帮你的吗？</p>
      </div>
    </div>
  );
};

export default TutorCharacter;
