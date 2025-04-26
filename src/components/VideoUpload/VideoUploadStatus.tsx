
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Loader } from 'lucide-react';
import { useSupabaseUpload } from '@/hooks/useS3Upload';

export const VideoUploadStatus: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadToSupabase, isUploading } = useSupabaseUpload({
    onProgress: (progress) => {
      setUploadProgress(progress);
    },
    maxFileSize: 2 * 1024 * 1024 * 1024 // 2GB in bytes
  });

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
        setUploadProgress(0);
      } catch (error) {
        console.error("上传错误:", error);
        toast({
          title: "上传失败",
          description: error instanceof Error ? error.message : "发生未知错误",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
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
        className="w-full"
      >
        {isUploading ? (
          <span className="flex items-center gap-2">
            <Loader className="animate-spin" />
            正在上传...
          </span>
        ) : (
          `上传视频 (${uploadCount} 个视频)`
        )}
      </Button>
      
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">
            {uploadProgress.toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
};
