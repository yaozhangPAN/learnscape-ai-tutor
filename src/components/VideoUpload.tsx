import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { UploadProgress } from './VideoUpload/UploadProgress';
import { FileInfo } from './VideoUpload/FileInfo';
import { formatFileSize, getMaxFileSize, SUPABASE_FREE_LIMIT, ADMIN_MAX_FILE_SIZE } from '@/utils/fileUtils';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxAllowedSize, setMaxAllowedSize] = useState(SUPABASE_FREE_LIMIT);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      setIsAdmin(user.email === 'admin@example.com');
      const calculatedMaxSize = getMaxFileSize(user.email === 'admin@example.com', isPremium);
      setMaxAllowedSize(calculatedMaxSize);
    };
    
    checkAdminStatus();
  }, [user, isPremium]);
  
  const { uploadToStorage, isUploading } = useStorageUpload({
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
      
      if (selectedFile.size > SUPABASE_FREE_LIMIT && !isAdmin) {
        toast({
          title: "警告: 大文件",
          description: `此文件 (${fileSizeFormatted}) 可能超过 Supabase 的免费试用版限制 ${formatFileSize(SUPABASE_FREE_LIMIT)}.`,
          variant: "default"
        });
      }
      
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

  const handleUpload = async () => {
    if (!file || !user) {
      toast({
        title: "错误",
        description: "请选择视频文件并确保您已登录",
        variant: "destructive"
      });
      return;
    }

    if (!isValidSize) {
      toast({
        title: "错误",
        description: `文件过大。最大允许大小为 ${formatFileSize(maxAllowedSize)}。`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      const fileUrl = await uploadToStorage(file, courseId);

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
        title: "成功",
        description: "视频已成功上传并关联到课程",
      });

      onUploadSuccess && onUploadSuccess(fileUrl);
      
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "发生未知错误";
      setError(errorMessage);
      
      toast({
        title: "上传错误",
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
      {error && (
        <Alert variant="destructive">
          <AlertTitle>上传错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isAdmin && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Demo 环境</AlertTitle>
          <AlertDescription>
            在此演示环境中，非常大的文件上传（>100MB）将被模拟，而不实际传输数据。
            在生产环境中，为大文件使用预签名 URL 或分片上传。
          </AlertDescription>
        </Alert>
      )}
      
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
      
      {isAdmin && (
        <div className="mt-2 p-2 bg-blue-50 text-sm rounded border border-blue-200">
          <p className="font-medium text-blue-800">管理员模式</p>
          <p className="text-blue-600">您可以上传最大 {formatFileSize(ADMIN_MAX_FILE_SIZE)} 的视频文件</p>
        </div>
      )}
    </div>
  );
};
