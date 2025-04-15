import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pen, Mic, Brain, Sparkles, Stars, Lightbulb, FileSearch, Camera, Headphones, Book, BookText } from "lucide-react";
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
    window.location.href = 'https://game-art.fly.dev/';
  };
  
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      icon: <Pen className="h-8 w-8 text-learnscape-blue" />,
      description: "Improve your writing skills with personalized feedback and guidance.",
      path: "/ai-tutor/writing-coach",
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      icon: <Mic className="h-8 w-8 text-learnscape-purple" />,
      description: "Practice your speaking skills and prepare for oral examinations.",
      path: "/ai-tutor/oral-exam",
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: "Dictation Practice",
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      description: "Get ready for your school spelling test with fun Chinese and English dictation practice!",
      path: "/ai-tutor/dictation-practice",
      emoji: "🎧"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: "Get personalized help with any subject or concept you're struggling with.",
      path: "/ai-tutor/tutor-me",
      emoji: "🧠"
    },
    {
      id: "error-analysis",
      title: "Error Analysis",
      icon: <FileSearch className="h-8 w-8 text-red-500" />,
      description: "Analyze your mistakes and learn how to avoid them in future examinations.",
      path: "/ai-tutor/error-analysis",
      emoji: "🔍"
    },
    {
      id: "snap-and-solve",
      title: "Snap & Solve",
      icon: <Camera className="h-8 w-8 text-indigo-500" />,
      description: "Take a photo of your question to get step by step guidance for reaching solutions!",
      path: "/ai-tutor/snap-and-solve",
      emoji: "📸"
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      icon: <Book className="h-8 w-8 text-emerald-500" />,
      description: "Master new words through interactive flashcards and personalized learning.",
      path: "/ai-tutor/vocabulary",
      emoji: "📚"
    },
    {
      id: "language-arts",
      title: "Language Arts Workshop",
      icon: <BookText className="h-8 w-8 text-purple-500" />,
      description: "Develop your language skills through creative writing and reading comprehension.",
      path: "#",
      onClick: handleLanguageArtsClick,
      emoji: "📝"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-16 h-16 rounded-full bg-blue-100/60 animate-float hidden md:block"></div>
        <div className="absolute top-40 right-[10%] w-12 h-12 rounded-full bg-purple-100/60 animate-spin-slow hidden md:block"></div>
        <div className="absolute bottom-20 left-[15%] w-10 h-10 rounded-full bg-green-100/60 animate-bounce-slow hidden md:block"></div>
        <div className="absolute bottom-40 right-[20%] w-14 h-14 rounded-full bg-yellow-100/60 animate-wiggle hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-4xl font-extrabold text-learnscape-darkBlue mb-4 relative inline-flex items-center">
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
                  <Card className="cursor-pointer transition-all hover:shadow-lg border-2 overflow-hidden group border-transparent h-full">
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-yellow-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="flex flex-col items-center text-center pb-2 relative">
                      <div className="mb-2 p-3 rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors">
                        {option.icon}
                      </div>
                      <CardTitle className="text-xl flex items-center">
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
                    <CardFooter className="flex justify-center">
                      <Button variant="ghost" className="group-hover:bg-blue-50 transition-colors">
                        Start Learning
                      </Button>
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
