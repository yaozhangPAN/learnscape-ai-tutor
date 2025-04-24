
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
import { Json } from "@/integrations/supabase/types";

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

// Define types for activity details
interface ActivityDetails {
  question_id?: string;
  subject?: string;
  score?: string | number;
  correct?: number;
  total?: number;
  title?: string;
}

// Interface to match Supabase's user activity structure
interface UserActivity {
  id: string;
  activity_type: string;
  activity_details: Json;
  created_at: string;
  user_id: string;
}

interface RecentActivity {
  id: string;
  activity: string;
  date: string;
  score: string;
}

const Dashboard = () => {
  const { t, lang } = useI18n();
  const { session } = useAuth();
  const { toast } = useToast();
  
  // Add state for dashboard data
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [wrongQuestionCount, setWrongQuestionCount] = useState<number>(0);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
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
        // Fetch question bank count
        const { count: questionBankCount, error: questionError } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true });
          
        if (questionError) throw questionError;
        setQuestionCount(questionBankCount || 0);
        
        // Fetch user activity statistics
        const { data: userActivities, error: activitiesError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'wrong_answer')
          .limit(100);
          
        if (activitiesError) throw activitiesError;
        
        // Count unique questions answered incorrectly
        const uniqueWrongQuestions = new Set();
        userActivities?.forEach((activity: UserActivity) => {
          // Safely access question_id using type assertion
          const details = activity.activity_details as unknown as ActivityDetails;
          if (details?.question_id) {
            uniqueWrongQuestions.add(details.question_id);
          }
        });
        setWrongQuestionCount(uniqueWrongQuestions.size);
        
        // Fetch favorite questions
        const { data: favoriteData, error: favoriteError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('activity_type', 'favorite')
          .limit(100);
          
        if (favoriteError) throw favoriteError;
        
        // Count unique favorite questions
        const uniqueFavorites = new Set();
        favoriteData?.forEach((activity: UserActivity) => {
          // Safely access question_id using type assertion
          const details = activity.activity_details as unknown as ActivityDetails;
          if (details?.question_id) {
            uniqueFavorites.add(details.question_id);
          }
        });
        setFavoriteCount(uniqueFavorites.size);
        
        // Get recent activities
        const { data: recentData, error: recentError } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (recentError) throw recentError;
        
        if (recentData && recentData.length > 0) {
          const formattedActivities = recentData.map((activity: UserActivity) => {
            const createdAt = new Date(activity.created_at);
            const now = new Date();
            const diffHours = Math.round((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
            
            let dateText;
            if (diffHours < 1) {
              dateText = "Just now";
            } else if (diffHours < 24) {
              dateText = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else if (diffHours < 48) {
              dateText = "Yesterday";
            } else {
              dateText = `${Math.floor(diffHours / 24)} days ago`;
            }
            
            let activityText = "Unknown activity";
            let score = "N/A";
            
            // Safely access activity_details properties using type assertion
            const details = activity.activity_details as unknown as ActivityDetails;
            
            switch(activity.activity_type) {
              case 'quiz_complete':
                activityText = `Completed ${details?.subject || ''} quiz`;
                score = details?.score?.toString() || "Complete";
                break;
              case 'practice_complete':
                activityText = `Completed ${details?.subject || ''} practice`;
                score = details?.correct !== undefined && details?.total !== undefined
                  ? `${details.correct}/${details.total}` 
                  : "Complete";
                break;
              case 'video_watch':
                activityText = `Watched ${details?.title || ''} video`;
                score = "Complete";
                break;
              case 'exam_start':
                activityText = `Started ${details?.subject || ''} exam`;
                score = "In progress";
                break;
              default:
                activityText = `${activity.activity_type.replace('_', ' ')}`;
            }
            
            return {
              id: activity.id,
              activity: activityText,
              date: dateText,
              score: score
            };
          });
          
          setRecentActivities(formattedActivities);
        } else {
          setRecentActivities([
            { id: "1", activity: "No recent activities", date: "", score: "" }
          ]);
        }
        
        // Calculate subject progress based on completed activities
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
        
        // Count activities by subject
        const subjectCounts: Record<string, number> = {};
        subjectActivities?.forEach((activity: UserActivity) => {
          // Safely access subject using type assertion
          const details = activity.activity_details as unknown as ActivityDetails;
          const subject = details?.subject;
          if (subject && subject in subjectProgress) {
            subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
          }
        });
        
        // Calculate percentages (assuming 100 is the target number of activities)
        const targetPerSubject = 20; // Arbitrary number for progress calculation
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

  useEffect(() => {
    const trackPageVisit = async () => {
      if (session?.user.id) {
        try {
          // Record page visit
          await supabase
            .from('user_activities')
            .insert({
              user_id: session.user.id,
              activity_type: 'page_visit',
              activity_details: { page: 'dashboard' }
            });

          // Update or create daily streak
          const { error: streakError } = await supabase
            .from('daily_streaks')
            .upsert({
              user_id: session.user.id,
              streak_date: new Date().toISOString().split('T')[0]
            }, { 
              onConflict: 'user_id,streak_date'
            });

          if (streakError) {
            console.error('Error updating streak:', streakError);
          }
        } catch (error) {
          console.error('Error tracking activity:', error);
        }
      }
    };

    trackPageVisit();
  }, [session?.user.id]);

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

        <div className="mb-8">
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
        </div>

        <div className="mb-8">
          <div className={cardBgClasses}>
            <CardHeader className="bg-[#fbed96] p-6 rounded-t-3xl border-b border-[#faedca]">
              <CardTitle className={`text-lg font-bold ${textAccent}`}>{t.DASHBOARD.RECENT_ACTIVITIES}</CardTitle>
              <CardDescription className="text-[#e2a44a] font-medium">
                {t.DASHBOARD.LEARNING_JOURNEY}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#faedca] bg-white rounded-b-3xl">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="py-4 flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-5 w-48 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                      </div>
                      <div className="h-8 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  ))
                ) : recentActivities.length === 0 ? (
                  <div className="py-8 text-center text-[#4ABA79]">
                    No recent activities found
                  </div>
                ) : (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="py-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-[#4ABA79]">{activity.activity}</h4>
                        <p className="text-xs text-[#b197d7]">{activity.date}</p>
                      </div>
                      <div>
                        <span className={`px-4 py-1 rounded-full text-md font-semibold shadow 
                          ${
                            activity.score === "In progress" 
                              ? "bg-[#e5deff] text-[#6a42b2]"
                              : activity.score === "Complete" 
                                ? "bg-[#d2f6e6] text-[#1e5b3a]"
                                : "bg-[#faedca] text-[#f6c244]"
                          }`
                        }>
                          {activity.score}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </div>
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
