
const TutorCharacter = () => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-32 h-32 relative">
        <img 
          src="/lovable-uploads/fe7bb8c2-9f9a-479a-8a8b-f13d3edfac07.png" 
          alt="AI Tutor Character" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border">
        <p className="text-xl text-gray-800">欢迎！我能为您提供什么帮助？</p>
      </div>
    </div>
  );
};

export default TutorCharacter;
