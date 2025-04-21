
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GuidedWritingChatProps {
  imageUrl: string;
  currentStep: 'understanding' | 'outlining' | 'drafting' | 'revising';
  onStepComplete: () => void;
}

export const GuidedWritingChat: React.FC<GuidedWritingChatProps> = ({
  imageUrl,
  currentStep,
  onStepComplete,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize conversation based on current step
    const initializeStep = async () => {
      let initialPrompt = "";
      
      switch(currentStep) {
        case 'understanding':
          initialPrompt = `让我们一起来写作文。这是一篇看图作文，让我们先来观察图片。你看到了什么呢？我们来一起讨论5W1H（谁、什么、何时、何地、为何、如何）。`;
          break;
        case 'outlining':
          initialPrompt = `很好！现在我们已经观察完图片了。让我们来规划一下作文的结构，写一个大纲。你觉得这篇作文可以分成哪几个部分？`;
          break;
        case 'drafting':
          initialPrompt = `大纲已经写好了！现在让我们开始写作文的正文。我们一段一段来写，每写完一段我都会给你一些建议。`;
          break;
        case 'revising':
          initialPrompt = `作文已经写完了！让我们一起来修改和润色。我们会关注：1. 是否表达清楚？2. 有没有错别字？3. 句子是否通顺？4. 是否生动有趣？`;
          break;
      }

      if (initialPrompt) {
        setIsLoading(true);
        const response = await getAIResponse(initialPrompt);
        setMessages([{ role: 'assistant', content: response }]);
        setIsLoading(false);
      }
    };

    initializeStep();
  }, [currentStep]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://xfwnjocfdvuocvwjopke.supabase.co/functions/v1/ai-capyzen-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "chat",
            messages: [
              ...messages,
              { role: 'user', content: userMessage }
            ],
          }),
        }
      );
      const data = await response.json();
      return data.reply || "抱歉，我现在有点累了。让我们休息一下再继续吧~";
    } catch (e) {
      console.error("Error getting AI response:", e);
      return "对不起，我遇到了一些问题。让我们稍后再试吧~";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const aiResponse = await getAIResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'items-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center text-sm text-gray-500">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
                </Avatar>
                <div className="animate-pulse">Capyzen正在思考...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="在这里输入..."
              className="flex-1 resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
