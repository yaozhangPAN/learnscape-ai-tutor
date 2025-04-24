
import React from "react";
import MaskOverlay from "../MaskOverlay";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardSectionProps {
  to: string;
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ 
  to, 
  className = "", 
  icon, 
  title, 
  desc 
}) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "功能升级中",
      description: "此功能正在开发中，敬请期待！",
    });
  };

  return (
    <div className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className}`} style={{ minHeight: 164 }}>
      <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
      <div className="text-base font-medium">{desc}</div>
      <div className="flex-1 flex items-end justify-end">
        <img
          src="/lovable-uploads/1eabcd5f-326e-4849-bf2d-db471b7a4428.png"
          alt="Leaderboard Red Panda Cartoon"
          className="w-24 h-32 object-contain select-none drop-shadow-lg"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>
      <MaskOverlay onClick={handleClick} />
    </div>
  );
};

export default LeaderboardSection;
