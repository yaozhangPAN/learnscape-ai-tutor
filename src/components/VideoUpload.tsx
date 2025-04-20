
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';

// Set file size limit for admin users (5GB)
const ADMIN_MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
// Set file size limit for pro users (2GB)
const PRO_MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
// Supabase has a 50MB limit for free tier
const SUPABASE_FREE_LIMIT = 50 * 1024 * 1024; // 50MB

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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      const fileSizeFormatted = formatFileSize(selectedFile.size);
      setFileSize(fileSizeFormatted);
      
      // Determine max file size based on user type
      const maxFileSize = user?.email === 'admin@example.com' 
        ? ADMIN_MAX_FILE_SIZE 
        : (isPremium ? PRO_MAX_FILE_SIZE : SUPABASE_FREE_LIMIT);
      
      const isValid = selectedFile.size <= maxFileSize;
      setIsValidSize(isValid);
      
      // Warn about Supabase limits
      if (selectedFile.size > SUPABASE_FREE_LIMIT) {
        toast({
          title: "Warning: Large File",
          description: `This file (${fileSizeFormatted}) may exceed Supabase's free tier limit of ${formatFileSize(SUPABASE_FREE_LIMIT)}.`,
          variant: "default"
        });
      }
      
      if (!isValid) {
        toast({
          title: "File too large",
          description: `Maximum allowed size is ${formatFileSize(maxFileSize)}. Your file is ${fileSizeFormatted}.`,
          variant: "destructive"
        });
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a video file first",
        variant: "destructive"
      });
      return;
    }

    // Determine max file size based on user type
    const maxFileSize = user?.email === 'admin@example.com' 
      ? ADMIN_MAX_FILE_SIZE 
      : (isPremium ? PRO_MAX_FILE_SIZE : SUPABASE_FREE_LIMIT);

    if (!isValidSize) {
      toast({
        title: "Error",
        description: `File is too large. Maximum allowed size is ${formatFileSize(maxFileSize)}.`,
        variant: "destructive"
      });
      return;
    }

    // Confirm large file uploads
    if (file.size > SUPABASE_FREE_LIMIT) {
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}-${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Start simulating progress
      const stopProgress = simulateProgress();

      const { error: uploadError } = await supabase.storage
        .from('course-videos')
        .upload(filePath, file);

      // Stop simulating progress
      stopProgress();
      setUploadProgress(100);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('course-videos').getPublicUrl(filePath);

      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });

      onUploadSuccess && onUploadSuccess(data.publicUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      let description = errorMessage;
      
      if (errorMessage.includes("Payload too large")) {
        description = `The file is too large for Supabase storage. Maximum file size for Supabase free tier is ${formatFileSize(SUPABASE_FREE_LIMIT)}. Please upgrade your Supabase plan or use a smaller file.`;
      }
      
      toast({
        title: "Upload Error",
        description,
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
        <div className="text-sm">
          <p className={!isValidSize ? "text-red-500" : "text-gray-500"}>
            File size: {fileSize} {!isValidSize && " (exceeds maximum size)"}
          </p>
          <p className="text-gray-500">
            Max allowed: {formatFileSize(user?.email === 'admin@example.com' 
              ? ADMIN_MAX_FILE_SIZE 
              : (isPremium ? PRO_MAX_FILE_SIZE : SUPABASE_FREE_LIMIT))}
          </p>
          <p className="text-amber-500">
            Supabase free tier limit: {formatFileSize(SUPABASE_FREE_LIMIT)}
          </p>
        </div>
      )}
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-gray-500 text-center">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};
