
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, CheckCircle2, Clock, Award, Brain, BookOpen, FileText, ChevronRight, ArrowRight, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const DailyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(0);
  const { toast } = useToast();
  const { isPremium } = useSubscription();

  useEffect(() => {
    // Simulate loading recommendations from an API
    const timer = setTimeout(() => {
      const dummyRecommendations = [
        {
          id: 1,
          title: "Fractions Practice",
          type: "worksheet",
          subject: "Mathematics",
          estimatedTime: "15 mins",
          difficulty: "Medium",
          icon: <FileText className="h-10 w-10 text-white" />,
          description: "Practice adding and subtracting fractions with unlike denominators.",
          completed: false,
          progress: 0,
          color: "bg-blue-500"
        },
        {
          id: 2,
          title: "Vocabulary Builder",
          type: "exercise",
          subject: "English",
          estimatedTime: "10 mins",
          difficulty: "Easy",
          icon: <Book className="h-10 w-10 text-white" />,
          description: "Expand your vocabulary with these common PSLE words.",
          completed: false,
          progress: 0,
          color: "bg-purple-500"
        },
        {
          id: 3,
          title: "Plant Life Cycle",
          type: "video",
          subject: "Science",
          estimatedTime: "8 mins",
          difficulty: "Easy",
          icon: <BookOpen className="h-10 w-10 text-white" />,
          description: "Learn about plant reproduction and life cycles.",
          completed: false,
          progress: 0,
          color: "bg-green-500"
        },
        {
          id: 4,
          title: "Multiplication Practice",
          type: "quiz",
          subject: "Mathematics",
          estimatedTime: "12 mins",
          difficulty: "Hard",
          icon: <Brain className="h-10 w-10 text-white" />,
          description: "Test your multiplication skills with these challenging problems.",
          completed: false,
          progress: 0,
          color: "bg-amber-500"
        },
        {
          id: 5,
          title: "Comprehension Skills",
          type: "reading",
          subject: "English",
          estimatedTime: "20 mins",
          difficulty: "Medium",
          icon: <FileText className="h-10 w-10 text-white" />,
          description: "Practice inferring meaning from text with this short story.",
          completed: false,
          progress: 0,
          color: "bg-red-500"
        }
      ];
      
      setRecommendations(dummyRecommendations);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStartActivity = (id) => {
    // In a real implementation, this would navigate to the actual activity
    toast({
      title: "Activity Started",
      description: "You've started a new recommended activity!",
    });
    
    // Update the progress for this recommendation
    setRecommendations(prevRecs => 
      prevRecs.map(rec => 
        rec.id === id ? { ...rec, progress: 30 } : rec
      )
    );
  };

  const handleCompleteActivity = (id) => {
    // Mark the activity as completed
    setRecommendations(prevRecs => 
      prevRecs.map(rec => 
        rec.id === id ? { ...rec, completed: true, progress: 100 } : rec
      )
    );
    
    setCompletedToday(prev => prev + 1);
    
    toast({
      title: "Activity Completed!",
      description: "Great job! Your progress has been saved.",
      variant: "success",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-600";
      case "Medium":
        return "bg-amber-100 text-amber-600";
      case "Hard":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "worksheet":
        return <FileText className="h-4 w-4" />;
      case "exercise":
        return <Book className="h-4 w-4" />;
      case "video":
        return <BookOpen className="h-4 w-4" />;
      case "quiz":
        return <Brain className="h-4 w-4" />;
      case "reading":
        return <FileText className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-amber-500" />
          Daily Learning Path
        </h2>
        <div className="flex items-center">
          <div className="text-sm mr-4">
            <span className="font-medium">{completedToday}</span>
            <span className="text-gray-500"> of {recommendations.length} completed today</span>
          </div>
          <Button>
            Refresh Path
          </Button>
        </div>
      </div>
      
      {!isPremium && <SubscriptionBanner type="daily-recommendation" />}
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center">
        <Award className="h-8 w-8 text-amber-500 mr-4" />
        <div>
          <h3 className="font-medium text-amber-700">Your Learning Journey</h3>
          <p className="text-amber-600 text-sm">
            Follow this path to master today's concepts. Each activity builds on your knowledge.
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center space-y-6 py-10">
          <div className="w-16 h-16 border-4 border-learnscape-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-learnscape-darkBlue font-medium">Loading your learning path...</p>
        </div>
      ) : (
        <div className="pb-6">
          <div className="flex flex-col space-y-4">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="flex">
                {/* Lesson card with tutory.io style */}
                <div className="flex flex-grow">
                  <div className={`flex items-center justify-center ${rec.color} w-16 h-16 rounded-xl shrink-0`}>
                    {rec.icon}
                  </div>
                  
                  <div className={`
                    flex-grow ml-4 p-4 bg-white border-2 rounded-xl
                    ${rec.completed 
                      ? 'border-green-500' 
                      : rec.progress > 0 
                        ? 'border-blue-500' 
                        : 'border-gray-200'
                    }
                    flex justify-between items-center
                  `}>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <h3 className="font-bold text-lg">{rec.title}</h3>
                        {rec.completed && (
                          <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{rec.subject}</Badge>
                        <Badge className={`text-xs ${getDifficultyColor(rec.difficulty)}`}>
                          {rec.difficulty}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {rec.estimatedTime}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                      
                      {rec.progress > 0 && !rec.completed && (
                        <div className="w-full mt-2">
                          <Progress value={rec.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-4">
                      {rec.completed ? (
                        <Button variant="outline" size="sm" className="w-24">
                          Review
                        </Button>
                      ) : rec.progress > 0 ? (
                        <Button size="sm" className="w-24">
                          Continue
                        </Button>
                      ) : (
                        <Button size="sm" className="w-24" onClick={() => handleStartActivity(rec.id)}>
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Arrow to next item (except for last item) */}
                {index < recommendations.length - 1 && (
                  <div className="flex items-center mx-4">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly progress summary */}
      {!isLoading && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold text-learnscape-darkBlue text-lg mb-4">Weekly Learning Progress</h3>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {[40, 60, 100, 80, 20, 0, 0].map((value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-24 w-12 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-learnscape-blue rounded-t-xl transition-all duration-500"
                      style={{ height: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              ))}
            </div>
            <div className="text-right bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-amber-500 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-learnscape-darkBlue">4 <span className="text-sm font-normal">days streak</span></p>
                  <p className="text-sm text-gray-500">Keep it up to earn bonus points!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRecommendations;
