import { useState } from "react";
import { useRequirePremium } from "@/hooks/useRequirePremium";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WritingCoach = () => {
  useRequirePremium();

  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text for feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analyzing the text
    setTimeout(() => {
      // Example feedback (in a real app, this would come from an AI API)
      const exampleFeedback = `
## Writing Feedback

Your writing shows good understanding of the topic. Here are some suggestions:

### Strengths
- Clear main ideas
- Good vocabulary usage
- Logical structure

### Areas for Improvement
- Consider adding more supporting examples
- Watch for passive voice in paragraphs 2 and 3
- Add transitions between your third and fourth paragraphs

### Grammar and Style
- There are 2 spelling errors
- Consider varying sentence structure more
- Good use of academic language

Would you like more detailed feedback on any specific aspect?
      `;
      
      setFeedback(exampleFeedback);
      setIsLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setText("");
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to AI Tutor
            </Link>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue">Writing Coach</h1>
            <p className="text-gray-600 mt-1">Improve your writing skills with personalized feedback and guidance.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue">Writing Coach</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClear}>Clear</Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Get Feedback"}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Enter your text for feedback</label>
                <Textarea 
                  placeholder="Type or paste your essay, paragraph, or writing sample here..."
                  className="min-h-[300px] resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Our AI will analyze your writing and provide helpful feedback on grammar,
                  structure, style, and content.
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">AI Feedback</label>
                <div className={`bg-gray-50 border rounded-md p-4 min-h-[300px] prose prose-sm max-w-none ${!feedback ? 'flex items-center justify-center text-gray-400' : ''}`}>
                  {feedback ? (
                    <div dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br>') }} />
                  ) : (
                    <p>Feedback will appear here after submission</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
