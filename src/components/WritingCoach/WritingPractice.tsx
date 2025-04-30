
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import WritingEditor from "./WritingEditor";

const WritingPractice = () => {
  const location = useLocation();
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionData, setSessionData] = useState(null);
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

  const fetchSessionData = async (id) => {
    try {
      setIsLoading(true);
      
      // Fetch writing session data
      const { data: session, error: sessionError } = await supabase
        .from("writing_sessions")
        .select("*, images(*)")
        .eq("id", id)
        .single();
      
      if (sessionError) throw sessionError;
      if (!session) throw new Error("未找到写作会话");
      
      setSessionData(session);
      setImageUrl(session.images?.url || "");
      
    } catch (error) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">正在加载...</p>
      </div>
    );
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/ai-tutor/writing-coach" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">
            {sessionData?.title || "写作练习"}
          </h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <WritingEditor
          sessionData={sessionData}
          imageUrl={imageUrl}
        />
      </div>
    </>
  );
};

export default WritingPractice;
