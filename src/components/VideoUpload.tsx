
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
import { useStorageUpload } from '@/hooks/useStorageUpload';

interface VideoUploadProps {
  courseId: string;
  onUploadSuccess?: (fileUrl: string) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ courseId, onUploadSuccess }) => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxAllowedSize, setMaxAllowedSize] = useState(SUPABASE_FREE_LIMIT);
  const [checkingBucket, setCheckingBucket] = useState(false);
  const [bucketStatus, setBucketStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { checkAndCreateBucket } = useStorageUpload();
  
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
    if (!user) {
      console.error("Cannot upload: User not logged in");
      return;
    }
    console.log(`Starting upload for course: ${courseId}`);
    const success = await handleUpload(user.id);
    if (success && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const checkBucketAccess = async () => {
    setCheckingBucket(true);
    setBucketStatus("正在检查存储桶权限...");
    try {
      const bucketName = 'course-videos';
      const success = await checkAndCreateBucket(bucketName);
      setBucketStatus(success ? 
        `存储桶 '${bucketName}' 验证成功！您有权限访问和上传文件。` : 
        `存储桶 '${bucketName}' 权限检查失败。请确保该存储桶已在 Supabase 中创建并设置了正确的访问策略。`);
    } catch (error) {
      console.error("Error checking bucket:", error);
      setBucketStatus("检查存储桶时出错: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setCheckingBucket(false);
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
      
      {isAdmin && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">存储桶诊断工具</h3>
          <p className="text-xs text-blue-600 mb-3">
            此工具检查您是否有权限访问用于视频存储的 'course-videos' 存储桶。
          </p>
          <Button 
            onClick={checkBucketAccess}
            size="sm"
            variant="outline"
            disabled={checkingBucket}
            className="mb-2"
          >
            {checkingBucket ? "检查中..." : "检查存储桶权限"}
          </Button>
          
          {bucketStatus && (
            <div className={`mt-2 text-sm p-3 rounded border ${
              bucketStatus.includes('成功') ? 'bg-green-50 border-green-200 text-green-700' : 
              'bg-white border-gray-200 text-gray-700'
            }`}>
              {bucketStatus}
            </div>
          )}
        </div>
      )}
      
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
