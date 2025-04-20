
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { FileInfo } from './VideoUpload/FileInfo';
import { UploadProgress } from './VideoUpload/UploadProgress';
import { AdminAlert } from './VideoUpload/AdminAlert';
import { getMaxFileSize, SUPABASE_FREE_LIMIT } from '@/utils/fileUtils';

interface VideoUploadProps {
  courseId: string;
  onUploadSuccess?: (fileUrl: string) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ courseId, onUploadSuccess }) => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxAllowedSize, setMaxAllowedSize] = useState(SUPABASE_FREE_LIMIT);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      setIsAdmin(user.email === 'admin@example.com');
      const calculatedMaxSize = getMaxFileSize(user.email === 'admin@example.com', isPremium);
      setMaxAllowedSize(calculatedMaxSize);
    };
    
    checkAdminStatus();
  }, [user, isPremium]);

  const {
    file,
    fileSize,
    isValidSize,
    uploading,
    uploadProgress,
    error,
    handleFileChange,
    handleUpload
  } = useVideoUpload({
    courseId,
    maxAllowedSize,
    onUploadSuccess
  });

  const handleUploadClick = async () => {
    if (!user) return;
    const success = await handleUpload(user.id);
    if (success && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>上传错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isAdmin && <AdminAlert />}
      
      <div className="flex items-center space-x-2">
        <Input 
          type="file" 
          ref={fileInputRef}
          accept="video/*" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
        <Button 
          onClick={handleUploadClick} 
          disabled={!file || uploading || !isValidSize}
        >
          {uploading ? "上传中..." : "上传视频"}
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
    </div>
  );
};
