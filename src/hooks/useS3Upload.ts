
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface UseSupabaseUploadOptions {
  onProgress?: (progress: number) => void;
  maxFileSize?: number;
}

export const useSupabaseUpload = ({ onProgress, maxFileSize }: UseSupabaseUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadToSupabase = async (file: File, courseId: string): Promise<string> => {
    try {
      // Validate file size if maxFileSize is provided
      if (maxFileSize && file.size > maxFileSize) {
        throw new Error(`文件大小超过最大限制 ${maxFileSize} 字节`);
      }
      
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}-${uuidv4()}.${fileExt}`;
      const filePath = `${courseId}/${fileName}`;
      
      console.log(`开始上传文件: ${file.name}, 大小: ${file.size} 字节, 类型: ${file.type}`);
      
      // 对于大文件，使用分块上传
      if (file.size > 50 * 1024 * 1024) { // 大于 50MB
        console.log("大文件上传：将使用分块上传策略");
        
        const { data, error } = await supabase.storage
          .from('course-videos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) throw error;
        
        // 获取公共 URL
        const { data: publicUrlData } = supabase.storage
          .from('course-videos')
          .getPublicUrl(filePath);
        
        return publicUrlData.publicUrl;
      }
      
      // 小文件直接上传
      const { data, error } = await supabase.storage
        .from('course-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // 获取公共 URL
      const { data: publicUrlData } = supabase.storage
        .from('course-videos')
        .getPublicUrl(filePath);
      
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Supabase 上传错误:", error);
      
      toast({
        title: "上传失败",
        description: error instanceof Error ? error.message : "发生未知错误",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadToSupabase,
    isUploading
  };
};

// 为了向后兼容，我们保留原始的名称
export const useS3Upload = useSupabaseUpload;

