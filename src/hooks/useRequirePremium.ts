
import { useEffect } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

/**
 * 强制要求为 premium，如果不是，则跳转首页并给出提示。
 */
export function useRequirePremium() {
  const { isPremium, loadingSubscription } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // 只在 premium 校验结束后进行处理
    if (!loadingSubscription && !isPremium) {
      toast({
        title: "仅限会员",
        description: "请先升级为会员后再访问 AI Tutor 功能页。",
        variant: "destructive"
      });
      navigate("/", { replace: true });
    }
  }, [isPremium, loadingSubscription, toast, navigate]);
}
