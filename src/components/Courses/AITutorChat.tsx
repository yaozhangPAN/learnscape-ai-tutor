
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    // TODO: Send to AI API and get response
    const mockResponse: Message = {
      role: 'assistant',
      content: '好的，让我看看这个问题...\n我建议你可以从文章中找出具体的描述和细节来支持你的回答。'
    };
    setMessages(prev => [...prev, mockResponse]);
    setInputMessage('');
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
          </Avatar>
          <div>
            <h3 className="font-semibold">Capyzen AI助教</h3>
            <p className="text-sm text-gray-500">我可以帮你解答问题和检查作业</p>
          </div>
        </div>

        <div className="h-[300px] overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
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
          ))}
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder="输入你的问题..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
