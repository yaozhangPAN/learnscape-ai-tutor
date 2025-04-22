
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const uploadExamPaper = async (file: File, examId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${examId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('exam-papers')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('exam-papers')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    toast({
      title: "Upload Failed",
      description: "There was an error uploading the exam paper.",
      variant: "destructive",
    });
    return null;
  }
};

export const downloadExamPaper = async (fileUrl: string, paperTitle: string) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${paperTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    toast({
      title: "Starting download",
      description: `Downloading ${paperTitle}`,
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    toast({
      title: "Download Failed",
      description: "There was an error downloading the exam paper.",
      variant: "destructive",
    });
  }
};
