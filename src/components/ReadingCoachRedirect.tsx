
import { useState } from 'react';
import { BookOpen, Volume2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ReadingCoachRedirect = () => {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isReading, setIsReading] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [words, setWords] = useState<string[]>([]);

  const handleStartReading = () => {
    if (!text) return;
    const wordArray = text.split(' ').filter(word => word.length > 0);
    setWords(wordArray);
    setCurrentWord(0);
    setIsReading(true);
  };

  const handleNextWord = () => {
    if (currentWord < words.length - 1) {
      setCurrentWord(prev => prev + 1);
    } else {
      setIsReading(false);
      setCurrentWord(0);
    }
  };

  const getWordDisplaySpeed = () => {
    switch (difficulty) {
      case 'easy': return 1000;
      case 'medium': return 500;
      case 'hard': return 250;
      default: return 500;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 text-2xl font-bold text-learnscape-darkBlue">
          <BookOpen className="h-8 w-8" />
          <h1>Reading Coach</h1>
        </div>

        {!isReading ? (
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Enter text to practice reading</Label>
              <textarea
                id="text"
                className="w-full min-h-[200px] p-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-learnscape-blue"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type the text you want to practice reading..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Reading Speed</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Slow (60 WPM)</SelectItem>
                  <SelectItem value="medium">Medium (120 WPM)</SelectItem>
                  <SelectItem value="hard">Fast (240 WPM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleStartReading}
              disabled={!text}
              className="w-full"
            >
              Start Reading Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        ) : (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold min-h-[60px] flex items-center justify-center">
                {words[currentWord]}
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handleNextWord}>
                  Next Word
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Word {currentWord + 1} of {words.length}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReadingCoachRedirect;
