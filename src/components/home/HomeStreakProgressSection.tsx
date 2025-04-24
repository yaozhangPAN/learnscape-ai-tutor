
import React from "react";
import MaskOverlay from "../MaskOverlay";
import { useToast } from "@/hooks/use-toast";

interface Props {
  to: string;
  title: string;
  img: string;
}

const HomeStreakProgressSection: React.FC<Props> = ({
  to, title, img
}) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "功能升级中",
      description: "此功能正在开发中，敬请期待！",
    });
  };

  return (
    <div 
      className="flex flex-col rounded-2xl p-4 sm:p-6 shadow-lg relative bg-white text-[#6D5A21] min-h-[180px] overflow-hidden cursor-pointer w-full"
    >
      <div className="absolute top-3 left-3 z-10 bg-white/80 rounded-lg px-4 py-1 font-bold text-[#C48829] text-lg shadow">{title}</div>
      <img
        src={img}
        alt="Streak and Progress Block"
        className="object-cover w-full h-full opacity-100 rounded-2xl"
        style={{ position: "absolute", inset: 0, zIndex: 0, userSelect: "none" }}
        draggable={false}
      />
      <div className="absolute inset-0 rounded-2xl bg-yellow-100 opacity-0 hover:opacity-20 transition-opacity z-10"></div>
      <div className="flex-1 z-20"></div>
      <MaskOverlay onClick={handleClick} />
    </div>
  );
};

export default HomeStreakProgressSection;
