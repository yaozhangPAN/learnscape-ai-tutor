
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { TutorResponse } from "./TutorResponse";
import TutorCharacter from "./TutorCharacter";
import InputControls from "./InputControls";

const TutorMe = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
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

      setQuestion((prev) => 
        prev + `\n[上传的图片: ${data.path}]\n请帮我分析这张图片。`
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
    
    try {
      const { data, error } = await supabase.functions.invoke('fireball-tutor', {
        body: { prompt: question }
      });
      
      if (error) throw error;
      
      setResponse(`
        <div class="flex items-start gap-4">
          <img src="/lovable-uploads/41bfbaa7-c654-469f-ac7e-8a2a618c3f2c.png" alt="小熊猫" class="w-12 h-12 rounded-full" />
          <div>
            ${data.reply.replace(/\n/g, '<br>')}
          </div>
        </div>
      `);
    } catch (error) {
      toast({
        title: "提问失败",
        description: "抱歉，暂时无法回答您的问题，请稍后再试。",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue">AI 小熊猫导师</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            setQuestion("");
            setResponse("");
          }}>清空</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "思考中..." : "提问"}
          </Button>
        </div>
      </div>
      
      <div className="space-y-6 border p-4 rounded-lg bg-white shadow-sm">
        <TutorCharacter />
        
        <div className="space-y-2">
          <label className="text-sm font-medium block">您的问题</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Textarea 
                placeholder="请输入您的问题..."
                className="min-h-[150px] resize-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <InputControls 
              onVoiceInput={handleVoiceInput}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
        
        {response && <TutorResponse response={response} />}
      </div>
    </div>
  );
};

export default TutorMe;
