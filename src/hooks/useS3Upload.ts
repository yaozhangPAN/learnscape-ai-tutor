
import { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Config = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'your-access-key-id',  // In a real app, use environment variables
    secretAccessKey: 'your-secret-access-key'  // In a real app, use environment variables
  }
};

const S3_BUCKET_NAME = 'your-bucket-name'; // Replace with your actual bucket name

interface UseS3UploadOptions {
  onProgress?: (progress: number) => void;
}

export const useS3Upload = ({ onProgress }: UseS3UploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToS3 = async (file: File, courseId: string): Promise<string> => {
    try {
      setIsUploading(true);
      const s3Client = new S3Client(s3Config);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${courseId}-${uuidv4()}.${fileExt}`;
      const key = `course-videos/${fileName}`;
      
      const fileArrayBuffer = await file.arrayBuffer();
      
      const uploadCommand = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: new Uint8Array(fileArrayBuffer),
        ContentType: file.type,
      });
      
      await s3Client.send(uploadCommand);
      
      return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadToS3,
    isUploading
  };
};
