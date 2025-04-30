
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";

interface SessionData {
  id: string;
  title: string;
  prompt_text: string;
  grade_level: string;
  genre: string;
  word_limit: number;
  images?: {
    url: string;
  };
  [key: string]: any;
}

interface SessionDataProviderProps {
  children: (props: {
    sessionData: SessionData | null;
    isLoading: boolean;
    imageUrl: string;
  }) => React.ReactNode;
}

export const SessionDataProvider: React.FC<SessionDataProviderProps> = ({ children }) => {
  const location = useLocation();
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  
  // Extract session ID from URL query parameters
  const sessionId = new URLSearchParams(location.search).get("session");

  // Fetch session data when component mounts
  useEffect(() => {
    if (sessionId) {
      fetchSessionData(sessionId);
    } else {
      toast({
        variant: "destructive",
        title: "无效的会话",
        description: "未能找到写作会话信息",
      });
      setIsLoading(false);
    }
  }, [sessionId]);

  const fetchSessionData = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Fetch writing session data with the new column names
      const { data: session, error: sessionError } = await supabase
        .from("writing_sessions")
        .select("*, images(*)")
        .eq("id", id)
        .single();
      
      if (sessionError) throw sessionError;
      if (!session) throw new Error("未找到写作会话");
      
      // Map the database fields to our SessionData interface
      // Updated to use the correct column names
      const sessionDataFormatted: SessionData = {
        id: session.id,
        title: session.title || "",
        prompt_text: session.prompt_text || "",
        grade_level: session.grade_level || "",
        genre: session.genre || "",
        // Use word_limit if available, otherwise fallback to word_count or default 600
        word_limit: session.word_limit || session.word_count || 600,
        images: session.images
      };
      
      setSessionData(sessionDataFormatted);
      setImageUrl(session.images?.url || "");
      
    } catch (error: any) {
      console.error("Error fetching session data:", error);
      toast({
        variant: "destructive",
        title: "获取数据失败",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <>{children({ sessionData, isLoading, imageUrl })}</>;
};
