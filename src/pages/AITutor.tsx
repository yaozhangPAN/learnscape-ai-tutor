
import { useState, useEffect } from "react";
import { Pen, Mic, Brain, Sparkles, Stars, Lightbulb, FileSearch, Calendar, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WritingCoach from "@/components/AITutor/WritingCoach";
import OralExamPractice from "@/components/AITutor/OralExamPractice";
import TutorMe from "@/components/AITutor/TutorMe";
import ErrorAnalysis from "@/components/AITutor/ErrorAnalysis";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";
import SnapAndSolve from "@/components/AITutor/SnapAndSolve";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";

const AITutor = () => {
  const [activeTab, setActiveTab] = useState("writing-coach");
  const [isVisible, setIsVisible] = useState(false);
  const { isPremium } = useSubscription();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      icon: <Pen className="h-8 w-8 text-learnscape-blue" />,
      description: "Improve your writing skills with personalized feedback and guidance.",
      component: <WritingCoach />,
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      icon: <Mic className="h-8 w-8 text-learnscape-purple" />,
      description: "Practice your speaking skills and prepare for oral examinations.",
      component: <OralExamPractice />,
      emoji: "🎙️"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: "Get personalized help with any subject or concept you're struggling with.",
      component: <TutorMe />,
      emoji: "🧠"
    },
    {
      id: "error-analysis",
      title: "Error Analysis",
      icon: <FileSearch className="h-8 w-8 text-red-500" />,
      description: "Analyze your mistakes and learn how to avoid them in future examinations.",
      component: <ErrorAnalysis />,
      emoji: "🔍"
    },
    {
      id: "daily-recommendations",
      title: "Daily Recommendations",
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      description: "Get personalized daily study recommendations tailored to your learning needs.",
      component: <DailyRecommendations />,
      emoji: "📅"
    },
    {
      id: "snap-and-solve",
      title: "Snap & Solve",
      icon: <Camera className="h-8 w-8 text-indigo-500" />,
      description: "Take a photo of your question to get step by step guidance for reaching solutions!",
      component: <SnapAndSolve />,
      emoji: "📸"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
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
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 overflow-hidden group ${
                  activeTab === option.id ? 'border-learnscape-blue animate-pop' : 'border-transparent'
                }`}
                onClick={() => setActiveTab(option.id)}
              >
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
              </Card>
            ))}
          </div>

          <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Tabs defaultValue="writing-coach" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6 mb-8">
                {tutorOptions.map((option) => (
                  <TabsTrigger key={option.id} value={option.id} className="flex items-center justify-center gap-2">
                    {option.emoji}
                    {option.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tutorOptions.map((option) => (
                <TabsContent key={option.id} value={option.id}>
                  {option.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
