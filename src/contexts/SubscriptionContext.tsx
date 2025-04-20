
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
      const { data, error } = await supabase.functions.invoke("check-subscription");

      if (error) {
        throw error;
      }

      setIsPremium(!!data?.isPremium);
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
      // Premium users have access to all content
      if (isPremium) return true;

      // Check if the user has purchased this specific content
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

      // If we found any matching records, the user has access
      return data && data.length > 0;
    } catch (error: any) {
      console.error("Error checking content access:", error.message);
      return false;
    }
  };

  const startCheckoutSession = async (productType: string, productId?: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a purchase.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { productType, productId },
      });

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error("No checkout URL returned");
      }

      return data.url;
    } catch (error: any) {
      console.error("Error creating checkout session:", error.message);
      toast({
        title: "Checkout Failed",
        description: error.message || "Could not create checkout session.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Check premium status when auth state changes
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
