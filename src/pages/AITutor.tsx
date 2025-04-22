
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pen, Mic, Brain, Sparkles, Book, BookText, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";

const AITutor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isPremium } = useSubscription();
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLanguageArtsClick = () => {
    navigate('/ai-tutor/language-arts');
  };

  // 只保留当前需要显示的卡片，暂时隐藏 error analysis, Snap & Solve, Reading Coach
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      icon: <Pen className="h-8 w-8 text-learnscape-blue" />,
      description: "Improve your writing skills with personalized feedback and guidance.",
      path: "/ai-tutor/writing-coach",
      emoji: "✏️",
      image: "/public/lovable-uploads/415ba260-aeec-4f17-ae4e-b005b78136d5.png"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      icon: <Mic className="h-8 w-8 text-learnscape-purple" />,
      description: "Practice your speaking skills and prepare for oral examinations.",
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️",
      image: "/public/lovable-uploads/2ac414cd-b34a-4efa-bf70-b16c471a377f.png"
    },
    {
      id: "dictation-practice",
      title: "Dictation Practice",
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      description: "Get ready for your school spelling test with fun Chinese and English dictation practice!",
      path: "/ai-tutor/dictation-practice",
      emoji: "🎧",
      image: "/public/lovable-uploads/72f82c67-0df8-4350-814c-79ce2d5faa3f.png"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: "Get personalized help with any subject or concept you're struggling with.",
      path: "/ai-tutor/tutor-me",
      emoji: "🧠",
      image: "/public/lovable-uploads/415ba260-aeec-4f17-ae4e-b005b78136d5.png"
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      icon: <Book className="h-8 w-8 text-emerald-500" />,
      description: "Master new words through interactive flashcards and personalized learning.",
      path: "/ai-tutor/vocabulary",
      emoji: "📚",
      image: "/public/lovable-uploads/2ac414cd-b34a-4efa-bf70-b16c471a377f.png"
    },
    {
      id: "language-arts",
      title: "Language Arts Workshop",
      icon: <BookText className="h-8 w-8 text-purple-500" />,
      description: "Develop your language skills through creative writing and reading comprehension.",
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝",
      image: "/public/lovable-uploads/72f82c67-0df8-4350-814c-79ce2d5faa3f.png"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-[#FEF7CD] relative overflow-hidden">
        <div className="absolute top-20 left-[5%] text-white text-xl">✦</div>
        <div className="absolute top-40 right-[10%] text-white text-xl">✦</div>
        <div className="absolute bottom-20 left-[15%] text-white text-xl">✦</div>
        <div className="absolute bottom-40 right-[20%] text-white text-xl">✦</div>
        
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-4xl font-extrabold text-[#5E2D00] mb-4 relative inline-flex items-center">
              <span className="relative">
                AI Tutor
                <span className="absolute -top-6 -right-6 text-2xl animate-wiggle">✨</span>
              </span>
              <Sparkles className="ml-3 h-6 w-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your friendly AI learning companion is here to help! Choose one of our special 
              learning tools below and let's learn together.
            </p>
          </div>

          {!isPremium && <SubscriptionBanner type="ai-tutor" />}

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {tutorOptions.map((option, index) => (
              <div 
                key={option.id}
                onClick={option.onClick}
                className="cursor-pointer"
              >
                <Link 
                  to={option.path}
                  onClick={(e) => {
                    if (option.onClick) {
                      e.preventDefault();
                      option.onClick();
                    }
                  }}
                >
                  <Card className="cursor-pointer transition-all hover:shadow-lg border-2 overflow-hidden group border-transparent h-full bg-white rounded-xl">
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-yellow-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="flex flex-col items-center text-center pb-2 relative">
                      <div className="mb-2 p-3 rounded-full bg-[#F2FCE2] group-hover:bg-[#DEF8C2] transition-colors">
                        {option.icon}
                      </div>
                      <CardTitle className="text-xl flex items-center text-[#5E2D00]">
                        {option.title}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce-slow">
                          {option.emoji}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {option.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-center relative pb-10">
                      <Button variant="ghost" className="group-hover:bg-[#F2FCE2] transition-colors text-[#4ABA79]">
                        Start Learning
                      </Button>
                      <img 
                        src={option.image}
                        alt={option.title}
                        className="absolute -bottom-4 -right-4 w-16 h-16 object-contain transform transition-transform group-hover:scale-110"
                      />
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
