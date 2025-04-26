import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export interface TutorResponseProps {
  question: string;
  emitCleanupAction: () => void;
}

const TutorResponse = ({ question, emitCleanupAction }: TutorResponseProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      if (!question) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.functions.invoke('fireball-tutor', {
          body: { prompt: question }
        });

        if (error) {
          throw error;
        }

        setResponse(data?.reply || "抱歉，我暂时无法回答您的问题。请稍后再试。");
      } catch (err) {
        console.error("Failed to get AI response:", err);
        setError("抱歉，请求失败。请稍后重试。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponse();
  }, [question]);

  if (!response) return null;
  
  return (
    <div className="mt-6">
      <label className="text-sm font-medium block mb-1">AI 导师回答</label>
      <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
};

export default TutorResponse;
