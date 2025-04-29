
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
      // Changed logic: always check for specific content purchase
      // regardless of premium subscription status
      const { data, error } = await supabase
        .from("purchased_content")
        .select("*")
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error checking purchased content:", error);
        return false;
      }

      // User has access if they specifically purchased this content
      return data && data.length > 0;
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
