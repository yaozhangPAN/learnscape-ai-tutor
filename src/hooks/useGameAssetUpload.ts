
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const useGameAssetUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadGameAsset = async (file: File) => {
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vocabulary-game')
        .upload(filePath, file);

      if (uploadError) {
        setUploadError(uploadError.message);
        return null;
      }

      const { data } = supabase.storage
        .from('vocabulary-game')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      setUploadError(String(error));
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadGameAsset, isUploading, uploadError };
};
