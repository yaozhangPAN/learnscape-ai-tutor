
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseUpload } from '@/hooks/useS3Upload';  // 使用新的上传钩子

export const VideoUploadStatus: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploadCount, setUploadCount] = useState(0);
  const { uploadToSupabase, isUploading } = useSupabaseUpload();

  useEffect(() => {
    const fetchUploadCount = async () => {
      if (!user) return;
      
      const { count } = await supabase
        .from('video_files')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId)
        .eq('uploaded_by', user.id);
        
      setUploadCount(count || 0);
    };

    fetchUploadCount();
  }, [courseId, user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        const fileUrl = await uploadToSupabase(file, courseId);
        
        // 存储视频文件记录到数据库
        const { error } = await supabase
          .from('video_files')
          .insert({
            course_id: courseId,
            file_name: file.name,
            file_size: file.size,
            file_url: fileUrl,
            uploaded_by: user.id
          });
        
        if (error) throw error;
        
        toast({
          title: "上传成功",
          description: `视频 ${file.name} 已上传`,
        });
        
        // 更新上传计数
        setUploadCount(prev => prev + 1);
      } catch (error) {
        console.error("上传错误:", error);
      }
    }
  };

  return (
    <div className="space-y-2">
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleFileUpload}
        disabled={isUploading}
        className="hidden" 
        id="video-upload-input"
      />
      <Button 
        onClick={() => document.getElementById('video-upload-input')?.click()} 
        variant="outline"
        disabled={isUploading}
      >
        上传视频 ({uploadCount} 个视频)
      </Button>
    </div>
  );
};

