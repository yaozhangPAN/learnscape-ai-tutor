
import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimTranscriptRef = useRef<string>('');
  const { toast } = useToast();

  const startRecording = async (onTranscriptUpdate: (text: string) => void) => {
    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        throw new Error("Speech recognition is not supported in this browser");
      }

      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          // Update by directly calling the function with the final transcript
          // instead of passing a callback function
          onTranscriptUpdate(transcript);
          interimTranscriptRef.current = '';
        } else {
          interimTranscriptRef.current = transcript;
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "录音出错",
          description: "请重试",
          variant: "destructive",
        });
        stopRecording();
      };

      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "录音已开始",
        description: "请开始说话...",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "无法开始录音",
        description: "请确保允许使用麦克风，并使用支持的浏览器",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast({
        title: "录音已结束",
        description: "已将您的回答添加到文本框中",
      });
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};
