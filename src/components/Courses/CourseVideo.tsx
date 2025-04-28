
import React, { useEffect, useRef } from 'react';
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CourseVideoProps {
  bucketName?: string;
  filePath?: string;
  title: string;
  videoUrl?: string;
}

export const CourseVideo: React.FC<CourseVideoProps> = ({ bucketName, filePath, title, videoUrl }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [signedUrl, setSignedUrl] = React.useState<string | null>(null);
  const { toast } = useToast();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (bucketName && filePath) {
      const getSignedUrl = async () => {
        try {
          const { data, error } = await supabase
            .storage
            .from(bucketName)
            .createSignedUrl(filePath, 3600);

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
    }
  }, [bucketName, filePath]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast({
          title: "提示",
          description: "为保护课程内容，切换标签页时视频将暂停播放",
        });
        if (videoRef.current) {
          videoRef.current.pause();
        }
        // Also try to pause embedded videos if possible
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            // Send a postMessage to the iframe to pause the video
            iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          } catch (e) {
            console.error('Failed to pause embedded video:', e);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toast]);

  // Prevent keyboard shortcuts for screenshots or recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common screenshot shortcuts
      if (
        (e.key === 'PrintScreen') || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === '5' || e.key === 'C' || e.key === 'c')) ||
        (e.metaKey && e.shiftKey && (e.key === '5' || e.key === 'C' || e.key === 'c' || e.key === '4'))
      ) {
        e.preventDefault();
        toast({
          title: "提示",
          description: "为保护课程内容，此操作已被禁用",
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toast]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleEnterFullscreen = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  const preventSave = (e: MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  // Apply protection to the document body when component mounts
  useEffect(() => {
    document.body.setAttribute('oncontextmenu', 'return false');
    document.body.addEventListener('mousedown', preventSave);
    
    return () => {
      document.body.removeAttribute('oncontextmenu');
      document.body.removeEventListener('mousedown', preventSave);
    };
  }, []);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-gray-900"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onContextMenu={handleContextMenu}
    >
      <div 
        ref={videoContainerRef}
        className="aspect-video relative"
      >
        {videoUrl ? (
          <>
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}modestbranding=1&enablejsapi=1&rel=0&fs=0&disablekb=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setIsLoading(false)}
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              onContextMenu={handleContextMenu}
            />
            <div 
              className="absolute inset-0 pointer-events-none" 
              onContextMenu={handleContextMenu}
            />
          </>
        ) : signedUrl ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              controlsList="nodownload noplaybackrate"
              onContextMenu={handleContextMenu}
              playsInline
              onLoadedData={() => setIsLoading(false)}
              poster="/placeholder.svg"
              style={{ 
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
              onDoubleClick={handleEnterFullscreen}
            >
              <source src={signedUrl} type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
            <div 
              className="absolute inset-0" 
              style={{ pointerEvents: 'auto' }}
              onContextMenu={handleContextMenu}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        
        {isLoading && (signedUrl || videoUrl) && (
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
