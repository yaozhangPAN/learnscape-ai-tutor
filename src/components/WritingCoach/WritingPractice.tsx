
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";

const WritingPractice = () => {
  const location = useLocation();
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  
  // Extract session ID from URL query parameters
  const sessionId = new URLSearchParams(location.search).get("session");

  const steps = [
    { label: "理解", status: "current" },
    { label: "构思", status: "upcoming" },
    { label: "写作", status: "upcoming" },
    { label: "修改", status: "upcoming" }
  ];

  const chatMessages = [
    {
      role: "ai",
      content: "📝 你好！让我们一起写作文吧！",
    },
    {
      role: "ai",
      content: "第一步：审题立意。先让我们明确题目要求和关键词。请仔细阅读作文题目，圈出关键词。",
    }
  ];

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
      
      // Fetch messages for this session
      const { data: messages, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("session_id", id)
        .order("created_at", { ascending: true });
      
      if (messagesError) throw messagesError;
      // We could set the messages here if needed
      
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

  const handleSendMessage = async () => {
    if (!userInput.trim() || !sessionId) return;
    
    try {
      // Add user message to the database
      await supabase.from("messages").insert({
        session_id: sessionId,
        sender: "USER",
        content: userInput
      });
      
      // In a real app, this would trigger an AI response
      // which would be inserted as a message with sender: 'AI'
      
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "发送失败",
        description: "无法发送您的消息",
      });
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
          <div className="flex items-center space-x-8">
            <Link to="/ai-tutor/writing-coach" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Link>
            <nav className="flex items-center space-x-4 text-sm text-gray-600">
              {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                  {index > 0 && <span className="text-gray-300">—</span>}
                  <span className={currentStep === index + 1 ? "text-blue-600 font-semibold" : ""}>
                    {step.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
          <Button 
            variant="default"
            onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))}
            disabled={currentStep === steps.length}
          >
            下一步：{currentStep < steps.length ? steps[currentStep].label : "完成"}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <section className="col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{sessionData?.title || "未命名作文"}</h2>
            <div className="space-y-4 text-gray-800">
              <div>
                <span className="font-semibold">年级</span>: {sessionData?.grade_level === 'grade_3' ? '小学三年级' : 
                                                            sessionData?.grade_level === 'grade_4' ? '小学四年级' : 
                                                            sessionData?.grade_level === 'grade_5' ? '小学五年级' : 
                                                            sessionData?.grade_level === 'grade_6' ? '小学六年级' : '未知年级'}
              </div>
              <div>
                <span className="font-semibold">类型</span>: {sessionData?.genre === 'picture_composition' ? '看图写作' : 
                                                           sessionData?.genre === 'narrative' ? '记叙文' : 
                                                           sessionData?.genre === 'descriptive' ? '说明文' : '未知类型'}
              </div>
              {sessionData?.word_limit && (
                <div>
                  <span className="font-semibold">字数要求</span>: 约 {sessionData.word_limit} 字
                </div>
              )}
              {sessionData?.prompt_text && (
                <div>
                  <span className="font-semibold">题目要求</span>:
                  <div className="ml-4 mt-1">{sessionData.prompt_text}</div>
                </div>
              )}
            </div>
          </div>

          {imageUrl && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4">作文图片</h3>
              <img 
                src={imageUrl} 
                alt="作文题目图片"
                className="mx-auto max-h-[300px] object-contain rounded"
              />
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">写作步骤</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">当前：预备阶段</h4>
                <ul className="mt-2 space-y-2 text-sm text-blue-700">
                  <li>• 明确题目要求，圈出关键词</li>
                  <li>• 确定中心思想（主题）与写作角度</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-4 bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            {chatMessages.map((message, index) => (
              <div key={index} className="text-sm">
                <strong>{message.role === "ai" ? "AI:" : "你:"}</strong>{" "}
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="在这里输入..."
              className="flex-1"
            />
            <Button 
              variant="outline"
              onClick={handleSendMessage}
              disabled={!userInput.trim()}
            >
              发送
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default WritingPractice;
