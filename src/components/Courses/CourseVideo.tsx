import React, { useEffect, useRef } from 'react';
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CourseVideoProps {
  bucketName: string;
  filePath: string;
  title: string;
}

export const CourseVideo: React.FC<CourseVideoProps> = ({ bucketName, filePath, title }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [signedUrl, setSignedUrl] = React.useState<string | null>(null);
  const { toast } = useToast();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from(bucketName)
          .createSignedUrl(filePath, 3600); // URL expires in 1 hour

        if (error) {
          console.error('Error getting signed URL:', error);
          return;
        }

        if (data?.signedUrl) {
          setSignedUrl(data.signedUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getSignedUrl();
  }, [bucketName, filePath]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast({
          title: "提示",
          description: "为保护课程内容，切换标签页时视频将暂停播放",
        });
      }
    };

    // Setup fullscreen change event listener
    const handleFullscreenChange = () => {
      if (document.fullscreenElement && videoContainerRef.current) {
        // Make sure watermark is part of fullscreen
        console.log("Fullscreen entered");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [toast]);

  // Function to handle enter fullscreen request
  const handleEnterFullscreen = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-gray-900"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      <div 
        ref={videoContainerRef}
        className="aspect-video relative"
      >
        {signedUrl ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              controlsList="nodownload noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              playsInline
              onLoadedData={() => setIsLoading(false)}
              poster="/placeholder.svg"
              style={{ 
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
              }}
              onDoubleClick={handleEnterFullscreen}
            >
              <source src={signedUrl} type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        
        {isLoading && signedUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-900">
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
    </div>
  );
};
