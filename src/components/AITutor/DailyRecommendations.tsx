
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, CheckCircle2, Clock, Award, Brain, BookOpen, FileText, ChevronRight, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useI18n } from "@/contexts/I18nContext";

const DailyRecommendations = () => {
  const { t, lang } = useI18n();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(0);
  const { toast } = useToast();
  const { isPremium } = useSubscription();

  useEffect(() => {
    // 模拟从API加载
    const timer = setTimeout(() => {
      // 取决于语言，使用不同的文本
      const dummyRecommendations = [
        {
          id: 1,
          title: t.DAILY_RECOMMENDATION.REC1_TITLE,
          type: "worksheet",
          subject: t.DAILY_RECOMMENDATION.SUBJECT_MATH,
          estimatedTime: "15 mins",
          difficulty: t.DAILY_RECOMMENDATION.DIFFICULTY_MEDIUM,
          icon: <FileText className="h-10 w-10 text-blue-500" />,
          description: t.DAILY_RECOMMENDATION.REC1_DESC,
          completed: false,
          progress: 0
        },
        {
          id: 2,
          title: t.DAILY_RECOMMENDATION.REC2_TITLE,
          type: "exercise",
          subject: t.DAILY_RECOMMENDATION.SUBJECT_ENGLISH,
          estimatedTime: "10 mins",
          difficulty: t.DAILY_RECOMMENDATION.DIFFICULTY_EASY,
          icon: <Book className="h-10 w-10 text-purple-500" />,
          description: t.DAILY_RECOMMENDATION.REC2_DESC,
          completed: false,
          progress: 0
        },
        {
          id: 3,
          title: t.DAILY_RECOMMENDATION.REC3_TITLE,
          type: "video",
          subject: t.DAILY_RECOMMENDATION.SUBJECT_SCIENCE,
          estimatedTime: "8 mins",
          difficulty: t.DAILY_RECOMMENDATION.DIFFICULTY_EASY,
          icon: <BookOpen className="h-10 w-10 text-green-500" />,
          description: t.DAILY_RECOMMENDATION.REC3_DESC,
          completed: false,
          progress: 0
        },
        {
          id: 4,
          title: t.DAILY_RECOMMENDATION.REC4_TITLE,
          type: "quiz",
          subject: t.DAILY_RECOMMENDATION.SUBJECT_MATH,
          estimatedTime: "12 mins",
          difficulty: t.DAILY_RECOMMENDATION.DIFFICULTY_HARD,
          icon: <Brain className="h-10 w-10 text-amber-500" />,
          description: t.DAILY_RECOMMENDATION.REC4_DESC,
          completed: false,
          progress: 0
        },
        {
          id: 5,
          title: t.DAILY_RECOMMENDATION.REC5_TITLE,
          type: "reading",
          subject: t.DAILY_RECOMMENDATION.SUBJECT_ENGLISH,
          estimatedTime: "20 mins",
          difficulty: t.DAILY_RECOMMENDATION.DIFFICULTY_MEDIUM,
          icon: <FileText className="h-10 w-10 text-red-500" />,
          description: t.DAILY_RECOMMENDATION.REC5_DESC,
          completed: false,
          progress: 0
        }
      ];

      setRecommendations(dummyRecommendations);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [t, lang]);

  const handleStartActivity = (id) => {
    toast({
      title: t.DAILY_RECOMMENDATION.TOAST_STARTED_TITLE,
      description: t.DAILY_RECOMMENDATION.TOAST_STARTED_DESC,
    });

    setRecommendations(prevRecs =>
      prevRecs.map(rec =>
        rec.id === id ? { ...rec, progress: 30 } : rec
      )
    );
  };

  const handleCompleteActivity = (id) => {
    setRecommendations(prevRecs =>
      prevRecs.map(rec =>
        rec.id === id ? { ...rec, completed: true, progress: 100 } : rec
      )
    );

    setCompletedToday(prev => prev + 1);

    toast({
      title: t.DAILY_RECOMMENDATION.TOAST_COMPLETED_TITLE,
      description: t.DAILY_RECOMMENDATION.TOAST_COMPLETED_DESC,
      variant: "success",
    });
  };

  const getDifficultyColor = (difficulty) => {
    if (
      difficulty === t.DAILY_RECOMMENDATION.DIFFICULTY_EASY
    ) {
      return "bg-green-100 text-green-600";
    } else if (
      difficulty === t.DAILY_RECOMMENDATION.DIFFICULTY_MEDIUM
    ) {
      return "bg-amber-100 text-amber-600";
    } else if (
      difficulty === t.DAILY_RECOMMENDATION.DIFFICULTY_HARD
    ) {
      return "bg-red-100 text-red-600";
    }
    return "bg-gray-100 text-gray-600";
  };

  // 活动类型图标保留原样
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
          {t.DAILY_RECOMMENDATION.LEARNING_PATH}
        </h2>
        <div className="flex items-center">
          <div className="text-sm mr-4">
            <span className="font-medium">{completedToday}</span>
            <span className="text-gray-500">
              {/* FIX: This is where the error happened. We need to replace {n} with string representation of the number */}
              {t.DAILY_RECOMMENDATION.COMPLETED_TODAY.replace('{n}', String(recommendations.length))}
            </span>
          </div>
          <Button>
            {t.DAILY_RECOMMENDATION.REFRESH_PATH}
          </Button>
        </div>
      </div>

      {!isPremium && <SubscriptionBanner type="daily-recommendation" />}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
        <Award className="h-8 w-8 text-amber-500 mr-4" />
        <div>
          <h3 className="font-medium text-amber-700">{t.DAILY_RECOMMENDATION.JOURNEY_TITLE}</h3>
          <p className="text-amber-600 text-sm">
            {t.DAILY_RECOMMENDATION.JOURNEY_DESC}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center space-y-6 py-10">
          <div className="w-16 h-16 border-4 border-learnscape-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-learnscape-darkBlue font-medium">{t.DAILY_RECOMMENDATION.LOADING}</p>
        </div>
      ) : (
        <div className="relative py-8">
          {/* 路径背景 */}
          <div className="absolute left-0 right-0 h-16 top-1/2 transform -translate-y-1/2">
            <div className="h-16 bg-gradient-to-r from-learnscape-yellow to-learnscape-yellow rounded-full mx-8 relative">
              {/* 路标 */}
              <div className="absolute top-1/2 left-4 right-4 h-2 bg-white transform -translate-y-1/2 flex justify-between">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-10 h-2 bg-white"></div>
                ))}
              </div>
            </div>
          </div>

          {/* 站点 */}
          <div className="flex justify-between items-center relative z-10">
            {recommendations.map((rec, index) => {
              const isEven = index % 2 === 0;
              const positionClass = isEven ? "items-start" : "items-end";

              return (
                <div key={rec.id} className={`flex flex-col ${positionClass} relative z-10 group w-1/5`}>
                  {/* 连接线 */}
                  <div className={`absolute ${isEven ? 'top-full' : 'bottom-full'} left-1/2 w-0.5 h-12 bg-gray-300 -translate-x-1/2`}></div>
                  {/* 站点块 */}
                  <div className={`
                    flex flex-col items-center p-4 rounded-2xl 
                    ${rec.completed 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : rec.progress > 0 
                        ? 'bg-blue-100 border-2 border-blue-500' 
                        : 'bg-white border-2 border-learnscape-blue shadow-md hover:shadow-lg transition-all'
                    }
                    ${isEven ? 'mb-24' : 'mt-24'}
                  `}>
                    <div className="relative">
                      <div className={`
                        p-3 rounded-full 
                        ${rec.completed 
                          ? 'bg-green-500' 
                          : rec.progress > 0 
                            ? 'bg-blue-500' 
                            : 'bg-learnscape-blue'
                        }
                      `}>
                        {rec.icon}
                      </div>
                      {rec.completed && (
                        <CheckCircle2 className="absolute -top-1 -right-1 h-6 w-6 text-green-500 bg-white rounded-full" />
                      )}
                    </div>

                    <div className="text-center mt-3">
                      <h3 className="font-bold text-sm">{rec.title}</h3>
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">{rec.subject}</Badge>
                        <Badge className={`text-xs ${getDifficultyColor(rec.difficulty)}`}>
                          {rec.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {rec.estimatedTime}
                      </p>
                    </div>

                    {rec.progress > 0 && !rec.completed && (
                      <div className="w-full mt-2">
                        <Progress value={rec.progress} className="h-1.5" />
                      </div>
                    )}

                    <div className="mt-2">
                      {rec.completed ? (
                        <Button variant="outline" size="sm" className="text-xs">
                          {t.DAILY_RECOMMENDATION.REVIEW}
                        </Button>
                      ) : rec.progress > 0 ? (
                        <Button size="sm" className="text-xs">
                          {t.DAILY_RECOMMENDATION.CONTINUE}
                        </Button>
                      ) : (
                        <Button size="sm" className="text-xs" onClick={() => handleStartActivity(rec.id)}>
                          {t.DAILY_RECOMMENDATION.START}
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* 箭头 */}
                  {index < recommendations.length - 1 && (
                    <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 text-learnscape-blue h-6 w-6">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 每周进度 */}
      {!isLoading && (
        <div className="mt-10 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-learnscape-darkBlue mb-2">{t.DAILY_RECOMMENDATION.WEEKLY_PROGRESS}</h3>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {[40, 60, 100, 80, 20, 0, 0].map((value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-20 w-10 bg-gray-200 rounded-md relative">
                    <div 
                      className="absolute bottom-0 w-full bg-learnscape-blue rounded-md" 
                      style={{ height: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{t.DAILY_RECOMMENDATION.WEEK_DAYS[i]}</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-learnscape-darkBlue">4 <span className="text-sm font-normal">{t.DAILY_RECOMMENDATION.DAYS_STREAK}</span></p>
              <p className="text-sm text-gray-500">{t.DAILY_RECOMMENDATION.BONUS_TIP}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRecommendations;
