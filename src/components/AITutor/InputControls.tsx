
import { Mic, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useState } from "react";

interface InputControlsProps {
  onVoiceInput: (text: string) => void;
  onImageUpload: (file: File) => void;
}

const InputControls = ({ onVoiceInput, onImageUpload }: InputControlsProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();

  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording(onVoiceInput);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        onImageUpload(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleVoiceInput}
        className={isRecording ? "bg-red-100" : ""}
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => document.getElementById("image-upload")?.click()}
        disabled={isUploading}
      >
        <Image className="h-4 w-4" />
      </Button>
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default InputControls;
