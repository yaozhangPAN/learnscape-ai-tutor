
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

type SubscriptionBannerProps = {
  type: "ai-tutor" | "daily-recommendation" | "video-tutorial";
  contentId?: string;
};

const SubscriptionBanner = ({ type, contentId }: SubscriptionBannerProps) => {
  const { isPremium, startCheckoutSession, loadingSubscription } = useSubscription();

  const handleSubscribe = async () => {
    if (type === "video-tutorial" && contentId) {
      const checkoutUrl = await startCheckoutSession("video_tutorial", contentId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } else {
      const checkoutUrl = await startCheckoutSession("premium_subscription");
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    }
  };

  if (loadingSubscription) {
    return (
      <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
      </div>
    );
  }

  if (isPremium && type !== "video-tutorial") {
    return null; // Don't show banner for premium users except for individual video tutorials
  }

  let title = "";
  let description = "";

  switch (type) {
    case "ai-tutor":
      title = "Unlock AI Tutor Premium Features";
      description = "Subscribe to our premium plan for unlimited access to our AI Tutor with advanced features.";
      break;
    case "daily-recommendation":
      title = "Get Personalized Daily Recommendations";
      description = "Subscribe to our premium plan to receive personalized learning recommendations every day.";
      break;
    case "video-tutorial":
      title = "Premium Star Teacher Video Lesson";
      description = "Purchase this video lesson or subscribe to our premium plan for unlimited access to all Star Teacher Video Lessons.";
      break;
  }

  return (
    <div className="bg-gradient-to-r from-learnscape-blue/20 to-learnscape-purple/20 border border-learnscape-blue/30 p-6 rounded-lg mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-learnscape-darkBlue flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-learnscape-blue" />
            {title}
          </h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="mt-4">
            <Button 
              onClick={handleSubscribe}
              className="bg-learnscape-blue hover:bg-blue-700"
            >
              {type === "video-tutorial" && contentId 
                ? "Purchase This Video" 
                : "Subscribe for S$99/month"}
            </Button>
            {type === "video-tutorial" && contentId && (
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => startCheckoutSession("premium_subscription")}
              >
                Subscribe to Premium
              </Button>
            )}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-learnscape-blue/20">
          <div className="text-3xl font-bold text-learnscape-blue">S$99</div>
          <div className="text-sm text-gray-500">per month</div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
