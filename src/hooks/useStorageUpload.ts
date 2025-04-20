
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface UseStorageUploadOptions {
  onProgress?: (progress: number) => void;
  maxFileSize?: number;
}

export const useStorageUpload = ({ onProgress, maxFileSize }: UseStorageUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadToStorage = async (file: File, courseId: string): Promise<string> => {
    try {
      if (maxFileSize && file.size > maxFileSize) {
        throw new Error(`File size exceeds the maximum allowed size of ${maxFileSize} bytes`);
      }
      
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}-${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log(`Starting upload for file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      
      const { data, error } = await supabase.storage
        .from('course-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100;
            onProgress?.(percentage);
          },
        });

      if (error) throw error;
      
      if (!data?.path) {
        throw new Error('Upload successful but file path is missing');
      }

      const { data: { publicUrl } } = supabase.storage
        .from('course-videos')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error("Storage Upload Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred during file upload",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadToStorage,
    isUploading
  };
};
