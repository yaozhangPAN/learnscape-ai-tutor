import { useState, useEffect } from "react";
import { useRequirePremium } from "@/hooks/useRequirePremium";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Sparkles, Volume2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const OralExamPractice = () => {
  useRequirePremium();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [practicePrompt, setPracticePrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [animation, setAnimation] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setAnimation(true);
    
    const timer = setTimeout(() => setAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [practicePrompt]);
  
  const prompts = [
    "Describe your favorite hobby and why you enjoy it.",
    "If you could have any superpower, what would it be and why?",
    "Talk about your favorite animal and what makes it special.",
    "Imagine you're a famous explorer. Where would you go?",
    "If you could invent something new, what would it be?",
    "Describe your perfect day from morning to night."
  ];

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      
      setTimeout(() => {
        setFeedback(`
          <h3>Pronunciation 🔊</h3>
          <p>Your pronunciation is generally clear. Pay attention to the "th" sound in words like "think" and "with".</p>
          
          <h3>Fluency ✨</h3>
          <p>Good flow of speech. You had only a few pauses that slightly affected fluency.</p>
          
          <h3>Vocabulary 📚</h3>
          <p>You used a variety of appropriate words. Consider using more descriptive adjectives to enhance your response.</p>
          
          <h3>Grammar ✓</h3>
          <p>Good sentence structure. Watch for subject-verb agreement in complex sentences.</p>
          
          <h3>Overall 🌟</h3>
          <p>You communicated your ideas effectively. Continue practicing with more complex topics to further improve.</p>
        `);
      }, 1500);
      
      toast({
        title: "Recording Complete",
        description: "Your response has been submitted for analysis.",
      });
    } else {
      if (!practicePrompt) {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setPracticePrompt(randomPrompt);
      }
      
      setRecordingTime(0);
      setIsRecording(true);
      setFeedback("");
      
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) {
            clearInterval(timer);
            setIsRecording(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly to answer the prompt.",
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getNewPrompt = () => {
    const currentIndex = prompts.indexOf(practicePrompt);
    const nextIndex = (currentIndex + 1) % prompts.length;
    setPracticePrompt(prompts[nextIndex]);
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-black">
          <div className="mb-6">
            <Link to="/ai-tutor" className="inline-flex items-center text-black hover:text-gray-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to AI Tutor
            </Link>
            <h1 className="text-3xl font-bold text-black">Oral Exam Practice</h1>
            <p className="text-black mt-1">Practice your speaking skills and prepare for oral examinations.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black flex items-center">
                Oral Exam Practice
                <Sparkles className="ml-2 h-4 w-4 text-yellow-400" />
              </h2>
              <Button variant="outline" onClick={getNewPrompt} disabled={isRecording} className="group text-black">
                New Topic
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">🎲</span>
              </Button>
            </div>
            
            <Card className={`border-2 border-learnscape-purple ${animation ? 'animate-pop' : ''}`}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center text-black">
                  <Volume2 className="mr-2 h-5 w-5 text-learnscape-purple" />
                  Speaking Prompt:
                </h3>
                <p className="text-lg relative text-black">
                  {practicePrompt || "Click 'New Topic' to get a speaking prompt."}
                  {practicePrompt && (
                    <span className="absolute -top-4 -right-2 text-lg animate-wiggle">💭</span>
                  )}
                </p>
              </CardContent>
            </Card>
            
            <div className="flex flex-col items-center py-8 space-y-4">
              <div className="relative">
                <Button
                  size="lg"
                  className={`rounded-full w-20 h-20 flex items-center justify-center text-black ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-learnscape-blue hover:bg-blue-700'
                  }`}
                  onClick={toggleRecording}
                >
                  {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                {isRecording && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    ●
                  </span>
                )}
              </div>
              <p className="text-lg font-mono text-black">
                {isRecording ? formatTime(recordingTime) : "Ready"}
              </p>
              <p className="text-sm text-black max-w-md text-center">
                {isRecording 
                  ? "Speak clearly to answer the prompt. Click the button again to stop recording." 
                  : "Click the microphone button to start recording your response."}
              </p>
            </div>
            
            {feedback && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-black">
                  <Sparkles className="mr-2 h-5 w-4 text-yellow-400" />
                  AI Feedback:
                </h3>
                <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none text-black">
                  <div dangerouslySetInnerHTML={{ __html: feedback }} />
                </div>
                <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center">
                  <p className="text-sm text-black">Great job! Keep practicing to improve your speaking skills. 🌟</p>
                  <div className="flex justify-center mt-2 space-x-2">
                    {["😀", "👍", "🎉", "⭐"].map((emoji, index) => (
                      <span key={index} className="text-xl cursor-pointer hover:transform hover:scale-125 transition-transform">
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OralExamPractice;
