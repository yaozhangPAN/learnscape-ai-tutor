
import React, { useState, useEffect } from "react";
import { AITutorChat } from "./AITutorChat";
import { X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

export const CapyzenChatFloating: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { isPremium, startCheckoutSession } = useSubscription();
  const { toast } = useToast();

  // Listen for the custom event to open the chat
  useEffect(() => {
    const handleChatOpen = () => {
      console.log("Custom event received: capyzen-chat-open");
      if (isPremium) {
        setOpen(true);
      } else {
        toast({
          title: "仅限付费会员",
          description: (
            <div className="flex flex-col gap-2">
              <div>开通会员即可使用AI助教聊天功能</div>
              <button
                onClick={async () => {
                  const url = await startCheckoutSession("premium_subscription");
                  if (url) window.location.href = url;
                }}
                className="text-white bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg px-3 py-1 mt-1 font-semibold shadow hover:scale-105 transition-all"
                style={{ maxWidth: 130 }}
              >
                立即开通
              </button>
            </div>
          ),
          variant: "destructive"
        });
      }
    };
    
    window.addEventListener("capyzen-chat-open", handleChatOpen);
    
    return () => {
      window.removeEventListener("capyzen-chat-open", handleChatOpen);
    };
  }, [isPremium, toast, startCheckoutSession]);

  const handleButtonClick = () => {
    if (isPremium) {
      setOpen(true);
    } else {
      toast({
        title: "仅限付费会员",
        description: (
          <div className="flex flex-col gap-2">
            <div>开通会员即可使用AI助教聊天功能</div>
            <button
              onClick={async () => {
                const url = await startCheckoutSession("premium_subscription");
                if (url) window.location.href = url;
              }}
              className="text-white bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg px-3 py-1 mt-1 font-semibold shadow hover:scale-105 transition-all"
              style={{ maxWidth: 130 }}
            >
              立即开通
            </button>
          </div>
        ),
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {!open && (
        <button
          className={cn(
            "fixed z-50 bottom-8 right-6 bg-gradient-to-tr from-yellow-400 via-blue-400 to-orange-400 border-4 border-blue-400 shadow-2xl rounded-full w-28 h-28 flex items-center justify-center hover:scale-125 transition-all duration-300"
          )}
          aria-label="打开AI对话"
          onClick={handleButtonClick}
          style={{ boxShadow: "0 10px 40px 0 #3b82f6aa" }}
        >
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
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

