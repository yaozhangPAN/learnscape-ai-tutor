
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuestionBankDataFetcherProps {
  language: string;
  onDataLoaded: (data: any[]) => void;
  onError: (hasError: boolean) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

const QuestionBankDataFetcher: React.FC<QuestionBankDataFetcherProps> = ({
  language,
  onDataLoaded,
  onError,
  onLoadingChange,
}) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        onLoadingChange(true);
        onError(false);

        console.log(`Fetching questions from Supabase... Language: ${language}`);
        console.log("Database connection check:", !!supabase);
        
        // Test connection with a simple query
        const { data: testData, error: testError } = await supabase
          .from('questions')
          .select('count(*)', { count: 'exact', head: true });
          
        if (testError) {
          console.error('Connection test error:', testError);
          throw new Error('Failed to connect to database');
        }
        
        console.log('Connection test successful, count query result:', testData);
        
        // Now fetch the actual data
        const { data, error } = await supabase
          .from('questions')
          .select('*');
        
        if (error) {
          console.error('Error fetching questions:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log('Successfully fetched questions:', data.length);
          onDataLoaded(data);
        } else {
          console.log('No data found in questions table, using default data');
          toast.info(language === 'zh' ? "数据库中未找到题目，使用样本数据代替。" : "No questions found in database. Using sample data instead.");
          onDataLoaded([]);
        }
      } catch (error) {
        console.error('Exception when fetching questions:', error);
        onError(true);
        toast.error(language === 'zh' ? "加载题目时发生错误。" : "An error occurred while loading questions.");
      } finally {
        onLoadingChange(false);
      }
    };

    fetchQuestions();
  }, [language, onDataLoaded, onError, onLoadingChange]);

  return null;
};

export default QuestionBankDataFetcher;
