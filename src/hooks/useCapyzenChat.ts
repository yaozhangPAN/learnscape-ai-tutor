
import { useState } from "react";

// 用于存储全局AI对话内容或"转发"操作（如题&答案）
export function useCapyzenChat() {
  const [pendingContext, setPendingContext] = useState<{
    question?: string;
    answer?: string;
  } | null>(null);

  // 设置待对话内容（用于"转发到对话"功能）
  const forwardToChat = (payload: { question: string; answer: string }) => {
    console.log("Setting pending context:", payload);
    setPendingContext(payload);
  };

  // 重置内容
  const clearContext = () => {
    console.log("Clearing context");
    setPendingContext(null);
  };

  return { pendingContext, forwardToChat, clearContext };
}
