
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
        throw new Error("User not authenticated");
      }

      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `writing-images/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('writing-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Create image record
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

      if (imageError) throw imageError;

      // 3. Create writing session
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

      if (sessionError) throw sessionError;

      return { sessionId: sessionData.id };
    } catch (error) {
      console.error('Error creating writing session:', error);
      toast({
        variant: "destructive",
        title: "创建写作练习失败",
        description: error.message,
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
