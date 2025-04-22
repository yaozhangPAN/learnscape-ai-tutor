
import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

interface LeaderboardSectionProps {
  to: string;
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}
const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ to, className = "", icon, title, desc }) => (
  <Link
    to={to}
    className={`flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative ${className}`}
    style={{ minHeight: 164 }}
  >
    <div className="flex items-center mb-2">{icon}<span className="text-xl font-bold">{title}</span></div>
    <div className="text-base font-medium">{desc}</div>
    <div className="flex-1 flex items-end justify-end">
      <img
        src="/lovable-uploads/5f13138d-564f-4d30-98b9-192d891f3cd4.png"
        alt="Leaderboard Cartoon"
        className="w-24 h-32 object-contain select-none drop-shadow-lg"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </Link>
);

export default LeaderboardSection;
