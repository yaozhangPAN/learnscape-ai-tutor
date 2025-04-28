
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, Trash2, RefreshCw, Eye } from "lucide-react";
import { formatFileSize } from "@/utils/fileUtils";

interface VideoFileManagerProps {
  courseId: string;
  bucketName?: string;
}

export const VideoFileManager: React.FC<VideoFileManagerProps> = ({ 
  courseId,
  bucketName = 'course-videos'
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReplace, setIsReplace] = useState(false);

  const getFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(courseId);

      if (error) {
        toast.error("获取文件列表失败");
        console.error("获取文件列表失败:", error.message);
        return;
      }

      setFiles(data || []);
    } catch (err) {
      console.error("获取文件时出错:", err);
      toast.error("获取文件列表时发生错误");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = (replace: boolean) => {
    setIsReplace(replace);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const filePath = `${courseId}/${file.name}`;
      
      const { error } = isReplace 
        ? await supabase.storage.from(bucketName).update(filePath, file)
        : await supabase.storage.from(bucketName).upload(filePath, file);

      if (error) {
        toast.error(isReplace ? "替换文件失败" : "上传文件失败");
        console.error(error);
        return;
      }

      toast.success(isReplace ? "文件替换成功" : "文件上传成功");
      await getFiles();
    } catch (err) {
      console.error("文件处理失败:", err);
      toast.error("文件处理时发生错误");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteLastFile = async () => {
    if (files.length === 0) {
      toast.error("没有可删除的文件");
      return;
    }

    const lastFile = files[files.length - 1];
    try {
      setIsLoading(true);
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([`${courseId}/${lastFile.name}`]);

      if (error) {
        toast.error("删除文件失败");
        console.error("删除文件失败:", error);
        return;
      }

      toast.success("文件删除成功");
      await getFiles();
    } catch (err) {
      console.error("删除文件时出错:", err);
      toast.error("删除文件时发生错误");
    } finally {
      setIsLoading(false);
    }
  };

  const previewLastFile = () => {
    if (files.length === 0) {
      toast.error("没有可预览的文件");
      return;
    }

    const lastFile = files[files.length - 1];
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`${courseId}/${lastFile.name}`);

    window.open(data.publicUrl, '_blank');
  };

  useEffect(() => {
    getFiles();
  }, [courseId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">视频文件管理</CardTitle>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant="outline" 
            onClick={() => triggerFileInput(false)}
            disabled={isLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            上传文件
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => triggerFileInput(true)}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            替换文件
          </Button>
          
          <Button 
            variant="outline" 
            onClick={deleteLastFile}
            disabled={isLoading || files.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            删除最后文件
          </Button>
          
          <Button 
            variant="outline" 
            onClick={previewLastFile}
            disabled={isLoading || files.length === 0}
          >
            <Eye className="mr-2 h-4 w-4" />
            预览最后文件
          </Button>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">文件列表</h3>
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无文件</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center justify-between py-2 px-3 bg-secondary/10 rounded-md">
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.metadata?.size || 0)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
