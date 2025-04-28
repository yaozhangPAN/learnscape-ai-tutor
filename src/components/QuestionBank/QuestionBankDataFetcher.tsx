
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        onLoadingChange(true);
        onError(false);

        console.log(`Fetching questions from Supabase... Language: ${language}`);
        console.log("Database connection check:", !!supabase);
        
        // First check if the Supabase client is available
        if (!supabase) {
          throw new Error('Supabase client is not initialized properly');
        }
        
        // Use a simpler, direct query to test the connection first
        try {
          const { count, error: countError } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true });
          
          if (countError) {
            console.error('Connection test error:', countError);
            // Just log the error but continue with the fallback data
            throw new Error('Database connection test failed');
          }
          
          console.log('Connection test successful, approximate count:', count);
        } catch (testError) {
          console.warn('Connection test failed, will use fallback data:', testError);
          // If we've exceeded retry attempts, just use fallback data
          if (retryCount >= maxRetries) {
            console.log('Max retries reached, using default data');
            onDataLoaded([]);
            onError(true);
            onLoadingChange(false);
            return;
          }
        }
        
        // Now fetch the actual data
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching questions:', error);
          throw error;
        }
        
        // Log the raw data received for debugging
        console.log('Raw data from questions table:', data);
        
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
        
        // Only show toast error message if we're not retrying automatically
        if (retryCount >= maxRetries) {
          toast.error(language === 'zh' ? "加载题目时发生错误，使用默认数据。" : "An error occurred while loading questions. Using default data.");
        }
        
        // Use empty array to trigger fallback to default data
        onDataLoaded([]);
        
        // Retry logic
        if (retryCount < maxRetries) {
          console.log(`Retrying fetch attempt ${retryCount + 1} of ${maxRetries}...`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000); // Wait 1 second before retrying
        }
      } finally {
        onLoadingChange(false);
      }
    };

    fetchQuestions();
  }, [language, onDataLoaded, onError, onLoadingChange, retryCount]);

  return null;
};

export default QuestionBankDataFetcher;
