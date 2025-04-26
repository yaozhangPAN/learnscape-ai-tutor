
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AITutorChatProps {
  onSubmitHomework?: (answer: string) => void;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ onSubmitHomework }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { pendingContext, clearContext, getAIChatResponse } = useCapyzenChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isBotReplying, setIsBotReplying] = useState(false);

  useEffect(() => {
    if (pendingContext) {
      const { question, answer } = pendingContext;
      if (question && answer) {
        console.log("Processing pending context:", pendingContext);
        const contextMessage = `我想请教关于这个问题:\n\n${question}\n\n我的回答是:\n${answer}\n\n我有什么可以改进的地方吗？`;
        setInputMessage(contextMessage);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
        }, 100);
      }
      clearContext();
    }
  }, [pendingContext, clearContext]);

  const handleSendMessage = async (messageToSend = inputMessage) => {
    if (!messageToSend.trim() || isBotReplying) return;
    const userMessage: Message = {
      role: "user",
      content: messageToSend,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsBotReplying(true);

    const history = [...messages, userMessage].slice(-6);
    const formattedHistory = history.map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      // Use Supabase functions.invoke instead of direct fetch
      const { data, error } = await supabase.functions.invoke('ai-capyzen-feedback', {
        body: {
          type: "chat",
          messages: formattedHistory,
        },
      });

      if (error) {
        console.error('Error getting AI chat reply:', error);
        setMessages(prev => [...prev, { role: "assistant", content: "AI助教服务器异常，请稍后再试。" }]);
      } else if (data?.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "AI助教暂时无法回复，请稍后再试。" }]);
      }
    } catch (e) {
      console.error('Error in AI chat:', e);
      setMessages(prev => [...prev, { role: "assistant", content: "AI助教服务器异常，请稍后再试。" }]);
    } finally {
      setIsBotReplying(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 150);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
          </Avatar>
          <div>
            <h3 className="font-semibold">Capyzen AI助教</h3>
            <p className="text-sm text-gray-500">我可以帮你解答问题和检查作业</p>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4"
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>有问题随时问我，或者将作业转发过来讨论</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Textarea
            ref={textareaRef}
            placeholder="输入你的问题..."
            value={inputMessage}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none"
            rows={3}
            disabled={isBotReplying}
          />
          <Button onClick={() => handleSendMessage()} size="icon" className="self-end" disabled={isBotReplying || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {isBotReplying && (
          <div className="text-center text-gray-400 text-sm mt-1">AI助教正在思考…</div>
        )}
      </CardContent>
    </Card>
  );
};
