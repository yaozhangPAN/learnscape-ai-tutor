
import { useState } from 'react';
import { useSupabase } from './useSupabase';
import { useToast } from './use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useWritingSession = () => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createWritingSession = async (
    imageFile: File,
    formData: {
      title: string;
      session_type: string;
      grade_level: string;
      genre: string;
      word_limit?: number;
      prompt_text?: string;
    }
  ) => {
    try {
      setIsLoading(true);

      if (!user) {
        throw new Error("用户未登录，请先登录");
      }

      // 1. Check if bucket exists first
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error("Error checking buckets:", bucketsError);
        throw new Error("存储系统错误，无法上传图片");
      }
      
      const bucketExists = buckets.some(bucket => bucket.name === 'writing-images');
      if (!bucketExists) {
        throw new Error("图片存储空间不存在，请联系管理员");
      }

      // 2. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `writing-images/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('writing-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        throw new Error(`图片上传失败: ${uploadError.message}`);
      }

      // 3. Create image record
      const { data: publicUrlData } = supabase.storage
        .from('writing-images')
        .getPublicUrl(filePath);
      
      const imageUrl = publicUrlData.publicUrl;
      
      const { data: imageData, error: imageError } = await supabase
        .from('images')
        .insert({
          url: imageUrl,
          title: formData.title,
          uploaded_by: user.id
        })
        .select('id')
        .single();

      if (imageError) {
        console.error("Image record creation error:", imageError);
        throw new Error(`无法保存图片记录: ${imageError.message}`);
      }

      // 4. Create writing session
      const { data: sessionData, error: sessionError } = await supabase
        .from('writing_sessions')
        .insert({
          title: formData.title,
          session_type: formData.session_type,
          grade_level: formData.grade_level,
          genre: formData.genre,
          word_limit: formData.word_limit,
          prompt_text: formData.prompt_text,
          image_id: imageData.id,
          user_id: user.id
        })
        .select('id')
        .single();

      if (sessionError) {
        console.error("Writing session creation error:", sessionError);
        throw new Error(`创建写作会话失败: ${sessionError.message}`);
      }

      toast({
        title: "创建成功",
        description: "写作练习已准备就绪",
        variant: "success",
      });
      
      return { sessionId: sessionData.id };
    } catch (error: any) {
      console.error('Error creating writing session:', error);
      toast({
        variant: "destructive",
        title: "创建写作练习失败",
        description: error.message || "发生未知错误，请稍后重试",
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWritingSession,
    isLoading,
  };
};
