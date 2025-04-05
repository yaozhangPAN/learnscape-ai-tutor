
import { useState, useEffect } from "react";
import { Pen, Mic, Brain, Sparkles, FileSearch, Camera, Headphones } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WritingCoach from "@/components/AITutor/WritingCoach";
import OralExamPractice from "@/components/AITutor/OralExamPractice";
import TutorMe from "@/components/AITutor/TutorMe";
import ErrorAnalysis from "@/components/AITutor/ErrorAnalysis";
import SnapAndSolve from "@/components/AITutor/SnapAndSolve";
import DictationPractice from "@/components/AITutor/DictationPractice";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import AISidebar from "@/components/AITutor/AISidebar";
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
      icon: <Pen className="h-6 w-6" />,
      description: "Improve your writing skills with personalized feedback and guidance.",
      component: <WritingCoach />,
      emoji: "✏️"
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      icon: <Mic className="h-6 w-6" />,
      description: "Practice your speaking skills and prepare for oral examinations.",
      component: <OralExamPractice />,
      emoji: "🎙️"
    },
    {
      id: "dictation-practice",
      title: "Dictation Practice",
      icon: <Headphones className="h-6 w-6" />,
      description: "Get ready for your school spelling test with fun Chinese and English dictation practice!",
      component: <DictationPractice />,
      emoji: "🎧"
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      icon: <Brain className="h-6 w-6" />,
      description: "Get personalized help with any subject or concept you're struggling with.",
      component: <TutorMe />,
      emoji: "🧠"
    },
    {
      id: "error-analysis",
      title: "Error Analysis",
      icon: <FileSearch className="h-6 w-6" />,
      description: "Analyze your mistakes and learn how to avoid them in future examinations.",
      component: <ErrorAnalysis />,
      emoji: "🔍"
    },
    {
      id: "snap-and-solve",
      title: "Snap & Solve",
      icon: <Camera className="h-6 w-6" />,
      description: "Take a photo of your question to get step by step guidance for reaching solutions!",
      component: <SnapAndSolve />,
      emoji: "📸"
    }
  ];

  const currentTool = tutorOptions.find(option => option.id === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-[5%] w-16 h-16 rounded-full bg-blue-100/60 animate-float hidden md:block"></div>
        <div className="absolute top-40 right-[10%] w-12 h-12 rounded-full bg-purple-100/60 animate-spin-slow hidden md:block"></div>
        <div className="absolute bottom-20 left-[15%] w-10 h-10 rounded-full bg-green-100/60 animate-bounce-slow hidden md:block"></div>
        <div className="absolute bottom-40 right-[20%] w-14 h-14 rounded-full bg-yellow-100/60 animate-wiggle hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-learnscape-darkBlue mb-4 relative inline-flex items-center">
              <span className="relative">
                AI Tutor
                <span className="absolute -top-6 -right-6 text-2xl animate-wiggle">✨</span>
              </span>
              <Sparkles className="ml-3 h-6 w-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Your friendly AI learning companion is here to help! Choose one of our special 
              learning tools and let's learn together.
            </p>
          </div>

          {!isPremium && <SubscriptionBanner type="ai-tutor" />}

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <SidebarProvider defaultOpen={true}>
              <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] w-full bg-white rounded-lg shadow-md overflow-hidden">
                <AISidebar 
                  options={tutorOptions} 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
                
                <div className="flex-1 p-4 md:p-6">
                  {currentTool && (
                    <div className="mb-4 md:mb-6">
                      <Card className="border-0 shadow-none bg-gray-50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-blue-100">
                              {currentTool.icon}
                            </div>
                            <div>
                              <CardTitle className="text-xl flex items-center">
                                {currentTool.title}
                                <span className="ml-2">{currentTool.emoji}</span>
                              </CardTitle>
                              <CardDescription>
                                {currentTool.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    {tutorOptions.map((option) => (
                      <div key={option.id} className={activeTab === option.id ? 'block' : 'hidden'}>
                        {option.component}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
