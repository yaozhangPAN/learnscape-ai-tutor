import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface VideoWatermarkProps {
  className?: string;
}

export const VideoWatermark = ({ className }: VideoWatermarkProps) => {
  const { user } = useAuth();
  const email = user?.email || '';
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{ 
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
        backgroundSize: '4px 4px'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-white/30 text-sm font-medium rotate-[-30deg] transform scale-150 whitespace-nowrap"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
        >
          {email} • {currentTime}
        </div>
      </div>
    </div>
  );
};
