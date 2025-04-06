
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Star, Trophy, Music, Flame, Gem, Book, Coffee, Heart } from "lucide-react";
import StreakComponent from "@/components/StreakComponent";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Button } from "@/components/ui/button";

// Game-style lesson icons
const LessonIcons = {
  Completed: ({ className = "" }) => (
    <div className={`rounded-full bg-lime-500 w-16 h-16 flex items-center justify-center shadow-md ${className}`}>
      <Star className="text-white w-8 h-8" fill="white" />
    </div>
  ),
  Current: ({ className = "" }) => (
    <div className={`rounded-full bg-lime-500 w-20 h-20 flex items-center justify-center shadow-md border-4 border-lime-300 ${className}`}>
      <Star className="text-white w-10 h-10" fill="white" />
    </div>
  ),
  Locked: ({ className = "" }) => (
    <div className={`rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center shadow-md ${className}`}>
      <Star className="text-gray-400 w-8 h-8" />
    </div>
  ),
  ChestReward: () => (
    <div className="w-16 h-16 bg-yellow-400 rounded-md flex items-center justify-center shadow-md border-2 border-yellow-600">
      <div className="w-10 h-8 bg-amber-800 rounded-md flex items-center justify-center border-t-2 border-yellow-300">
        <div className="w-3 h-3 bg-yellow-300 rounded-full" />
      </div>
    </div>
  ),
  Character: () => (
    <div className="relative">
      <div className="w-24 h-24 bg-white rounded-md p-2">
        <div className="w-full h-full bg-lime-500 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-lime-500 rounded-full" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shadow-md">
          <Coffee className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  ),
  Practice: () => (
    <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-md">
      <div className="w-12 h-12 bg-lime-500 rounded-md flex items-center justify-center">
        <Music className="w-6 h-6 text-white" />
      </div>
    </div>
  )
};

const DailyPlan = () => {
  const { isPremium } = useSubscription();
  const [currentLesson, setCurrentLesson] = useState(2);
  
  // Sample lessons data
  const lessons = [
    { id: 1, title: "Number Recognition", type: "completed", unit: "Mathematics", section: "Section 1, Unit 1" },
    { id: 2, title: "Addition Basics", type: "current", unit: "Mathematics", section: "Section 1, Unit 2" },
    { id: 3, title: "Skip Counting", type: "locked", unit: "Mathematics", section: "Section 1, Unit 3" },
    { id: 4, title: "Reward", type: "chest", unit: "", section: "" },
    { id: 5, title: "Number Patterns", type: "locked", unit: "Mathematics", section: "Section 2, Unit 1" },
    { id: 6, title: "Subtraction Basics", type: "locked", unit: "Mathematics", section: "Section 2, Unit 2" },
    { id: 7, title: "Character", type: "character", unit: "", section: "" },
    { id: 8, title: "Multiplication Intro", type: "locked", unit: "Mathematics", section: "Section 3, Unit 1" },
  ];

  const handleLessonClick = (lessonId) => {
    if (lessons.find(l => l.id === lessonId)?.type === "locked") {
      alert("This lesson is locked! Complete previous lessons first.");
    } else if (lessons.find(l => l.id === lessonId)?.type === "chest") {
      alert("You've earned a reward! 🎁");
    } else if (lessons.find(l => l.id === lessonId)?.type !== "character") {
      setCurrentLesson(lessonId);
    }
  };

  // Navigation icons
  const navIcons = [
    { icon: <Heart className="h-6 w-6" fill="#ff9999" stroke="#ff5555" />, text: "Lives", active: true },
    { icon: <Trophy className="h-6 w-6" fill="#ffd700" stroke="#cc9900" />, text: "Achievements" },
    { icon: <Flame className="h-6 w-6" fill="#ff5500" stroke="#cc4400" />, text: "Streak" },
    { icon: <Gem className="h-6 w-6" fill="#55aaff" stroke="#0055aa" />, text: "Shop" },
    { icon: <Book className="h-6 w-6" fill="#66cc66" stroke="#339933" />, text: "Practice" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />
      
      {/* Top stats bar */}
      <div className="bg-gray-100 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Music className="h-6 w-6 text-purple-500" />
          <span className="ml-2 text-gray-600">159</span>
        </div>
        <div className="flex items-center">
          <Gem className="h-6 w-6 text-cyan-500" />
          <span className="ml-2 text-gray-600">1004</span>
        </div>
        <div className="flex items-center">
          <Star className="h-6 w-6 text-purple-500" />
        </div>
      </div>
      
      {/* Current Lesson Header */}
      {currentLesson && (
        <div className="bg-lime-500 text-white p-6 rounded-lg mx-4 my-4 shadow-md">
          <div className="text-sm font-medium opacity-90">
            {lessons.find(l => l.id === currentLesson)?.section || "SECTION 1, UNIT 1"}
          </div>
          <h1 className="text-2xl font-bold mt-1">
            {lessons.find(l => l.id === currentLesson)?.title || "Addition Basics"}
          </h1>
        </div>
      )}
      
      {/* Learning Path */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>
          
          {/* Lessons positioned along the line */}
          <div className="relative z-10 space-y-16">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex justify-center">
                <div 
                  onClick={() => handleLessonClick(lesson.id)}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  {lesson.type === "completed" && <LessonIcons.Completed />}
                  {lesson.type === "current" && <LessonIcons.Current />}
                  {lesson.type === "locked" && <LessonIcons.Locked />}
                  {lesson.type === "chest" && <LessonIcons.ChestReward />}
                  {lesson.type === "character" && <LessonIcons.Character />}
                  {lesson.type === "practice" && <LessonIcons.Practice />}
                </div>
              </div>
            ))}
            
            {/* Bottom achievements */}
            <div className="flex justify-center pt-4">
              <div className="flex space-x-1">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="h-6 w-6 text-yellow-400" fill="#FFC107" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex justify-between items-center">
          {navIcons.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${item.active ? 'text-cyan-500' : 'text-gray-500'}`}
            >
              <div className={`p-2 rounded-md ${item.active ? 'bg-cyan-100' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      {!isPremium && (
        <div className="fixed bottom-16 left-0 right-0">
          <SubscriptionBanner type="daily-recommendation" />
        </div>
      )}
    </div>
  );
};

export default DailyPlan;
