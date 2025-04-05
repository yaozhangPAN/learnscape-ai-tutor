
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Pause, Volume2, CheckCircle2, RefreshCw, ArrowLeft } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const DictationPractice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dictationText, setDictationText] = useState("");
  const [difficulty, setDifficulty] = useState("elementary");
  const [subject, setSubject] = useState("english");
  const [result, setResult] = useState<{
    score: number;
    feedback: string;
    correctText: string;
  } | null>(null);
  const { isPremium } = useSubscription();

  const dictationSamples = {
    elementary: {
      english: "The cat sat on the mat. It was a sunny day. The birds were singing in the trees.",
      math: "Two plus two equals four. Five times three is fifteen. Ten divided by two is five.",
      science: "Plants need water and sunlight to grow. The Earth rotates around the Sun. Water freezes at zero degrees Celsius."
    },
    intermediate: {
      english: "The magnificent sunrise painted the sky with brilliant hues of orange and pink, creating a breathtaking vista.",
      math: "The sum of the angles in a triangle equals one hundred and eighty degrees. The area of a circle is pi times radius squared.",
      science: "Photosynthesis is the process by which plants convert light energy into chemical energy. The periodic table organizes elements by their atomic number."
    },
    advanced: {
      english: "The quintessential dilemma faced by the protagonist exemplifies the existential paradox inherent in post-modern literature.",
      math: "The derivative of a function at a given point is the slope of the tangent line to the function's graph at that point. A geometric sequence has a constant ratio between consecutive terms.",
      science: "Quantum entanglement occurs when pairs of particles interact in such a way that the quantum state of each particle cannot be described independently. Mitochondria are responsible for cellular respiration and ATP production."
    }
  };

  const handleStartListening = () => {
    setIsListening(true);
    // In a real implementation, this would start the speech recognition
    // and update the dictationText state as the user speaks
  };

  const handleStopListening = () => {
    setIsListening(false);
    // In a real implementation, this would stop the speech recognition
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger text-to-speech
    // to read the current dictation text
    
    // Simulate audio playing
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleSubmit = () => {
    // In a real implementation, this would compare the user's input
    // with the original dictation text and provide feedback
    
    const correctText = dictationSamples[difficulty][subject];
    const similarityScore = calculateSimilarity(dictationText, correctText);
    const score = Math.round(similarityScore * 100);
    
    let feedback = "";
    if (score > 90) {
      feedback = "Excellent! Your dictation is nearly perfect.";
    } else if (score > 70) {
      feedback = "Good job! There are a few minor mistakes.";
    } else if (score > 50) {
      feedback = "Not bad, but there's room for improvement.";
    } else {
      feedback = "You need more practice. Try listening carefully to each word.";
    }
    
    setResult({
      score,
      feedback,
      correctText
    });
  };

  const handleReset = () => {
    setDictationText("");
    setResult(null);
  };

  // Simple string similarity algorithm (Levenshtein distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) {
      return 1.0;
    }
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) {
        costs[str2.length] = lastValue;
      }
    }
    return costs[str2.length];
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
            <h1 className="text-3xl font-bold text-learnscape-darkBlue">Dictation Practice</h1>
            <p className="text-gray-600 mt-1">Improve your listening and writing skills with dictation exercises.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Dictation Practice</h2>
              <p className="text-gray-600">
                Improve your listening and writing skills by practicing dictation exercises. 
                Listen to the audio and type what you hear.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Choose your dictation preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulty Level</label>
                      <Tabs value={difficulty} onValueChange={setDifficulty}>
                        <TabsList className="grid grid-cols-3">
                          <TabsTrigger value="elementary">Elementary</TabsTrigger>
                          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                          <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <Tabs value={subject} onValueChange={setSubject}>
                        <TabsList className="grid grid-cols-3">
                          <TabsTrigger value="english">English</TabsTrigger>
                          <TabsTrigger value="math">Math</TabsTrigger>
                          <TabsTrigger value="science">Science</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handlePlayAudio} 
                    className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
                    disabled={isPlaying}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Play Dictation
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Your Dictation</CardTitle>
                  <CardDescription>Listen and type what you hear</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type the dictation here..."
                    className="min-h-[150px]"
                    value={dictationText}
                    onChange={(e) => setDictationText(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={isListening ? handleStopListening : handleStartListening}
                    className={isListening ? "bg-red-100" : ""}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    {isListening ? "Stop Listening" : "Voice Input"}
                  </Button>
                  <Button 
                    onClick={result ? handleReset : handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {result ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Check Answer
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {result && (
              <Card className="border-t-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Results <span className="ml-auto bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Score: {result.score}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700">Feedback:</p>
                    <p className="text-gray-600">{result.feedback}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Correct Text:</p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md border">{result.correctText}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Your Text:</p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md border">{dictationText}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isPremium && (
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                <CardContent className="py-4">
                  <p className="text-center text-gray-600">
                    <span className="font-medium">✨ Premium Feature:</span> Unlock unlimited dictation exercises, voice input, and advanced difficulty levels by upgrading to premium.
                  </p>
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

export default DictationPractice;
