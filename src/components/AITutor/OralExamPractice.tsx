
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Play, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OralExamPractice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [practicePrompt, setPracticePrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();
  
  const prompts = [
    "Describe your favorite hobby and why you enjoy it.",
    "Explain how technology has changed education.",
    "Talk about a place you would like to visit and why.",
    "Discuss the importance of recycling and protecting the environment.",
    "Share your thoughts on the benefits of learning a second language.",
    "Describe a challenge you've faced and how you overcame it."
  ];

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      
      // In a real app, this would process the actual recording
      // Simulate AI generating feedback
      setTimeout(() => {
        setFeedback(`
          <h3>Pronunciation</h3>
          <p>Your pronunciation is generally clear. Pay attention to the "th" sound in words like "think" and "with".</p>
          
          <h3>Fluency</h3>
          <p>Good flow of speech. You had only a few pauses that slightly affected fluency.</p>
          
          <h3>Vocabulary</h3>
          <p>You used a variety of appropriate words. Consider using more descriptive adjectives to enhance your response.</p>
          
          <h3>Grammar</h3>
          <p>Good sentence structure. Watch for subject-verb agreement in complex sentences.</p>
          
          <h3>Overall</h3>
          <p>You communicated your ideas effectively. Continue practicing with more complex topics to further improve.</p>
        `);
      }, 1500);
      
      toast({
        title: "Recording Complete",
        description: "Your response has been submitted for analysis.",
      });
    } else {
      // Start new recording
      if (!practicePrompt) {
        // Select a random prompt if none is active
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setPracticePrompt(randomPrompt);
      }
      
      setRecordingTime(0);
      setIsRecording(true);
      setFeedback("");
      
      // Start the timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) { // Auto-stop after 2 minutes
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue">Oral Exam Practice</h2>
        <Button variant="outline" onClick={getNewPrompt} disabled={isRecording}>
          New Topic
        </Button>
      </div>
      
      <Card className="border-2 border-learnscape-purple">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">Speaking Prompt:</h3>
          <p className="text-lg">
            {practicePrompt || "Click 'New Topic' to get a speaking prompt."}
          </p>
        </CardContent>
      </Card>
      
      <div className="flex flex-col items-center py-8 space-y-4">
        <div className="relative">
          <Button
            size="lg"
            className={`rounded-full w-20 h-20 flex items-center justify-center ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-learnscape-blue hover:bg-blue-700'
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
        <p className="text-lg font-mono">
          {isRecording ? formatTime(recordingTime) : "Ready"}
        </p>
        <p className="text-sm text-gray-500 max-w-md text-center">
          {isRecording 
            ? "Speak clearly to answer the prompt. Click the button again to stop recording." 
            : "Click the microphone button to start recording your response."}
        </p>
      </div>
      
      {feedback && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">AI Feedback:</h3>
          <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: feedback }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OralExamPractice;
