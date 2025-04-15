
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, BookText, Check, Lightbulb, Save, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const LanguageArts = () => {
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const { toast } = useToast();
  const { isPremium } = useSubscription();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const writingPrompts = [
    "Write a story about a magical library where books come to life at night.",
    "Describe your perfect day from morning to evening.",
    "Create a dialogue between two animals discussing human behavior.",
    "Write a letter to your future self ten years from now.",
    "Imagine you could travel anywhere in time. Where would you go and why?",
    "Describe a character who discovers they have an unusual superpower.",
  ];

  const handleSelectPrompt = (promptText) => {
    setSelectedPrompt(promptText);
    setPrompt(promptText);
  };

  const handleGetFeedback = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Writing",
        description: "Please write something before requesting feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI generating feedback
    setTimeout(() => {
      const exampleFeedback = `
        <h3>Writing Feedback</h3>
        <p>Thank you for sharing your writing. Here's some feedback to help you improve:</p>
        
        <div class="mt-4 mb-4">
          <h4 class="font-medium text-green-600">Strengths</h4>
          <ul class="list-disc pl-5 mt-2 space-y-2">
            <li>Creative storyline with interesting characters</li>
            <li>Good use of descriptive language</li>
            <li>Clear beginning, middle, and end structure</li>
          </ul>
        </div>
        
        <div class="mt-4 mb-4">
          <h4 class="font-medium text-amber-600">Areas for Improvement</h4>
          <ul class="list-disc pl-5 mt-2 space-y-2">
            <li>Consider varying your sentence length for better rhythm</li>
            <li>Add more sensory details (sounds, smells, textures)</li>
            <li>Develop character motivations more deeply</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
          <h4 class="font-medium">Suggested Revisions</h4>
          <p class="mt-2">Here are some specific suggestions:</p>
          <ol class="list-decimal pl-5 mt-2 space-y-1">
            <li>In paragraph 2, expand on how the character feels when they enter the scene</li>
            <li>In paragraph 4, consider adding dialogue to show rather than tell</li>
            <li>The conclusion could be strengthened with a clearer resolution</li>
          </ol>
        </div>
      `;
      
      setFeedback(exampleFeedback);
      setIsLoading(false);
      
      toast({
        title: "Feedback Generated",
        description: "Your writing has been analyzed successfully.",
      });
    }, 1500);
  };

  const handleSave = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Writing",
        description: "There's nothing to save yet.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Writing Saved",
      description: "Your writing has been saved successfully.",
    });
  };

  const handleClear = () => {
    setPrompt("");
    setFeedback("");
    setSelectedPrompt("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to AI Tutor
          </Link>
          
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-4 flex items-center">
              <BookText className="h-8 w-8 text-purple-500 mr-3" />
              Language Arts Workshop
            </h1>
            
            <p className="text-gray-600 max-w-3xl mb-8">
              Enhance your writing skills with creative prompts and personalized feedback. 
              Choose a prompt or write freely, then get AI-powered analysis to improve your work.
            </p>
            
            {!isPremium && <SubscriptionBanner type="ai-tutor" />}
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    Writing Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {writingPrompts.map((promptText, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start text-left h-auto py-3 group ${
                        selectedPrompt === promptText ? 'border-purple-500 bg-purple-50' : ''
                      }`}
                      onClick={() => handleSelectPrompt(promptText)}
                    >
                      {promptText}
                      {selectedPrompt === promptText && (
                        <Check className="ml-2 h-4 w-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Button>
                  ))}
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Your Writing Space</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Start writing here..."
                      className="min-h-[250px] resize-none"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleClear}>
                      Clear
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button onClick={handleGetFeedback} disabled={isLoading}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isLoading ? "Analyzing..." : "Get Feedback"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                {feedback && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                        Writing Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: feedback }} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LanguageArts;
