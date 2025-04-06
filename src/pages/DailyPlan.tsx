
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Star, Trophy, Music, Flame, Gem, Book, Coffee, Heart } from "lucide-react";
import StreakComponent from "@/components/StreakComponent";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Button } from "@/components/ui/button";
import GameIcons from "@/components/GameIcons";
import { Progress } from "@/components/ui/progress";

// Sample lessons data with more detailed exercise information
const lessons = [
  { 
    id: 1, 
    title: "Number Recognition", 
    type: "completed", 
    unit: "Mathematics", 
    section: "Section 1, Unit 1",
    details: "Number Basics (Math, Easy, 10 mins)"
  },
  { 
    id: 2, 
    title: "Addition Basics", 
    type: "current", 
    unit: "Mathematics", 
    section: "Section 1, Unit 2",
    details: "Fractions Practice (Math, Medium, 15 mins)"
  },
  { 
    id: 3, 
    title: "Skip Counting", 
    type: "locked", 
    unit: "Mathematics", 
    section: "Section 1, Unit 3",
    details: "Skip Counting (Math, Easy, 12 mins)"
  },
  { 
    id: 4, 
    title: "Reward", 
    type: "chest", 
    unit: "", 
    section: "",
    details: "Bonus Chest"
  },
  { 
    id: 5, 
    title: "Number Patterns", 
    type: "locked", 
    unit: "Mathematics", 
    section: "Section 2, Unit 1",
    details: "Plant Life Cycle (Science, Easy, 8 mins)"
  },
  { 
    id: 6, 
    title: "Subtraction Basics", 
    type: "locked", 
    unit: "Mathematics", 
    section: "Section 2, Unit 2",
    details: "Vocabulary Builder (Chinese, Easy, 10 mins)"
  },
  { 
    id: 7, 
    title: "Character", 
    type: "character", 
    unit: "", 
    section: "",
    details: "Avatar Upgrade"
  },
  { 
    id: 8, 
    title: "Multiplication Intro", 
    type: "locked", 
    unit: "Mathematics", 
    section: "Section 3, Unit 1",
    details: "Comprehension Skills (English, Medium, 20 mins)"
  },
];

const DailyPlan = () => {
  const { isPremium } = useSubscription();
  const [currentLesson, setCurrentLesson] = useState(2);
  
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

  const currentLessonObj = lessons.find(l => l.id === currentLesson);
  const lessonProgress = 38; // Example progress percentage

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
      {currentLessonObj && (
        <div className="bg-lime-500 text-white p-6 rounded-lg mx-4 my-4 shadow-md">
          <div className="text-sm font-medium opacity-90">
            {currentLessonObj?.section || "SECTION 1, UNIT 1"}
          </div>
          <h1 className="text-2xl font-bold mt-1">
            {currentLessonObj?.title || "Addition Basics"}
          </h1>
          
          {/* Add progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{lessonProgress}%</span>
            </div>
            <Progress value={lessonProgress} className="h-2" />
          </div>
        </div>
      )}
      
      {/* Learning Path - Curved */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="relative">
          {/* Custom curved path using SVG */}
          <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full" 
               style={{ zIndex: 0 }} 
               viewBox="0 0 100 800" 
               preserveAspectRatio="none">
            <path 
              d="M50,0 C70,100 30,200 50,300 C70,400 30,500 50,600 C70,700 50,800 50,800" 
              stroke="#D1D5DB" 
              strokeWidth="4" 
              fill="none"
            />
          </svg>
          
          {/* Lessons positioned along the curve */}
          <div className="relative z-10 flex flex-col items-center">
            {lessons.map((lesson, index) => {
              // Calculate position for curved path effect
              const isEven = index % 2 === 0;
              const offset = isEven ? 'translate-x-12' : '-translate-x-12';
              const waveHeight = index * 100; // Approximation for the curved path
              
              return (
                <div
                  key={lesson.id}
                  className={`relative mb-24 ${offset} flex flex-col items-center`}
                  style={{ marginTop: index === 0 ? '0' : '' }}
                >
                  <div
                    onClick={() => handleLessonClick(lesson.id)}
                    className="cursor-pointer transform hover:scale-105 transition-transform"
                  >
                    {lesson.type === "completed" && <GameIcons.Completed />}
                    {lesson.type === "current" && <GameIcons.Current />}
                    {lesson.type === "locked" && <GameIcons.Locked />}
                    {lesson.type === "chest" && <GameIcons.ChestReward />}
                    {lesson.type === "character" && <GameIcons.Character />}
                    {lesson.type === "practice" && <GameIcons.Practice />}
                  </div>
                  
                  {/* Exercise details */}
                  <div className={`mt-2 text-center max-w-[150px] ${lesson.type === "locked" ? "text-gray-400" : "text-gray-700"}`}>
                    <p className="font-semibold text-sm">{lesson.title}</p>
                    <p className="text-xs mt-1">{lesson.details}</p>
                  </div>
                </div>
              );
            })}
            
            {/* Bottom achievements */}
            <div className="flex justify-center pt-4 mt-4">
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
