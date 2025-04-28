
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

      if (!data?.paymentInfo) {
        throw new Error("No payment information returned");
      }

      // For PayNow payments, redirect to the verification page
      navigate(`/payment-verification?reference=${data.paymentInfo.reference}&type=${productType}${productId ? `&id=${productId}` : ''}`);
      
      return data.paymentInfo.successUrl;
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
