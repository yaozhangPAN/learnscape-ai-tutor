
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ExamPaper } from "@/types/exam";
import { mockExamPapers } from "@/data/mockExamPapers";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useExamData = () => {
  const { language } = useI18n();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [examData, setExamData] = useState(mockExamPapers);
  const [dataError, setDataError] = useState<boolean>(false);

  const fetchExams = async () => {
    try {
      setIsLoading(true);
      setDataError(false);
      console.log(`Fetching mock exams... Language: ${language}`);
      
      // Try to fetch real data from Supabase
      console.log("Attempting to fetch exams from Supabase database...");
      const { data: supabaseExams, error } = await supabase
        .from('mock_exams')
        .select('*');
      
      if (error) {
        console.error("Supabase error fetching mock exams:", error);
        throw error;
      }
      
      if (supabaseExams && supabaseExams.length > 0) {
        console.log(`Successfully loaded ${supabaseExams.length} exams from Supabase`);
        setExamData(supabaseExams);
      } else {
        console.log("No exam data found in Supabase, using mock data instead");
        setExamData(mockExamPapers);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching mock exams:", error);
      setDataError(true);
      toast.error(language === 'zh' ? "加载模拟考试失败，使用默认数据替代。" : "Failed to load mock exams. Using default data instead.");
      setExamData(mockExamPapers);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [language]);

  return {
    isLoading,
    examData,
    dataError,
    fetchExams,
  };
};
