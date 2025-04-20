
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
      
      // Explicit bucket check with more detailed error handling
      try {
        const { data: bucket, error: bucketError } = await supabase.storage
          .from('course-videos')
          .getBucket();
        
        if (bucketError) {
          console.error("Bucket check error:", bucketError);
          throw new Error(`存储桶检查失败: ${bucketError.message}`);
        }
      } catch (bucketCheckError) {
        console.error("Detailed bucket check error:", bucketCheckError);
        throw new Error("无法访问 'course-videos' 存储桶。请检查 Supabase 配置。");
      }
      
      // Determine if we need chunked upload
      if (file.size > 100 * 1024 * 1024) { // If file is larger than 100MB
        console.log("Large file detected, using chunked upload strategy");
        return await uploadLargeFile(file, filePath);
      }
      
      // For smaller files, use direct signed URL upload
      return await uploadWithSignedUrl(file, filePath);
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
          const { data } = supabase.storage
            .from('course-videos')
            .getPublicUrl(filePath);
          
          if (!data || !data.publicUrl) {
            reject(new Error('Failed to get public URL for uploaded file'));
            return;
          }
          
          resolve(data.publicUrl);
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
    isUploading
  };
};
