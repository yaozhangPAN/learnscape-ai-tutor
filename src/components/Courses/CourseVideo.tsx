
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
  const iframeOverlayRef = useRef<HTMLDivElement>(null);

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
    return false;
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

  // Add a CSS class to prevent selection on the entire video container
  const preventSelectionClass = "prevent-selection";
  
  // Add the CSS class to the document head when the component mounts
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .${preventSelectionClass} {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: auto;
      }
      
      .${preventSelectionClass} video::-internal-media-controls-download-button,
      .${preventSelectionClass} iframe::-internal-media-controls-download-button {
        display: none !important;
      }
      
      .${preventSelectionClass} video::-webkit-media-controls-enclosure,
      .${preventSelectionClass} iframe::-webkit-media-controls-enclosure {
        overflow: hidden !important;
      }
      
      .${preventSelectionClass} video::-webkit-media-controls-panel,
      .${preventSelectionClass} iframe::-webkit-media-controls-panel {
        width: calc(100% + 30px) !important;
      }
      
      .iframe-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: transparent;
        display: flex;
        pointer-events: auto;
      }

      /* Only target actual click events but not controls */
      .iframe-overlay.clicked {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle iframe overlay clicks - especially for lesson1 and lesson2
  useEffect(() => {
    if (!iframeOverlayRef.current || !iframeRef.current || !videoUrl) return;
    
    const overlay = iframeOverlayRef.current;
    let clickTimeout: number;
    
    const handleOverlayClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle the 'clicked' class to temporarily disable the overlay
      overlay.classList.add('clicked');
      
      // If it's a YouTube embed, send postMessage to play/pause
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"togglePlayPause","args":""}', '*');
        }
      } catch (err) {
        console.error('Failed to toggle video state:', err);
      }
      
      // Re-enable the overlay after a short delay
      clearTimeout(clickTimeout);
      clickTimeout = window.setTimeout(() => {
        overlay.classList.remove('clicked');
      }, 300);
      
      return false;
    };
    
    overlay.addEventListener('click', handleOverlayClick);
    
    return () => {
      overlay.removeEventListener('click', handleOverlayClick);
      clearTimeout(clickTimeout);
    };
  }, [videoUrl]);

  return (
    <div 
      className={`relative rounded-lg overflow-hidden bg-gray-900 ${preventSelectionClass}`}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onContextMenu={handleContextMenu}
      onDragStart={(e) => e.preventDefault()}
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
              src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}modestbranding=1&enablejsapi=1&rel=0&fs=0&disablekb=1&controls=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={false}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setIsLoading(false)}
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              onContextMenu={handleContextMenu}
            />
            {/* Overlay div to intercept right clicks and control interactions */}
            <div 
              ref={iframeOverlayRef}
              className="iframe-overlay"
              onContextMenu={handleContextMenu} 
            />
          </>
        ) : signedUrl ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              controlsList="nodownload noplaybackrate nofullscreen"
              onContextMenu={handleContextMenu}
              playsInline
              onLoadedData={() => setIsLoading(false)}
              poster="/placeholder.svg"
              style={{ 
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
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
              onClick={(e) => {
                if (videoRef.current) {
                  videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                }
              }}
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
