import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { TutorSelectors } from "./TutorSelectors";
import { AIModelSelector } from "./AIModelSelector";
import { TutorTips } from "./TutorTips";
import { TutorResponse } from "./TutorResponse";
import TutorCharacter from "./TutorCharacter";
import InputControls from "./InputControls";

const subjects = [
  { value: "math", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "chinese", label: "Chinese" },
  { value: "science", label: "Science" }
];

const TutorMe = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [subject, setSubject] = useState("math");
  const [level, setLevel] = useState("primary-4");
  const [isLoading, setIsLoading] = useState(false);
  const [isFireball, setIsFireball] = useState(true);
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
      if (isFireball) {
        const { data, error } = await supabase.functions.invoke('fireball-tutor', {
          body: { prompt: question }
        });
        
        if (error) throw error;
        
        setResponse(`
          <div class="flex items-start gap-4">
            <img src="/lovable-uploads/dc7bd353-69bb-44b9-b3f0-158965f3a8eb.png" alt="Fireball" class="w-12 h-12 rounded-full" />
            <div>
              ${data.reply.replace(/\n/g, '<br>')}
            </div>
          </div>
        `);
      } else {
        if (subject === "math") {
          setResponse(`
            <h3>Solution Approach</h3>
            <p>To solve this problem, we need to break it down into steps:</p>
            
            <ol>
              <li>Identify what we're looking for: the area of the rectangle</li>
              <li>Remember that Area = Length × Width</li>
              <li>Use the given information to find the length and width</li>
              <li>Multiply these values to find the area</li>
            </ol>
            
            <h3>Solution</h3>
            <p>Given that the length is 12 cm and the width is 5 cm:</p>
            <p>Area = 12 cm × 5 cm = 60 cm²</p>
            
            <h3>Check</h3>
            <p>We can verify this by drawing a rectangle with these dimensions and counting the square units.</p>
            
            <h3>Would you like to try a similar problem?</h3>
            <p>Find the area of a rectangle with length 8 cm and width 6 cm.</p>
          `);
        } else if (subject === "science") {
          setResponse(`
            <h3>Understanding the Water Cycle</h3>
            <p>The water cycle is the continuous movement of water on, above, and below the Earth's surface. It involves several key processes:</p>
            
            <ul>
              <li><strong>Evaporation:</strong> Water from oceans, lakes, and rivers turns into water vapor due to heat from the sun.</li>
              <li><strong>Condensation:</strong> As water vapor rises and cools, it forms clouds.</li>
              <li><strong>Precipitation:</strong> When water droplets in clouds become heavy enough, they fall as rain, snow, or hail.</li>
              <li><strong>Collection:</strong> Water returns to oceans, lakes, and rivers, or seeps into the ground.</li>
            </ul>
            
            <p>This cycle is crucial for life on Earth as it provides fresh water and helps regulate temperature.</p>
            
            <h3>Would you like to learn more about any specific part of the water cycle?</h3>
          `);
        } else if (subject === "chinese") {
          setResponse(`
            <h3>学习中文</h3>
            <p>欢迎来到中文学习模块！</p>
            
            <h3>学习重点</h3>
            <ul>
              <li>语法基础</li>
              <li>词汇积累</li>
              <li>听说读写全面发展</li>
            </ul>
            
            <p>我们将帮助您逐步提高中文水平。</p>
          `);
        } else {
          setResponse(`
            <h3>Understanding Your Question</h3>
            <p>I'd be happy to help with your question about ${subjects.find(s => s.value === subject)?.label}.</p>
            
            <p>Based on the Primary ${level.split('-')[1]} level curriculum in Singapore, here's what you need to know:</p>
            
            <p>Your question touches on key concepts that students your age are learning. Let's break it down:</p>
            
            <h3>Key Concepts</h3>
            <ul>
              <li>First, we need to understand the main idea</li>
              <li>Then, apply the relevant methods we've learned</li>
              <li>Finally, check our answer to make sure it makes sense</li>
            </ul>
            
            <p>Does this help you understand the problem better? I can explain any part in more detail if you'd like.</p>
          `);
        }
      }
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

  const handleClear = () => {
    setQuestion("");
    setResponse("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue">AI 导师</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClear}>清空</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "思考中..." : "提问"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 space-y-4">
          <AIModelSelector 
            isFireball={isFireball} 
            onModelChange={(v) => setIsFireball(v === "fireball")} 
          />
          <TutorSelectors 
            subject={subject}
            level={level}
            onSubjectChange={setSubject}
            onLevelChange={setLevel}
          />
          <TutorTips />
        </div>
        
        <div className="md:col-span-3 space-y-6">
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
          
          <TutorResponse response={response} />
        </div>
      </div>
    </div>
  );
};

export default TutorMe;
