
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { supabase } from '@/integrations/supabase/client';
import { formatFileSize } from '@/utils/fileUtils';

interface UseVideoUploadOptions {
  courseId: string;
  maxAllowedSize: number;
  onUploadSuccess?: (fileUrl: string) => void;
}

export const useVideoUpload = ({ courseId, maxAllowedSize, onUploadSuccess }: UseVideoUploadOptions) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState<string>('');
  const [isValidSize, setIsValidSize] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { uploadToStorage } = useStorageUpload({
    onProgress: setUploadProgress,
    maxFileSize: maxAllowedSize
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileSizeFormatted = formatFileSize(selectedFile.size);
      setFileSize(fileSizeFormatted);
      setError(null);
      
      const isValid = selectedFile.size <= maxAllowedSize;
      setIsValidSize(isValid);
      
      if (!isValid) {
        toast({
          title: "文件过大",
          description: `最大允许大小为 ${formatFileSize(maxAllowedSize)}. 您的文件为 ${fileSizeFormatted}.`,
          variant: "destructive"
        });
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async (userId: string) => {
    if (!file) {
      toast({
        title: "错误",
        description: "请选择视频文件并确保您已登录",
        variant: "destructive"
      });
      return false;
    }

    if (!isValidSize) {
      toast({
        title: "错误",
        description: `文件过大。最大允许大小为 ${formatFileSize(maxAllowedSize)}。`,
        variant: "destructive"
      });
      return false;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      console.log(`Starting upload for file: ${file.name} (${formatFileSize(file.size)}) to course: ${courseId}`);
      
      // The bucket check is now handled in the uploadToStorage function
      const fileUrl = await uploadToStorage(file, courseId);
      console.log("File uploaded successfully. URL:", fileUrl);

      const { error: insertError } = await supabase
        .from('video_files')
        .insert({
          course_id: courseId,
          file_url: fileUrl,
          file_name: file.name,
          file_size: file.size,
          uploaded_by: userId
        });

      if (insertError) {
        console.error("Database insert error:", insertError);
        throw insertError;
      }

      toast({
        title: "成功",
        description: "视频已成功上传并关联到课程",
        variant: "success",
      });

      onUploadSuccess && onUploadSuccess(fileUrl);
      
      setFile(null);
      return true;
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "发生未知错误";
      
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      
      toast({
        title: "上传错误",
        description: errorMessage,
        variant: "destructive"
      });
      
      setUploadProgress(0);
      return false;
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    fileSize,
    isValidSize,
    uploading,
    uploadProgress,
    error,
    handleFileChange,
    handleUpload
  };
};
