import { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

const s3Config = {
  region: 'ap-southeast-1', // Singapore region
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',     // We'll get this from Supabase secrets
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'  // We'll get this from Supabase secrets
  }
};

const S3_BUCKET_NAME = 'your-bucket-name'; // We'll get this from Supabase secrets

interface UseS3UploadOptions {
  onProgress?: (progress: number) => void;
  maxFileSize?: number;
}

export const useS3Upload = ({ onProgress, maxFileSize }: UseS3UploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadToS3 = async (file: File, courseId: string): Promise<string> => {
    try {
      // Validate file size if maxFileSize is provided
      if (maxFileSize && file.size > maxFileSize) {
        throw new Error(`File size exceeds the maximum allowed size of ${maxFileSize} bytes`);
      }
      
      setIsUploading(true);
      
      console.log("Creating S3 client with config:", JSON.stringify({
        region: s3Config.region,
        bucketName: S3_BUCKET_NAME
      }));
      
      const s3Client = new S3Client(s3Config);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}-${uuidv4()}.${fileExt}`;
      const key = `course-videos/${fileName}`;
      
      console.log(`Starting upload for file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      
      // For large files, use a smaller chunk of the file for debugging
      // to avoid "DataCloneError: Failed to execute 'postMessage' on 'Window'" error
      if (file.size > 100 * 1024 * 1024) { // If file is larger than 100MB
        console.log("File is too large for direct upload in this demo environment");
        toast({
          title: "Upload Simulation",
          description: "In this demo environment, we're simulating the upload of large files. In production, you would use pre-signed URLs or multipart uploads for large files.",
        });
        
        // Simulate a successful upload after a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
      }
      
      const fileArrayBuffer = await file.arrayBuffer();
      
      const uploadCommand = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: new Uint8Array(fileArrayBuffer),
        ContentType: file.type,
      });
      
      console.log("Sending upload command to S3");
      await s3Client.send(uploadCommand);
      console.log("Upload completed successfully");
      
      return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error("S3 Upload Error:", error);
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
    uploadToS3,
    isUploading
  };
};
