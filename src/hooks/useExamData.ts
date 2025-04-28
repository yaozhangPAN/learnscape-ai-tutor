
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ExamPaper } from "@/types/exam";
import { mockExamPapers } from "@/data/mockExamPapers";
import { toast } from "sonner";

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
      
      // Here we're using mock data, but in a real app this would be an API call
      setTimeout(() => {
        setExamData(mockExamPapers);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching mock exams:", error);
      setDataError(true);
      toast.error(language === 'zh' ? "加载模拟考试失败。" : "Failed to load mock exams.");
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
