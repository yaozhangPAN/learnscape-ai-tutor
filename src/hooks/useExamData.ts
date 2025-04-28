
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ExamPaper } from "@/types/exam";
import { mockExamPapers } from "@/data/mockExamPapers";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useExamData = () => {
  const { language } = useI18n();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [examData, setExamData] = useState<ExamPaper[]>(mockExamPapers);
  const [dataError, setDataError] = useState<boolean>(false);

  const fetchExams = async () => {
    try {
      setIsLoading(true);
      setDataError(false);
      console.log(`Fetching mock exams... Language: ${language}`);
      
      // Try to fetch real data from Supabase
      console.log("Attempting to fetch exams from Supabase database...");
      
      // First check if the 'questions' table contains any exam data
      const { data: examQuestions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', 'exam')
        .order('created_at', { ascending: false });
      
      if (questionsError) {
        console.error("Supabase error fetching exams from questions table:", questionsError);
        throw questionsError;
      }
      
      if (examQuestions && examQuestions.length > 0) {
        console.log(`Successfully loaded ${examQuestions.length} exams from Supabase questions table`);
        
        // Convert the question data to the ExamPaper format
        const convertedExams: ExamPaper[] = examQuestions.map(q => ({
          id: q.id,
          title: q.title || 'Untitled Exam',
          school: q.content && typeof q.content === 'object' ? (q.content.school as string) || 'Unknown School' : 'Unknown School',
          year: q.content && typeof q.content === 'object' ? (q.content.year as string) || new Date().getFullYear().toString() : new Date().getFullYear().toString(),
          type: q.content && typeof q.content === 'object' ? (q.content.type as string) || 'Practice' : 'Practice',
          subject: q.subject || 'general',
          level: q.level || 'p6',
          downloadCount: q.content && typeof q.content === 'object' ? (q.content.downloadCount as number) || 0 : 0,
          isTopSchool: q.content && typeof q.content === 'object' ? (q.content.isTopSchool as boolean) || false : false,
          isOnlineAvailable: true
        }));
        
        setExamData(convertedExams);
      } else {
        console.log("No exam data found in Supabase questions table, using mock data instead");
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
