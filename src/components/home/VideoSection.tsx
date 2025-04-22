
import React from "react";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";

interface VideoSectionProps {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const VideoSection: React.FC<VideoSectionProps> = ({ to, className, icon, title, desc }) => (
  <Link 
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className}`}
    style={{ minHeight: 180 }}>
    <div>
      <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
      <div className="text-sm font-medium">{desc}</div>
    </div>
    <div className="flex-1 flex items-end justify-end pr-2">
      <img
        src="/lovable-uploads/02c00429-df63-4436-8a1b-a1a76314f56e.png"
        alt="Video Lessons Cartoon Character"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);
export default VideoSection;
