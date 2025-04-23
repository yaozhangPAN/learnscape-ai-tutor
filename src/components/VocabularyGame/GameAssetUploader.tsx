
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGameAssetUpload } from '@/hooks/useGameAssetUpload';
import { toast } from '@/hooks/use-toast';

interface GameAssetUploaderProps {
  onUploadComplete?: (url: string) => void;
}

export const GameAssetUploader: React.FC<GameAssetUploaderProps> = ({ 
  onUploadComplete 
}) => {
  const { uploadGameAsset, isUploading } = useGameAssetUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ 
        title: '请选择文件', 
        description: '上传前请先选择文件' 
      });
      return;
    }

    const uploadedUrl = await uploadGameAsset(selectedFile);
    
    if (uploadedUrl) {
      toast({ 
        title: '上传成功', 
        description: '游戏资源上传完成' 
      });
      onUploadComplete?.(uploadedUrl);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2"
      />
      <Button 
        onClick={handleUpload} 
        disabled={isUploading}
      >
        {isUploading ? '上传中...' : '上传资源'}
      </Button>
    </div>
  );
};
