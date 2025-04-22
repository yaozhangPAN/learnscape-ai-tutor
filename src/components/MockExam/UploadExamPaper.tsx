
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp } from "lucide-react";
import { uploadExamPaper, checkUserAuthentication } from "@/utils/examStorage";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const UploadExamPaper: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        toast({
          title: "请选择文件",
          description: "请先选择要上传的PDF试卷文件",
          variant: "destructive",
        });
        return;
      }

      // 检查用户是否已认证
      const isAuthenticated = await checkUserAuthentication();
      if (!isAuthenticated) {
        toast({
          title: "未登录",
          description: "请登录后再上传试卷",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      
      // 生成唯一ID作为文件标识
      const examId = uuidv4();
      
      // 上传文件到Supabase存储
      const fileUrl = await uploadExamPaper(selectedFile, examId);
      
      if (fileUrl) {
        setSelectedFile(null);
        // 重置文件输入框
        const fileInput = document.getElementById('exam-paper-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error) {
      console.error("上传处理出错:", error);
      toast({
        title: "上传失败",
        description: "上传过程中发生错误，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-learnscape-darkBlue mb-4">上传考试试卷</h2>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-grow w-full">
          <label htmlFor="exam-paper-upload" className="block relative border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition">
            <div className="flex flex-col items-center justify-center text-center">
              <FileUp className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                {selectedFile ? selectedFile.name : "点击选择试卷文件"}
              </p>
              <p className="text-xs text-gray-500">
                仅支持PDF格式，最大100MB
              </p>
            </div>
            <input 
              id="exam-paper-upload" 
              type="file" 
              accept=".pdf,application/pdf" 
              className="sr-only" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
          className="min-w-[120px] h-12"
        >
          {isUploading ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              上传中...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              上传试卷
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadExamPaper;
