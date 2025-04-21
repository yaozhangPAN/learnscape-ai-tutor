
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Lock, Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CapyzenCommentProps {
  feedback: string;
  isPremium?: boolean;
  startCheckoutSession?: (type: string) => Promise<string | null>;
}

export const CapyzenComment: React.FC<CapyzenCommentProps> = ({ feedback, isPremium, startCheckoutSession }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: feedback }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isPremium) return;
    
    const userMessage = { role: 'user', content: newMessage };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

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
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );
      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (e) {
      console.error('Error getting AI chat reply:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col p-4 gap-4 bg-blue-50 border-blue-200 mt-2 shadow-sm rounded-xl">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'items-start'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="w-10 h-10 mt-1 mr-3 flex-shrink-0">
                <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
              </Avatar>
            )}
            <div 
              className={`rounded-lg p-3 max-w-[90%] ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white ml-auto' 
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="text-[15px] leading-relaxed whitespace-pre-line">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin">⚪</div>
            AI助教思考中...
          </div>
        )}
      </div>

      {typeof isPremium !== "undefined" && !isPremium && startCheckoutSession ? (
        <button
          className="mt-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold cursor-pointer hover:bg-orange-200 flex items-center gap-1"
          type="button"
          onClick={async () => {
            const url = await startCheckoutSession("premium_subscription");
            if (url) window.location.href = url;
          }}
        >
          <Lock className="w-4 h-4 mr-1" />
          仅限会员，<span className="underline">升级会员继续与AI对话</span>
        </button>
      ) : (
        <div className="flex gap-2 mt-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="有什么想和AI助教讨论的..."
            className="flex-1 bg-white"
            rows={1}
            disabled={!isPremium || isLoading}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!isPremium || isLoading || !newMessage.trim()}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};
