
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const uploadExamPaper = async (file: File, examId: string): Promise<string | null> => {
  try {
    console.log("开始上传文件:", file.name, "大小:", file.size, "类型:", file.type);
    
    // 验证文件类型
    if (file.type !== 'application/pdf') {
      console.error('文件类型错误:', file.type);
      toast({
        title: "上传失败",
        description: "只支持PDF文件格式",
        variant: "destructive",
      });
      return null;
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${examId}.${fileExt}`;
    
    console.log("正在上传到 exam-papers 存储桶，文件名:", fileName);
    
    const { data, error } = await supabase.storage
      .from('exam-papers')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true // 允许覆盖同名文件
      });

    if (error) {
      console.error('上传错误详情:', error);
      
      // 根据错误类型提供更具体的错误消息
      let errorMessage = "上传考试试卷时出错";
      if (error.message.includes("storage/object-too-large")) {
        errorMessage = "文件太大，超出了存储限制";
      } else if (error.message.includes("Unauthorized")) {
        errorMessage = "未授权访问。请确保您已登录并有上传权限";
      } else if (error.message.includes("not supported")) {
        errorMessage = "不支持的文件类型，只接受PDF文件";
      }
      
      toast({
        title: "上传失败",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
    
    console.log("上传成功，文件路径:", data.path);
    
    const { data: { publicUrl } } = supabase.storage
      .from('exam-papers')
      .getPublicUrl(data.path);
    
    console.log("文件公共访问URL:", publicUrl);
    
    toast({
      title: "上传成功",
      description: `${file.name} 已成功上传`,
      variant: "default",
    });

    return publicUrl;
  } catch (error) {
    console.error('上传文件时发生异常:', error);
    
    if (error instanceof Error) {
      console.error('错误消息:', error.message);
      console.error('错误堆栈:', error.stack);
    }
    
    toast({
      title: "上传失败",
      description: "上传考试试卷时出现意外错误，请稍后重试",
      variant: "destructive",
    });
    return null;
  }
};

export const downloadExamPaper = async (fileUrl: string, paperTitle: string) => {
  try {
    console.log("开始下载文件:", fileUrl);
    
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const blob = await response.blob();
    console.log("文件下载成功，大小:", blob.size, "类型:", blob.type);
    
    // 验证是否为PDF文件
    if (blob.type !== 'application/pdf') {
      console.warn("下载的文件不是PDF格式:", blob.type);
    }
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${paperTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    toast({
      title: "开始下载",
      description: `正在下载 ${paperTitle}`,
    });
  } catch (error) {
    console.error('下载文件时出错:', error);
    
    if (error instanceof Error) {
      console.error('错误详情:', error.message);
    }
    
    toast({
      title: "下载失败",
      description: "下载考试试卷时出错，请稍后重试",
      variant: "destructive",
    });
  }
};

// 检查用户是否已认证的辅助函数
export const checkUserAuthentication = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('检查用户会话时出错:', error);
      return false;
    }
    
    return !!session;
  } catch (error) {
    console.error('检查认证状态时出现异常:', error);
    return false;
  }
};
