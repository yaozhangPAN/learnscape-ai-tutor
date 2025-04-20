
import React from 'react';
import { formatFileSize, SUPABASE_FREE_LIMIT } from '@/utils/fileUtils';

interface FileInfoProps {
  fileSize: string;
  isValidSize: boolean;
  maxAllowedSize: number;
}

export const FileInfo: React.FC<FileInfoProps> = ({ 
  fileSize, 
  isValidSize, 
  maxAllowedSize 
}) => {
  return (
    <div className="text-sm">
      <p className={!isValidSize ? "text-red-500" : "text-gray-500"}>
        File size: {fileSize} {!isValidSize && " (exceeds maximum size)"}
      </p>
      <p className="text-gray-500">
        Max allowed: {formatFileSize(maxAllowedSize)}
      </p>
      <p className="text-amber-500">
        Supabase free tier limit: {formatFileSize(SUPABASE_FREE_LIMIT)}
      </p>
    </div>
  );
};
