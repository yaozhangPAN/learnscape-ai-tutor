import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import StreakComponent from "@/components/StreakComponent";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import UserRecentActivities from "@/components/UserRecentActivities";

const mainBg = "bg-[#e2fded]";
const sectionBox = "rounded-3xl bg-[#fbed96] shadow-sm p-4 md:p-6 mb-8 border border-[#4ABA79]/10";
const cardBgClasses = "bg-white shadow-sm border-0 rounded-3xl";
const textMain = "text-[#1E5B3A]";
const textAccent = "text-[#4ABA79]";
const progressColors = {
  high: "bg-[#4ABA79]",
  mid: "bg-[#f6c244]",
  low: "bg-[#e47069]"
};

const Dashboard = () => {
  const { t, lang } = useI18n();
  const { session } = useAuth();
  const { toast } = useToast();
  
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [wrongQuestionCount, setWrongQuestionCount] = useState<number>(0);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", progress: 0 },
    { name: "English", progress: 0 },
    { name: "Science", progress: 0 },
    { name: "Chinese", progress: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.DASHBOARD.GREETING.MORNING;
    if (hour < 18) return t.DASHBOARD.GREETING.AFTERNOON;
    return t.DASHBOARD.GREETING.EVENING;
  };

  const greeting = getGreeting();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const { count: questionBankCount, error: questionError } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true });
          
        if (questionError) throw questionError;
        setQuestionCount(questionBankCount || 0);
        
        const { data: userActivities, error: activitiesError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'wrong_answer')
          .limit(100);
          
        if (activitiesError) throw activitiesError;
        
        const uniqueWrongQuestions = new Set();
        userActivities?.forEach((activity) => {
          const details = activity.activity_details as any;
          if (details?.question_id) {
            uniqueWrongQuestions.add(details.question_id);
          }
        });
        setWrongQuestionCount(uniqueWrongQuestions.size);
        
        const { data: favoriteData, error: favoriteError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'favorite')
          .limit(100);
          
        if (favoriteError) throw favoriteError;
        
        const uniqueFavorites = new Set();
        favoriteData?.forEach((activity) => {
          const details = activity.activity_details as any;
          if (details?.question_id) {
            uniqueFavorites.add(details.question_id);
          }
        });
        setFavoriteCount(uniqueFavorites.size);
        
        const subjectProgress = {
          Mathematics: 0,
          English: 0,
          Science: 0,
          Chinese: 0
        };
        
        const { data: subjectActivities, error: subjectError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .in('activity_type', ['quiz_complete', 'practice_complete', 'video_watch'])
          .limit(200);
          
        if (subjectError) throw subjectError;
        
        const subjectCounts: Record<string, number> = {};
        subjectActivities?.forEach((activity) => {
          const details = activity.activity_details as any;
          const subject = details?.subject;
          if (subject && subject in subjectProgress) {
            subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
          }
        });
        
        const targetPerSubject = 20;
        Object.keys(subjectProgress).forEach(subject => {
          const count = subjectCounts[subject] || 0;
          const percentage = Math.min(100, Math.round((count / targetPerSubject) * 100));
          subjectProgress[subject as keyof typeof subjectProgress] = percentage;
        });
        
        setSubjects([
          { name: "Mathematics", progress: subjectProgress.Mathematics },
          { name: "English", progress: subjectProgress.English },
          { name: "Science", progress: subjectProgress.Science },
          { name: "Chinese", progress: subjectProgress.Chinese }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error loading dashboard data",
          description: "Please refresh the page to try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [session?.user.id, toast, t]);

  const modules = [
    {
      title: t.DASHBOARD.MODULES.QUESTION_BANK,
      description: t.DASHBOARD.MODULES.QUESTION_BANK_DESC,
      icon: <Book className="h-6 w-6 text-white" />,
      count: questionCount,
      color: "bg-[#009688] text-white",
      isLoading
    },
    {
      title: t.DASHBOARD.MODULES.WRONG_QUESTIONS,
      description: t.DASHBOARD.MODULES.WRONG_QUESTIONS_DESC,
      icon: <BookX className="h-6 w-6 text-white" />,
      count: wrongQuestionCount,
      color: "bg-[#FF7043] text-white",
      isLoading
    },
    {
      title: t.DASHBOARD.MODULES.FAVORITES,
      description: t.DASHBOARD.MODULES.FAVORITES_DESC,
      icon: <Star className="h-6 w-6 text-white" />,
      count: favoriteCount,
      color: "bg-[#B39DDB] text-white",
      isLoading
    },
  ];

  return (
    <div className={`${mainBg} min-h-screen`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-[#4ABA79] mb-1 tracking-tight">
            {greeting}, <span className="text-[#1E5B3A]">{lang === "zh" ? "同学" : "Student"}</span>
          </h1>
          <p className="text-lg text-[#69c49a] font-semibold">
            {t.DASHBOARD.OVERVIEW}
          </p>
        </div>

        <div className={sectionBox}>
          <StreakComponent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module, index) => (
            <div key={index} className={`rounded-3xl ${module.color} p-6 shadow-sm flex flex-col items-center`}>
              <div className="mb-2">{module.icon}</div>
              <h2 className="text-xl font-bold mb-1 text-white">{module.title}</h2>
              <div className="text-white/90 text-sm font-medium mb-2">{module.description}</div>
              <div className="text-3xl font-extrabold text-white mb-0">
                {module.isLoading ? (
                  <div className="w-16 h-8 bg-white/20 rounded animate-pulse"></div>
                ) : (
                  module.count
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={cardBgClasses}>
            <CardHeader className="rounded-t-3xl bg-[#e5deff] p-6 border-b border-[#ededfa]">
              <CardTitle className={`text-lg font-bold ${textMain}`}>{t.DASHBOARD.LEARNING_PROGRESS}</CardTitle>
              <CardDescription className="text-[#4ABA79] font-medium">
                {t.DASHBOARD.PERFORMANCE}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 py-4">
                {subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-[#4ABA79]">
                      <span>{subject.name}</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="h-3 bg-[#fbed96] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          subject.progress > 65 
                            ? progressColors.high
                            : subject.progress > 40 
                              ? progressColors.mid
                              : progressColors.low
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
          <UserRecentActivities />
        </div>

        <div className="text-center mb-8">
          <Button asChild className="btn-primary bg-[#4ABA79] hover:bg-[#38895a] shadow text-lg font-bold px-8 py-4 rounded-full border-0">
            <Link to="/question-bank" className="flex items-center justify-center gap-2">
              <Search className="mr-2 h-5 w-5" />
              {t.DASHBOARD.EXPLORE_QB}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
