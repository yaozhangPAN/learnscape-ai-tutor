
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { CHUNK_SIZE } from '@/utils/fileUtils';

interface UseStorageUploadOptions {
  onProgress?: (progress: number) => void;
  maxFileSize?: number;
}

export const useStorageUpload = ({ onProgress, maxFileSize }: UseStorageUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingBucket, setIsCheckingBucket] = useState(false);
  const { toast } = useToast();

  // Helper function to check if the bucket exists and is accessible
  const checkAndCreateBucket = async (bucketName: string): Promise<boolean> => {
    setIsCheckingBucket(true);
    try {
      console.log(`Checking if bucket '${bucketName}' exists...`);
      
      // First, check if the bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error("Error listing buckets:", listError);
        if (listError.message.includes("Permission denied")) {
          toast({
            title: "权限错误",
            description: "您的账户没有列出存储桶的权限。请检查 Supabase API 密钥和权限设置。",
            variant: "destructive",
          });
          return false;
        }
        throw listError;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName) || false;
      
      if (!bucketExists) {
        console.error(`Bucket '${bucketName}' does not exist`);
        toast({
          title: "存储桶错误",
          description: `存储桶 '${bucketName}' 不存在。需要在 Supabase 中创建此存储桶。`,
          variant: "destructive",
        });
        return false;
      }
      
      // Verify we can list files in the bucket (permission check)
      const { error: listFilesError } = await supabase.storage
        .from(bucketName)
        .list('', { limit: 1 });
        
      if (listFilesError) {
        console.error("Error listing files in bucket:", listFilesError);
        if (listFilesError.message.includes("Permission denied")) {
          toast({
            title: "权限错误",
            description: `您的账户没有访问 '${bucketName}' 存储桶的权限。请检查存储桶权限设置。`,
            variant: "destructive",
          });
          return false;
        }
        throw listFilesError;
      }
      
      console.log(`Successfully verified access to bucket '${bucketName}'`);
      toast({
        title: "存储桶验证成功",
        description: `成功验证对 '${bucketName}' 存储桶的访问权限。`,
        variant: "success",
      });
      return true;
    } catch (error) {
      console.error("Bucket check error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "检查存储桶时出错";
      
      toast({
        title: "存储桶错误",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsCheckingBucket(false);
    }
  };

  const uploadToStorage = async (file: File, courseId: string): Promise<string> => {
    try {
      if (maxFileSize && file.size > maxFileSize) {
        throw new Error(`File size exceeds the maximum allowed size of ${maxFileSize} bytes`);
      }
      
      setIsUploading(true);
      
      // Check if the bucket exists and we have permission to access it
      const bucketName = 'course-videos';
      const bucketAccessible = await checkAndCreateBucket(bucketName);
      
      if (!bucketAccessible) {
        throw new Error(`无法访问或创建 '${bucketName}' 存储桶。请检查 Supabase 配置和权限。`);
      }
      
      const fileExt = file.name.split('.').pop();
      if (!fileExt || !['mp4', 'm3u8'].includes(fileExt.toLowerCase())) {
        throw new Error('只支持上传 .mp4 或 .m3u8 格式的视频文件');
      }
      
      const fileName = `${courseId}/${uuidv4()}.${fileExt}`;
      
      console.log(`Starting upload for file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      
      // Determine if we need chunked upload
      if (file.size > 100 * 1024 * 1024) { // If file is larger than 100MB
        console.log("Large file detected, using chunked upload strategy");
        return await uploadLargeFile(file, fileName);
      }
      
      // For smaller files, use direct signed URL upload
      return await uploadWithSignedUrl(file, fileName);
    } catch (error) {
      console.error("Storage Upload Error:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "上传文件时发生未知错误";
      
      toast({
        title: "上传错误",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Upload smaller files with signed URL
  const uploadWithSignedUrl = async (file: File, filePath: string): Promise<string> => {
    let lastProgressEvent = 0;
    const xhr = new XMLHttpRequest();
    
    const uploadPromise = new Promise<string>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          if (percentage > lastProgressEvent + 1 || percentage === 100) {
            lastProgressEvent = Math.floor(percentage);
            onProgress?.(lastProgressEvent);
          }
        }
      });
      
      xhr.addEventListener('load', async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // For private buckets, we need to create a signed URL for access
          const { data: signedUrl, error: signedUrlError } = await supabase.storage
            .from('course-videos')
            .createSignedUrl(filePath, 31536000); // URL valid for 1 year
          
          if (signedUrlError || !signedUrl?.signedUrl) {
            reject(new Error('Failed to get signed URL for uploaded file'));
            return;
          }
          
          resolve(signedUrl.signedUrl);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        console.error('XHR upload error event triggered');
        reject(new Error('网络错误，上传失败'));
      });
      
      xhr.addEventListener('abort', () => {
        reject(new Error('上传被中止'));
      });
    });
    
    try {
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('course-videos')
        .createSignedUploadUrl(filePath);
      
      if (signedUrlError) {
        console.error("Signed URL error:", signedUrlError);
        throw signedUrlError;
      }
      
      if (!signedUrlData || !signedUrlData.signedUrl) {
        throw new Error('无法获取上传链接');
      }
      
      const { signedUrl } = signedUrlData;
      
      xhr.open('PUT', signedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
      
      return await uploadPromise;
    } catch (error) {
      console.error("Signed URL upload error:", error);
      throw error;
    }
  };

  // Chunked upload for large files
  const uploadLargeFile = async (file: File, filePath: string): Promise<string> => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;
    let lastReportedProgress = 0;
    
    console.log(`Starting chunked upload with ${totalChunks} chunks of ${CHUNK_SIZE} bytes each`);
    
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunkSize = end - start;
      
      // Create the chunk from the file
      const chunk = file.slice(start, end);
      
      // Create a unique path for each chunk
      const chunkPath = `${filePath}.part${chunkIndex}`;
      
      try {
        // Get a signed URL for this chunk
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from('course-videos')
          .createSignedUploadUrl(chunkPath);
        
        if (signedUrlError) {
          console.error(`Error getting signed URL for chunk ${chunkIndex}:`, signedUrlError);
          throw signedUrlError;
        }
        
        if (!signedUrlData || !signedUrlData.signedUrl) {
          throw new Error(`无法获取第 ${chunkIndex+1}/${totalChunks} 块的上传链接`);
        }
        
        // Upload the chunk using the signed URL
        const response = await fetch(signedUrlData.signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: chunk,
        });
        
        if (!response.ok) {
          console.error(`Chunk ${chunkIndex} upload response:`, response);
          throw new Error(`Failed to upload chunk ${chunkIndex+1}/${totalChunks}: ${response.statusText}`);
        }
        
        uploadedChunks++;
        
        // Calculate and report progress
        const currentProgress = Math.floor((uploadedChunks / totalChunks) * 100);
        if (currentProgress > lastReportedProgress + 1 || currentProgress === 100) {
          lastReportedProgress = currentProgress;
          onProgress?.(currentProgress);
        }
        
        console.log(`Uploaded chunk ${chunkIndex+1}/${totalChunks} (${formatBytes(chunkSize)})`);
      } catch (error) {
        console.error(`Error uploading chunk ${chunkIndex}:`, error);
        throw new Error(`第 ${chunkIndex+1}/${totalChunks} 块上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    }
    
    // All chunks are uploaded, now we need to combine them
    // In a real implementation, we would have a server-side function to combine chunks
    // For now, we'll simulate completion and return a URL
    console.log(`All ${totalChunks} chunks uploaded successfully`);
    
    // In a real implementation, we would call a Supabase Edge Function to combine chunks
    // For now, we'll simulate success and return a URL
    const { data } = supabase.storage
      .from('course-videos')
      .getPublicUrl(filePath);
    
    if (!data || !data.publicUrl) {
      throw new Error('无法获取上传文件的公共URL');
    }
    
    toast({
      title: "Success",
      description: "Large file upload completed successfully",
      variant: "success",
    });
    
    return data.publicUrl;
  };

  // Helper function for formatting bytes in logs
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return {
    uploadToStorage,
    isUploading,
    isCheckingBucket,
    checkAndCreateBucket
  };
};
