
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Used to store global AI conversation content or "forwarding" operations (like question & answers)
export function useCapyzenChat() {
  const [pendingContext, setPendingContext] = useState<{
    question?: string;
    answer?: string;
  } | null>(null);

  // Set pending content (for "forward to chat" functionality)
  const forwardToChat = (payload: { question: string; answer: string }) => {
    console.log("Setting pending context:", payload);
    setPendingContext(payload);
  };

  // Reset content
  const clearContext = () => {
    console.log("Clearing context");
    setPendingContext(null);
  };

  // Function to get AI chat response using Supabase function
  const getAIChatResponse = async (messages: Array<{ role: string; content: string }>) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-capyzen-feedback', {
        body: {
          type: "chat",
          messages,
        },
      });

      if (error) {
        console.error("Error getting AI chat response:", error);
        return "AI助教服务器异常，请稍后再试。";
      }

      if (data?.reply) return data.reply;
      return "AI助教暂时无法回复，请稍后再试。";
    } catch (e) {
      console.error("Error getting AI chat response:", e);
      return "AI助教服务器异常，请稍后再试。";
    }
  };

  return { pendingContext, forwardToChat, clearContext, getAIChatResponse };
}
