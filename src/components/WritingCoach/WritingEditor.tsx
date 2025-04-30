
import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Image, Pencil, Check, Zap } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import TaskPanel from "@/components/WritingCoach/TaskPanel";
import CoachPanel from "@/components/WritingCoach/CoachPanel";

interface WritingEditorProps {
  sessionData?: any;
  imageUrl?: string;
}

const WritingEditor = ({ sessionData, imageUrl }: WritingEditorProps) => {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [wordLimit, setWordLimit] = useState(sessionData?.word_limit || 600);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isGrammarChecking, setIsGrammarChecking] = useState(false);
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();

  // Calculate word count
  useEffect(() => {
    if (lang === 'zh') {
      // For Chinese, count characters (removing spaces)
      setWordCount(essay.replace(/\s+/g, '').length);
    } else {
      // For English, count words
      setWordCount(essay.trim().split(/\s+/).filter(word => word !== '').length);
    }
  }, [essay, lang]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        // In a real implementation, we would upload this file
        toast({
          title: lang === 'zh' ? "图片已上传" : "Image uploaded",
          description: lang === 'zh' ? "处理中..." : "Processing...",
        });
      }
    };
    input.click();
  };

  const handleGrammarCheck = () => {
    setIsGrammarChecking(true);
    // Simulate grammar check processing
    setTimeout(() => {
      setIsGrammarChecking(false);
      toast({
        title: lang === 'zh' ? "语法检查完成" : "Grammar check complete",
        description: lang === 'zh' ? "发现2处语法错误" : "2 grammar issues found",
      });
    }, 1500);
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        await startRecording((transcript) => {
          setEssay((prev) => prev + " " + transcript);
        });
        
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      } catch (error) {
        toast({
          title: lang === 'zh' ? "录音失败" : "Recording failed",
          description: lang === 'zh' ? "请确保浏览器允许访问麦克风" : "Please ensure browser has microphone access",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitDraft = () => {
    if (wordCount < 10) {
      toast({
        title: lang === 'zh' ? "字数不足" : "Not enough words",
        description: lang === 'zh' ? "请至少写10个字" : "Please write at least 10 words",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: lang === 'zh' ? "初稿已提交" : "Draft submitted",
      description: lang === 'zh' ? "导师正在审阅您的作文" : "Your coach is reviewing your essay",
    });
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)]">
      {/* Left Panel - Task Information */}
      <ResizablePanel defaultSize={25} minSize={20}>
        <TaskPanel 
          title={sessionData?.title} 
          prompt={sessionData?.prompt_text}
          gradeLevel={sessionData?.grade_level}
          genre={sessionData?.genre}
          wordLimit={wordLimit}
          imageUrl={imageUrl}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Middle Panel - Writing Area */}
      <ResizablePanel defaultSize={45} minSize={30}>
        <div className="h-full flex flex-col bg-white p-5 rounded-lg shadow border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {lang === 'zh' ? '📝 写作区' : '📝 My Writing Pad'}
            </h2>
            <div className="text-sm font-medium text-gray-500">
              {lang === 'zh' ? `字数: ${wordCount}/${wordLimit}` : `Words: ${wordCount}/${wordLimit}`}
            </div>
          </div>
          
          <Textarea
            ref={textareaRef}
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder={lang === 'zh' ? "在这里开始写作..." : "Start writing here..."}
            className="flex-grow text-base resize-none mb-4"
          />
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={handleImageUpload}
              className="gap-1"
            >
              <Image className="h-4 w-4" />
              {lang === 'zh' ? '上传作文图片' : 'Upload Image'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGrammarCheck}
              disabled={!essay.trim() || isGrammarChecking}
              className="gap-1"
            >
              <Pencil className="h-4 w-4" />
              {isGrammarChecking 
                ? (lang === 'zh' ? '检查中...' : 'Checking...') 
                : (lang === 'zh' ? '语法检查' : 'Grammar Check')}
            </Button>
            
            <Button 
              variant={isRecording ? "secondary" : "outline"}
              onClick={handleVoiceRecord}
              className={`gap-1 ${isRecording ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isRecording 
                ? (lang === 'zh' ? '停止录音' : 'Stop Recording') 
                : (lang === 'zh' ? '语音输入' : 'Voice Input')}
            </Button>
            
            <Button 
              onClick={handleSubmitDraft}
              disabled={!essay.trim()}
              className="gap-1 ml-auto"
            >
              <Zap className="h-4 w-4" />
              {lang === 'zh' ? '提交初稿' : 'Submit Draft'}
            </Button>
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Right Panel - AI Coach */}
      <ResizablePanel defaultSize={30} minSize={25}>
        <CoachPanel 
          essay={essay} 
          lang={lang}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default WritingEditor;
