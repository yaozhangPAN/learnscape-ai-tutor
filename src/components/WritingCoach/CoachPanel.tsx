
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";

interface CoachPanelProps {
  essay: string;
  lang: string;
}

const CoachPanel = ({ essay, lang }: CoachPanelProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {
      role: "ai",
      content: lang === 'zh' 
        ? "👋 你好！我是悠灵，你的写作教练！我会帮助你完成这篇作文。有什么需要帮助的吗？" 
        : "👋 Hello! I'm YooLing, your writing coach! I'll help you complete this essay. How can I assist you today?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [inspirationPoints, setInspirationPoints] = useState(0);
  const { getAIChatResponse } = useCapyzenChat();

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    
    try {
      // Prepare context for AI
      const aiContext = [
        { 
          role: "system", 
          content: `You are YooLing, a writing coach for ${lang === 'zh' ? 'Chinese' : 'English'} language students. 
            Be encouraging, supportive, and use the Socratic method to guide students. 
            Current essay content: "${essay}". 
            Keep responses concise, under 100 words.
            Current language: ${lang === 'zh' ? 'Chinese' : 'English'}.`
        },
        ...messages.slice(-5),
        userMessage
      ];
      
      // Get AI response
      const aiResponse = await getAIChatResponse(aiContext);
      
      // Add AI message
      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
      
      // Award inspiration point for engagement
      if (Math.random() > 0.5) {
        setInspirationPoints(prev => prev + 1);
        toast({
          title: lang === 'zh' ? "✨ 获得灵感点!" : "✨ Inspiration point earned!",
          description: lang === 'zh' ? "继续努力!" : "Keep up the good work!",
        });
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: lang === 'zh' ? "获取回复失败" : "Failed to get response",
        description: lang === 'zh' ? "请稍后再试" : "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setUserInput(prompt);
    handleSendMessage();
  };

  return (
    <div className="h-full flex flex-col bg-white p-5 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {lang === 'zh' ? '🤖 悠灵写作教练' : '🤖 YooLing Writing Coach'}
        </h2>
        <div className="text-amber-500 font-medium">
          ✨ {inspirationPoints} {lang === 'zh' ? '灵感点' : 'Inspiration Points'}
        </div>
      </div>

      {/* Coach image */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
          <img 
            src="/lovable-uploads/8e73fb56-c88b-4880-b279-716a83e02f42.png"
            alt="YooLing Coach"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickPrompt(lang === 'zh' ? "解释一下题目要求" : "Explain the topic requirements")}
          className="text-xs"
        >
          {lang === 'zh' ? "解释题目" : "Explain the topic"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickPrompt(lang === 'zh' ? "给我一些写作建议" : "Give me some writing suggestions")}
          className="text-xs"
        >
          {lang === 'zh' ? "写作建议" : "Writing tips"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickPrompt(lang === 'zh' ? "请点评我的作文" : "Give me feedback")}
          className="text-xs"
          disabled={!essay.trim()}
        >
          {lang === 'zh' ? "获取反馈" : "Get feedback"}
        </Button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto mb-4 border rounded-md p-3 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" 
                    ? "bg-blue-100 text-gray-800" 
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="flex gap-2">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={lang === 'zh' ? "输入你的问题..." : "Type your question..."}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!userInput.trim()}
        >
          {lang === 'zh' ? "发送" : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default CoachPanel;
