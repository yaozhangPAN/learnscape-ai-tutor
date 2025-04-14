
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const LanguageArts = () => {
  const [prompt, setPrompt] = useState("");
  
  const writingPrompts = [
    "Write a story about a magical library where books come to life at night.",
    "Describe your perfect day from morning to evening.",
    "Create a dialogue between two animals discussing human behavior.",
    "Write a letter to your future self ten years from now."
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to AI Tutor
          </Link>
          
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-8">Language Arts Workshop</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Writing Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {writingPrompts.map((promptText, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setPrompt(promptText)}
                  >
                    {promptText}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Writing Space</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Start writing here..."
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button className="w-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LanguageArts;
