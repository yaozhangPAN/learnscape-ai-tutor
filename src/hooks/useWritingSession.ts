
import { useState } from 'react';
import { useSupabase } from './useSupabase';
import { useToast } from './use-toast';

export const useWritingSession = () => {
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createWritingSession = async (
    imageFile: File,
    formData: {
      title: string;
      essay_type: string;
      grade: string;
      word_count?: number;
      instructions?: string;
    }
  ) => {
    try {
      setIsLoading(true);

      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `writing-images/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('writing-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Create image record
      const imageUrl = `${supabase.storageUrl}/object/public/writing-images/${fileName}`;
      
      const { data: imageData, error: imageError } = await supabase
        .from('images')
        .insert({
          url: imageUrl,
          title: formData.title,
        })
        .select('id')
        .single();

      if (imageError) throw imageError;

      // 3. Create writing session
      const { data: sessionData, error: sessionError } = await supabase
        .from('writing_sessions')
        .insert({
          title: formData.title,
          essay_type: formData.essay_type,
          grade: formData.grade,
          word_count: formData.word_count,
          instructions: formData.instructions,
          image_id: imageData.id,
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
