
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, CheckCircle2, Clock, Award, Brain, BookOpen, FileText } from "lucide-react";
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
          icon: <FileText className="h-12 w-12 text-blue-500" />,
          description: "Practice adding and subtracting fractions with unlike denominators.",
          completed: false,
          progress: 0
        },
        {
          id: 2,
          title: "Vocabulary Builder",
          type: "exercise",
          subject: "English",
          estimatedTime: "10 mins",
          difficulty: "Easy",
          icon: <Book className="h-12 w-12 text-purple-500" />,
          description: "Expand your vocabulary with these common PSLE words.",
          completed: false,
          progress: 0
        },
        {
          id: 3,
          title: "Plant Life Cycle",
          type: "video",
          subject: "Science",
          estimatedTime: "8 mins",
          difficulty: "Easy",
          icon: <BookOpen className="h-12 w-12 text-green-500" />,
          description: "Learn about plant reproduction and life cycles.",
          completed: false,
          progress: 0
        },
        {
          id: 4,
          title: "Multiplication Practice",
          type: "quiz",
          subject: "Mathematics",
          estimatedTime: "12 mins",
          difficulty: "Hard",
          icon: <Brain className="h-12 w-12 text-amber-500" />,
          description: "Test your multiplication skills with these challenging problems.",
          completed: false,
          progress: 0
        },
        {
          id: 5,
          title: "Comprehension Skills",
          type: "reading",
          subject: "English",
          estimatedTime: "20 mins",
          difficulty: "Medium",
          icon: <FileText className="h-12 w-12 text-red-500" />,
          description: "Practice inferring meaning from text with this short story.",
          completed: false,
          progress: 0
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-amber-500" />
          Daily Recommendations
        </h2>
        <div className="flex items-center">
          <div className="text-sm mr-4">
            <span className="font-medium">{completedToday}</span>
            <span className="text-gray-500"> of {recommendations.length} completed today</span>
          </div>
          <Button>
            Refresh Recommendations
          </Button>
        </div>
      </div>
      
      {!isPremium && <SubscriptionBanner type="daily-recommendation" />}
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
        <Award className="h-8 w-8 text-amber-500 mr-4" />
        <div>
          <h3 className="font-medium text-amber-700">Personalized Study Plan</h3>
          <p className="text-amber-600 text-sm">
            These recommendations are tailored to your learning needs based on your performance and learning goals.
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className={`border-l-4 ${rec.completed ? 'border-l-green-500' : 'border-l-blue-500'} transition-all hover:shadow-md`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-gray-100 rounded-lg">
                    {rec.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      {rec.title}
                      {rec.completed && (
                        <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Badge variant="outline" className="mr-2">{rec.subject}</Badge>
                      <Badge className={`flex items-center gap-1 ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </Badge>
                      <span className="ml-3 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {rec.estimatedTime}
                      </span>
                      <Badge variant="outline" className="ml-2 flex items-center gap-1">
                        {getTypeIcon(rec.type)}
                        {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{rec.description}</p>
                {rec.progress > 0 && !rec.completed && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{rec.progress}%</span>
                    </div>
                    <Progress value={rec.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {rec.completed ? (
                    <Badge variant="outline" className="text-green-500 flex items-center">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  ) : rec.progress > 0 ? (
                    <Badge variant="outline" className="text-blue-500">In Progress</Badge>
                  ) : null}
                </div>
                <div>
                  {rec.completed ? (
                    <Button variant="outline">
                      View Again
                    </Button>
                  ) : rec.progress > 0 ? (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => handleStartActivity(rec.id)}>
                        Continue
                      </Button>
                      <Button onClick={() => handleCompleteActivity(rec.id)}>
                        Mark Complete
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleStartActivity(rec.id)}>
                      Start Activity
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyRecommendations;
