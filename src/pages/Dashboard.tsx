import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, BookX, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import StreakComponent from "@/components/StreakComponent";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import UserRecentActivities from "@/components/UserRecentActivities";
import { Json } from "@/integrations/supabase/types";
import LearningProgress from "@/components/dashboard/LearningProgress";
import ActivityModules from "@/components/dashboard/ActivityModules";

const mainBg = "bg-[#e2fded]";
const sectionBox = "rounded-3xl bg-[#fbed96] shadow-sm p-4 md:p-6 mb-8 border border-[#4ABA79]/10";

interface ActivityDetails {
  question_id?: string;
  is_correct?: boolean;
  is_favorite?: boolean;
}

interface ActivityData {
  details: Json;
}

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
        const { data: practiceActivities, error: practiceError } = await supabase
          .from('user_activities_tracking')
          .select('details')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'question_practice');
          
        if (practiceError) throw practiceError;
        
        const uniqueQuestions = new Set<string>();
        (practiceActivities || []).forEach((activity: ActivityData) => {
          const details = activity.details as unknown as ActivityDetails;
          const questionId = details?.question_id;
          if (questionId) {
            uniqueQuestions.add(questionId);
          }
        });
        setQuestionCount(uniqueQuestions.size);
        
        const { data: wrongAnswers, error: wrongError } = await supabase
          .from('user_activities_tracking')
          .select('details')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'question_practice')
          .eq('details->is_correct', false);
          
        if (wrongError) throw wrongError;
        
        const uniqueWrongQuestions = new Set<string>();
        (wrongAnswers || []).forEach((activity: ActivityData) => {
          const details = activity.details as unknown as ActivityDetails;
          const questionId = details?.question_id;
          if (questionId) {
            uniqueWrongQuestions.add(questionId);
          }
        });
        setWrongQuestionCount(uniqueWrongQuestions.size);
        
        const { data: favoriteData, error: favoriteError } = await supabase
          .from('user_activities_tracking')
          .select('details')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'question_practice')
          .eq('details->is_favorite', true);
          
        if (favoriteError) throw favoriteError;
        
        const uniqueFavorites = new Set<string>();
        (favoriteData || []).forEach((activity: ActivityData) => {
          const details = activity.details as unknown as ActivityDetails;
          const questionId = details?.question_id;
          if (questionId) {
            uniqueFavorites.add(questionId);
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
      isLoading,
      link: "/question-bank"
    },
    {
      title: t.DASHBOARD.MODULES.WRONG_QUESTIONS,
      description: t.DASHBOARD.MODULES.WRONG_QUESTIONS_DESC,
      icon: <BookX className="h-6 w-6 text-white" />,
      count: wrongQuestionCount,
      color: "bg-[#FF7043] text-white",
      isLoading,
      link: "/wrong-questions"
    },
    {
      title: t.DASHBOARD.MODULES.FAVORITES,
      description: t.DASHBOARD.MODULES.FAVORITES_DESC,
      icon: <Star className="h-6 w-6 text-white" />,
      count: favoriteCount,
      color: "bg-[#B39DDB] text-white",
      isLoading,
      link: "/favorites"
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

        <ActivityModules modules={modules} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LearningProgress subjects={subjects} />
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
