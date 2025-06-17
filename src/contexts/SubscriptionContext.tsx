
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

type SubscriptionContextType = {
  isPremium: boolean;
  checkPremiumStatus: () => Promise<void>;
  hasAccessToContent: (contentId: string, contentType: string) => Promise<boolean>;
  startCheckoutSession: (productType: string, productId?: string) => Promise<string | null>;
  loadingSubscription: boolean;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const checkPremiumStatus = async () => {
    if (!user) {
      setIsPremium(false);
      setLoadingSubscription(false);
      return;
    }

    try {
      setLoadingSubscription(true);
      
      // Check directly in the database if user has an active subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("subscription_type", "premium")
        .eq("status", "active")
        .lt("start_date", new Date().toISOString())
        .gt("end_date", new Date().toISOString())
        .maybeSingle();

      if (subscriptionError) {
        console.error("Error checking subscription:", subscriptionError);
        setIsPremium(false);
      } else {
        setIsPremium(!!subscriptionData);
      }
    } catch (error: any) {
      console.error("Error checking premium status:", error.message);
      toast({
        title: "Subscription Check Failed",
        description: "Could not verify your subscription status.",
        variant: "destructive",
      });
      setIsPremium(false);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const hasAccessToContent = async (contentId: string, contentType: string) => {
    if (!user) return false;

    try {
      // 修改逻辑: 检查特定课程系列与单个课程
      // 首先检查用户是否购买了整个课程系列
      const seriesIdMap: Record<string, string> = {
        'psle-chinese-masterclass-lesson1': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson2': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson3': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson4': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson5': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson6': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson7': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson8': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson9': 'psle-chinese-comprehension-composition',
        'psle-chinese-masterclass-lesson10': 'psle-chinese-comprehension-composition',
        // 添加 oral comprehension 2 系列的映射
        'psle-oral-comprehension2-lesson1': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson2': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson3': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson4': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson5': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson6': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson7': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson8': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson9': 'psle-oral-comprehension2-series',
        'psle-oral-comprehension2-lesson10': 'psle-oral-comprehension2-series',
      };
      
      // 检查是否有系列映射
      const seriesId = seriesIdMap[contentId];
      
      // 如果有系列ID，首先检查系列访问权限
      if (seriesId) {
        const { data: seriesData, error: seriesError } = await supabase
          .from("purchased_content")
          .select("*")
          .eq("content_id", seriesId)
          .eq("content_type", contentType)
          .eq("user_id", user.id)
          .maybeSingle();
          
        if (seriesError) {
          console.error("Error checking series access:", seriesError);
        } else if (seriesData) {
          // 如果购买了系列，则授予访问权限
          return true;
        }
      }
      
      // 检查单个课程访问权限（原有逻辑）
      const { data, error } = await supabase
        .from("purchased_content")
        .select("*")
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking purchased content:", error);
        return false;
      }

      // 用户有访问权限，如果他们特定购买了此内容
      return data !== null;
    } catch (error: any) {
      console.error("Error checking content access:", error.message);
      return false;
    }
  };

  // Simplified startCheckoutSession function that just returns null
  const startCheckoutSession = async (productType: string, productId?: string) => {
    // Instead of starting a checkout session, we just show the toast message in the UI
    return null;
  };

  useEffect(() => {
    if (user) {
      checkPremiumStatus();
    } else {
      setIsPremium(false);
      setLoadingSubscription(false);
    }
  }, [user?.id]);

  return (
    <SubscriptionContext.Provider
      value={{
        isPremium,
        checkPremiumStatus,
        hasAccessToContent,
        startCheckoutSession,
        loadingSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
