
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Volume2, GamepadIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Phaser from "phaser";

const VocabularyBuilder = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [gameURL, setGameURL] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);

  const cards = [
    { word: "Ephemeral", definition: "Lasting for a very short time", example: "The ephemeral beauty of a sunset" },
    { word: "Ubiquitous", definition: "Present everywhere", example: "Smartphones have become ubiquitous in modern life" },
    { word: "Serendipity", definition: "The occurrence of positive events by chance", example: "Finding a perfect job by serendipity" }
  ];

  useEffect(() => {
    const fetchGameFile = async () => {
      const { data } = await supabase.storage
        .from('vocabulary-game')
        .getPublicUrl('index.html');

      if (data) {
        setGameURL(data.publicUrl);
      }
    };

    fetchGameFile();
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to AI Tutor
          </Link>
          
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-8">Vocabulary Builder</h1>
          
          <div className="space-y-8">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-2xl">{cards[currentCard].word}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">{cards[currentCard].definition}</p>
                <p className="text-sm text-gray-500 italic text-center">"{cards[currentCard].example}"</p>
                
                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={previousCard}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button variant="outline">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={nextCard}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                variant="outline"
                onClick={() => setShowGame(prev => !prev)}
                className="mb-4 flex items-center gap-2"
              >
                <GamepadIcon className="h-4 w-4" />
                {showGame ? "Hide Game" : "Play Vocabulary Game"}
              </Button>
            </div>

            {showGame && gameURL && (
              <Card className="w-full">
                <CardContent className="p-4">
                  <iframe 
                    src={gameURL} 
                    className="w-full h-[600px] border-0"
                    title="Vocabulary Game"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VocabularyBuilder;
