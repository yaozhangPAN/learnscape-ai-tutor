
import { useState, useEffect, useRef } from "react";
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
  const [showGame, setShowGame] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  const cards = [
    { word: "Ephemeral", definition: "Lasting for a very short time", example: "The ephemeral beauty of a sunset" },
    { word: "Ubiquitous", definition: "Present everywhere", example: "Smartphones have become ubiquitous in modern life" },
    { word: "Serendipity", definition: "The occurrence of positive events by chance", example: "Finding a perfect job by serendipity" }
  ];

  useEffect(() => {
    // Clean up game instance when component unmounts
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the game when showGame changes to true
    if (showGame && gameRef.current && !gameInstanceRef.current) {
      // Basic game configuration
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        backgroundColor: '#f8f9fa',
        scene: {
          preload: function(this: Phaser.Scene) {
            this.load.setBaseURL('/');
            // Load game assets
            this.load.image('background', 'https://xfwnjocfdvuocvwjopke.supabase.co/storage/v1/object/public/vocabulary-game/background.png');
            this.load.image('card', 'https://xfwnjocfdvuocvwjopke.supabase.co/storage/v1/object/public/vocabulary-game/card.png');
          },
          create: function(this: Phaser.Scene) {
            // Add text to the center of the screen
            const centerX = this.cameras.main.width / 2;
            const centerY = this.cameras.main.height / 2;
            
            this.add.text(centerX, centerY - 100, 'Vocabulary Game', { 
              fontSize: '48px', 
              color: '#333',
              fontFamily: 'Arial'
            }).setOrigin(0.5);
            
            this.add.text(centerX, centerY, 'Match the correct words with their definitions', { 
              fontSize: '24px', 
              color: '#555',
              fontFamily: 'Arial'
            }).setOrigin(0.5);
            
            // Add a start button
            const startButton = this.add.text(centerX, centerY + 100, 'Start Game', {
              fontSize: '32px',
              color: '#fff',
              backgroundColor: '#4CAF50',
              padding: { x: 20, y: 10 },
              fontFamily: 'Arial'
            }).setOrigin(0.5);
            
            startButton.setInteractive({ useHandCursor: true })
              .on('pointerdown', () => {
                console.log('Game started!');
                this.scene.start('gameScene');
              });
          }
        }
      };

      // Create the game instance
      gameInstanceRef.current = new Phaser.Game(config);
    } else if (!showGame && gameInstanceRef.current) {
      // Destroy the game instance when hiding
      gameInstanceRef.current.destroy(true);
      gameInstanceRef.current = null;
    }
  }, [showGame]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const toggleGame = () => {
    setShowGame(prev => !prev);
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
                onClick={toggleGame}
                className="mb-4 flex items-center gap-2"
              >
                <GamepadIcon className="h-4 w-4" />
                {showGame ? "Hide Game" : "Play Vocabulary Game"}
              </Button>
            </div>

            {showGame && (
              <Card className="w-full">
                <CardContent className="p-4">
                  <div 
                    ref={gameRef} 
                    className="w-full h-[600px] border-0 bg-gray-100 rounded-lg"
                    id="phaser-game"
                  ></div>
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
