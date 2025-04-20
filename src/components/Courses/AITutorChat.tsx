
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";
import { useCapyzenChat } from "@/hooks/useCapyzenChat";

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
  const { pendingContext, clearContext } = useCapyzenChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Process pendingContext when it's available
  useEffect(() => {
    if (pendingContext) {
      const { question, answer } = pendingContext;
      
      if (question && answer) {
        const contextMessage = `我想请教关于这个问题:\n\n${question}\n\n我的回答是:\n${answer}\n\n我有什么可以改进的地方吗？`;
        setInputMessage(contextMessage);
        
        // Focus the textarea and adjust its height
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }
      
      // Clear the context after using it
      clearContext();
    }
  }, [pendingContext, clearContext]);

  const handleSendMessage = (messageToSend = inputMessage) => {
    if (!messageToSend.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: messageToSend
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Auto-resize textarea back to default
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // TODO: Send to AI API and get response
    setTimeout(() => {
      const mockResponse: Message = {
        role: 'assistant',
        content: '好的，让我看看这个问题...\n我建议你可以从文章中找出具体的描述和细节来支持你的回答。'
      };
      setMessages(prev => [...prev, mockResponse]);
    }, 1000);
  };

  // Auto-resize textarea when input changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
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

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
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
            className="flex-1 resize-none"
            rows={3}
          />
          <Button onClick={() => handleSendMessage()} size="icon" className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
