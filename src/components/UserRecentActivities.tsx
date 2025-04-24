
import { useEffect, useState } from "react";
import { CalendarCheck2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/contexts/I18nContext";

type ActivityItem = {
  id: string;
  activity_type: string;
  created_at: string;
  details: any;
};

const activityTypeLabels = {
  video_watch: "观看了视频课程",
  question_practice: "练习了题库题目",
  homework_complete: "完成了课后作业",
  mock_exam: "参加了模拟考试",
  ai_tutor_use: "使用了AI辅导服务",
  quiz_complete: "完成了测验"
};

const UserRecentActivities = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!session?.user.id) return;

      try {
        const { data, error } = await supabase
          .from('user_activities_tracking')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentActivities();
  }, [session?.user.id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <Card className="bg-white shadow-sm border-0 rounded-3xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-[#4ABA79]" />
          <h3 className="text-lg font-bold text-[#1E5B3A]">最近动态</h3>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <CalendarCheck2 className="h-5 w-5 mt-0.5 text-[#4ABA79]" />
                <div>
                  <p className="text-sm text-[#1E5B3A]">
                    {activityTypeLabels[activity.activity_type as keyof typeof activityTypeLabels]}
                  </p>
                  <p className="text-xs text-[#4ABA79]">
                    {formatDate(activity.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">暂无动态</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRecentActivities;
