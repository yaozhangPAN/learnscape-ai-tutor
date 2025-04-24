
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

export const trackActivity = async (
  activityType: Tables<"user_activities_tracking">["activity_type"], 
  details?: Record<string, unknown>
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_activities_tracking')
      .insert({
        user_id: user.id,
        activity_type: activityType,
        details: details as Json
      });

    if (error) console.error('Activity tracking error:', error);
    
    return data;
  } catch (error) {
    console.error('Unexpected activity tracking error:', error);
    return null;
  }
};

// 示例使用方法
export const trackQuestionPractice = (questionId: string, isCorrect: boolean) => 
  trackActivity('question_practice', { 
    question_id: questionId, 
    is_correct: isCorrect 
  });
