
import React, { useState } from "react";
import { AITutorChat } from "./AITutorChat";
import { X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const CapyzenChatFloating: React.FC = () => {
  const [open, setOpen] = useState(false);

  // 固定右下角浮动ICON，展开后出现完整聊天面板
  return (
    <>
      {!open && (
        <button
          className="fixed z-50 bottom-8 right-6 bg-white border border-blue-100 shadow-lg rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 transition-all"
          aria-label="打开AI对话"
          onClick={() => setOpen(true)}
          style={{ boxShadow: "0 4px 18px #3b82f633" }}
        >
          <Avatar className="h-12 w-12 border-2 border-blue-200 shadow-md">
            <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
          </Avatar>
        </button>
      )}
      {open && (
        <div className={cn(
          "fixed z-50 bottom-6 right-6 md:right-12 rounded-3xl shadow-2xl border border-blue-200 bg-white w-[95vw] h-[80vh] max-w-md max-h-[700px] flex flex-col"
        )}>
          <div className="flex items-center p-3 border-b border-blue-100 bg-blue-50 rounded-t-3xl">
            <Avatar className="h-8 w-8 mr-2 border border-blue-300">
              <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
            </Avatar>
            <span className="font-bold text-blue-800 text-base flex-1">Capyzen AI助教</span>
            <button
              aria-label="关闭AI对话"
              className="text-blue-500 p-1 rounded hover:bg-blue-100"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <AITutorChat />
          </div>
        </div>
      )}
    </>
  );
};
