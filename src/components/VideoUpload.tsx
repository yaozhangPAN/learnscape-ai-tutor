
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useS3Upload } from '@/hooks/useS3Upload';
import { UploadProgress } from './VideoUpload/UploadProgress';
import { FileInfo } from './VideoUpload/FileInfo';
import { formatFileSize, getMaxFileSize, SUPABASE_FREE_LIMIT, ADMIN_MAX_FILE_SIZE } from '@/utils/fileUtils';
import { supabase } from '@/integrations/supabase/client';

interface VideoUploadProps {
  courseId: string;
  onUploadSuccess?: (fileUrl: string) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ courseId, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState<string>('');
  const [isValidSize, setIsValidSize] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxAllowedSize, setMaxAllowedSize] = useState(SUPABASE_FREE_LIMIT);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      setIsAdmin(user.email === 'admin@example.com');
      const calculatedMaxSize = getMaxFileSize(user.email === 'admin@example.com', isPremium);
      setMaxAllowedSize(calculatedMaxSize);
    };
    
    checkAdminStatus();
  }, [user, isPremium]);
  
  // Initialize S3 upload hook with the correct max file size
  const { uploadToS3, isUploading } = useS3Upload({
    onProgress: setUploadProgress,
    maxFileSize: maxAllowedSize
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileSizeFormatted = formatFileSize(selectedFile.size);
      setFileSize(fileSizeFormatted);
      
      const isValid = selectedFile.size <= maxAllowedSize;
      setIsValidSize(isValid);
      
      if (selectedFile.size > SUPABASE_FREE_LIMIT && !isAdmin) {
        toast({
          title: "Warning: Large File",
          description: `This file (${fileSizeFormatted}) may exceed Supabase's free tier limit of ${formatFileSize(SUPABASE_FREE_LIMIT)}.`,
          variant: "default"
        });
      }
      
      if (!isValid) {
        toast({
          title: "File too large",
          description: `Maximum allowed size is ${formatFileSize(maxAllowedSize)}. Your file is ${fileSizeFormatted}.`,
          variant: "destructive"
        });
      }
      
      setFile(selectedFile);
    }
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 95) {
        clearInterval(interval);
      }
      setUploadProgress(progress);
    }, 300);
    
    return () => clearInterval(interval);
  };

  const handleUpload = async () => {
    if (!file || !user) {
      toast({
        title: "Error",
        description: "Please select a video file and ensure you're logged in",
        variant: "destructive"
      });
      return;
    }

    if (!isValidSize) {
      toast({
        title: "Error",
        description: `File is too large. Maximum allowed size is ${formatFileSize(maxAllowedSize)}.`,
        variant: "destructive"
      });
      return;
    }

    if (file.size > SUPABASE_FREE_LIMIT && !isAdmin) {
      const proceedAnyway = window.confirm(
        `This file (${formatFileSize(file.size)}) exceeds Supabase's free tier limit of ${formatFileSize(SUPABASE_FREE_LIMIT)}. 
        The upload may fail unless you have a paid Supabase plan. Do you want to proceed anyway?`
      );
      
      if (!proceedAnyway) {
        return;
      }
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const stopProgress = simulateProgress();
      
      console.log("Uploading file with size:", file.size, "Max allowed size:", maxAllowedSize);
      
      const fileUrl = await uploadToS3(file, courseId);
      stopProgress();
      setUploadProgress(100);

      const { error: insertError } = await supabase
        .from('video_files')
        .insert({
          course_id: courseId,
          file_url: fileUrl,
          file_name: file.name,
          file_size: file.size,
          uploaded_by: user.id
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });

      onUploadSuccess && onUploadSuccess(fileUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploading || !isValidSize}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </div>
      
      {file && (
        <FileInfo
          fileSize={fileSize}
          isValidSize={isValidSize}
          maxAllowedSize={maxAllowedSize}
        />
      )}
      
      {uploading && <UploadProgress progress={uploadProgress} />}
      
      {isAdmin && (
        <div className="mt-2 p-2 bg-blue-50 text-sm rounded border border-blue-200">
          <p className="font-medium text-blue-800">管理员模式</p>
          <p className="text-blue-600">您可以上传最大 {formatFileSize(ADMIN_MAX_FILE_SIZE)} 的视频文件</p>
        </div>
      )}
    </div>
  );
};
