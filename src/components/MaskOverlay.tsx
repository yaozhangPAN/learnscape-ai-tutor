
import React from "react";
import { useI18n } from "@/contexts/I18nContext";

interface MaskOverlayProps {
  onClick?: () => void;
  className?: string;
}

const MaskOverlay: React.FC<MaskOverlayProps> = ({ onClick, className = "" }) => {
  const { t, lang } = useI18n();
  
  return (
    <div 
      onClick={onClick}
      className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl cursor-pointer transition-all hover:bg-black/70 ${className}`}
    >
      <div className="text-center text-white px-4">
        <h3 className="text-xl font-bold mb-2">{lang === "zh" ? "服务升级中" : "Coming Soon"}</h3>
        <p className="text-sm opacity-90">{lang === "zh" ? "敬请期待" : "Stay tuned!"}</p>
      </div>
    </div>
  );
};

export default MaskOverlay;
