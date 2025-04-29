
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { useRequirePremium } from "@/hooks/useRequirePremium";
import TutorCharacter from "./TutorCharacter";
import InputControls from "./InputControls";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

const TutorMe = () => {
  // Add the useRequirePremium hook to restrict access to premium users
  useRequirePremium();
  
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { supabase } = useSupabase();

  const handleVoiceInput = (text: string) => {
    setQuestion(text);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from('tutor-uploads')
        .upload(`${Date.now()}-${file.name}`, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('tutor-uploads')
        .getPublicUrl(data.path);

      setQuestion((prev) => 
        prev + `\n[上传的图片: ${publicUrl}]\n请帮我分析这张图片。`
      );
    } catch (error) {
      toast({
        title: "图片上传失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast({
        title: "空白问题",
        description: "请输入您的问题以获得帮助。",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date(),
      imageUrl: question.match(/\[上传的图片: (.*?)\]/)?.[1]
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Use Supabase functions.invoke with proper authorization
      const { data, error } = await supabase.functions.invoke('fireball-tutor', {
        body: { prompt: question }
      });
      
      if (error) throw error;
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.reply,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error querying AI tutor:', error);
      toast({
        title: "提问失败",
        description: "抱歉，暂时无法回答您的问题，请稍后再试。",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  const handleClear = () => {
    setQuestion("");
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Welcome message */}
          <div className="p-4 border-b">
            <TutorCharacter />
          </div>
          
          {/* Chat conversation area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground self-end' 
                      : 'bg-muted'
                  }`}
                >
                  {message.type === 'ai' ? (
                    <div className="flex items-start gap-4">
                      <img 
                        src="/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png" 
                        alt="小熊猫" 
                        className="w-8 h-8 rounded-full" 
                      />
                      <div className="prose prose-sm">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {message.imageUrl && (
                        <img 
                          src={message.imageUrl} 
                          alt="Uploaded content"
                          className="max-w-full h-auto rounded-lg mb-2" 
                        />
                      )}
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png" 
                      alt="小熊猫" 
                      className="w-8 h-8 rounded-full" 
                    />
                    <div className="text-sm">思考中...</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="border-t p-4 bg-background">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textarea 
                    placeholder="请输入您的问题..."
                    className="min-h-[80px] resize-none"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <InputControls 
                  onVoiceInput={handleVoiceInput}
                  onImageUpload={handleImageUpload}
                  onSubmit={handleSubmit}
                  onClear={handleClear}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorMe;
