
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { formatFileSize, ADMIN_MAX_FILE_SIZE } from '@/utils/fileUtils';

export const AdminAlert = () => {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Demo 环境</AlertTitle>
        <AlertDescription>
          在此演示环境中，非常大的文件上传（&gt;100MB）将被模拟，而不实际传输数据。
          在生产环境中，为大文件使用预签名 URL 或分片上传。
        </AlertDescription>
      </Alert>
      
      <div className="mt-2 p-2 bg-blue-50 text-sm rounded border border-blue-200">
        <p className="font-medium text-blue-800">管理员模式</p>
        <p className="text-blue-600">您可以上传最大 {formatFileSize(ADMIN_MAX_FILE_SIZE)} 的视频文件</p>
      </div>
    </div>
  );
};
