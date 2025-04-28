
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ExamPaper } from "@/types/exam";
import { mockExamPapers } from "@/data/mockExamPapers";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Helper type for handling the content type safely
type ContentObject = {
  school?: string;
  year?: string;
  type?: string;
  downloadCount?: number;
  isTopSchool?: boolean;
};

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
      
      // Log raw data for debugging
      console.log("Raw exam data from database:", examQuestions);
      
      if (examQuestions && examQuestions.length > 0) {
        console.log(`Successfully loaded ${examQuestions.length} exams from Supabase questions table`);
        
        // Convert the question data to the ExamPaper format
        const convertedExams: ExamPaper[] = examQuestions.map(q => {
          // Safely parse the content field
          let contentObj: ContentObject = {};
          
          if (q.content) {
            if (typeof q.content === 'string') {
              try {
                contentObj = JSON.parse(q.content) as ContentObject;
              } catch (e) {
                console.warn("Failed to parse content as JSON:", e);
                contentObj = {};
              }
            } else if (typeof q.content === 'object') {
              // Handle both array and object cases
              if (Array.isArray(q.content)) {
                console.warn("Content is an array, expected an object");
                contentObj = {};
              } else {
                contentObj = q.content as ContentObject;
              }
            }
          }
          
          return {
            id: q.id,
            title: q.title || 'Untitled Exam',
            school: contentObj.school || 'Unknown School',
            year: contentObj.year || new Date().getFullYear().toString(),
            type: contentObj.type || 'Practice',
            subject: q.subject || 'general',
            level: q.level || 'p6',
            downloadCount: contentObj.downloadCount || 0,
            isTopSchool: contentObj.isTopSchool || false,
            isOnlineAvailable: true
          };
        });
        
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
