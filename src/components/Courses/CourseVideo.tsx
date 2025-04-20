
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTracking, setPlaybackTracking] = useState<{startTime: number, position: number} | null>(null);

  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        // Generate shorter-lived URL for better security (30 minutes)
        const { data, error } = await supabase
          .storage
          .from(bucketName)
          .createSignedUrl(filePath, 1800);

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
    
    // Refresh URL periodically to prevent expiration during viewing
    const urlRefreshInterval = setInterval(() => {
      if (isPlaying) {
        getSignedUrl();
      }
    }, 1500000); // Refresh after 25 minutes (before 30 min expiry)
    
    return () => clearInterval(urlRefreshInterval);
  }, [bucketName, filePath, isPlaying]);

  useEffect(() => {
    // Handle visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause the video when switching tabs
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        
        toast({
          title: "提示",
          description: "为保护课程内容，切换标签页时视频将暂停播放",
        });
      }
    };

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      if (document.fullscreenElement && videoContainerRef.current) {
        console.log("Fullscreen entered");
      }
    };
    
    // Handle browser print attempts
    const handlePrint = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = "Printing is disabled for this content");
    };
    
    // Track video playback for analytics and limit simultaneous viewing
    const trackPlayback = () => {
      if (user && videoRef.current) {
        setIsPlaying(true);
        setPlaybackTracking({
          startTime: Date.now(),
          position: videoRef.current.currentTime
        });
        
        // Log playback start (could send to server in production)
        console.log(`Video playback started by ${user.email} at position ${videoRef.current.currentTime}`);
      }
    };
    
    const trackPause = () => {
      if (user && videoRef.current && playbackTracking) {
        setIsPlaying(false);
        const duration = (Date.now() - playbackTracking.startTime) / 1000;
        const newPosition = videoRef.current.currentTime;
        
        // Log playback details (could send to server in production)
        console.log(`Video paused by ${user.email} after ${duration.toFixed(2)}s of playback`);
        console.log(`Watched from position ${playbackTracking.position} to ${newPosition}`);
        
        setPlaybackTracking(null);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("beforeprint", handlePrint as any);
    
    // Add listeners to video element if it exists
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", trackPlayback);
      videoElement.addEventListener("pause", trackPause);
    }
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("beforeprint", handlePrint as any);
      
      if (videoElement) {
        videoElement.removeEventListener("play", trackPlayback);
        videoElement.removeEventListener("pause", trackPause);
      }
    };
  }, [toast, user, playbackTracking]);

  // Function to handle enter fullscreen request
  const handleEnterFullscreen = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  // Function to detect screen recording attempts (basic)
  useEffect(() => {
    const checkScreenCapture = async () => {
      try {
        if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
          // This will trigger browser permission dialog, but it helps detect recording attempts
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          
          // If we get here, user allowed screen sharing/recording
          stream.getTracks().forEach(track => track.stop());
          
          toast({
            title: "警告",
            description: "检测到屏幕录制行为，请勿录制或分享课程内容",
            variant: "destructive"
          });
          
          // For production, you might want to log this event or take other actions
          console.log("Screen recording attempt detected");
        }
      } catch (err) {
        // User denied permission or other error
        console.log("Screen recording check failed or was denied");
      }
    };
    
    // We only perform this check once when the component loads
    // In production, you might want to do this periodically
    if (user && signedUrl) {
      //checkScreenCapture(); // Commented out as it can be intrusive to users
    }
  }, [signedUrl, user, toast]);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-gray-900"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      // Disable drag & drop
      onDragStart={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
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
              controlsList="nodownload noplaybackrate nofullscreen"
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
              // Disable picture-in-picture mode
              disablePictureInPicture
              // Add custom data attribute with encrypted user ID for forensic watermarking
              data-viewer={user ? btoa(user.id) : ''}
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
