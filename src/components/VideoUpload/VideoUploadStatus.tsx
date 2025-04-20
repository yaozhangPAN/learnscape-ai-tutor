
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const VideoUploadStatus: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const checkUploadStatus = async () => {
    if (!user) {
      toast({
        title: "未登录",
        description: "请先登录",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('video_files')
        .select('*')
        .eq('course_id', courseId)
        .eq('uploaded_by', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const latestUpload = data[0];
        toast({
          title: "上传状态",
          description: `最近上传的视频: ${latestUpload.file_name}, 大小: ${(latestUpload.file_size / 1024 / 1024).toFixed(2)} MB`,
          variant: "default"
        });
      } else {
        toast({
          title: "暂无上传记录",
          description: "没有找到该课程的视频上传记录",
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "查询错误",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive"
      });
    }
  };

  return (
    <Button onClick={checkUploadStatus} variant="outline">
      检查上传状态
    </Button>
  );
};
