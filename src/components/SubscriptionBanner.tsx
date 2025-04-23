
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

type SubscriptionBannerProps = {
  type: "ai-tutor" | "daily-recommendation" | "video-tutorial";
  contentId?: string;
};

const SubscriptionBanner = ({ type, contentId }: SubscriptionBannerProps) => {
  const { isPremium, startCheckoutSession, loadingSubscription } = useSubscription();
  const { t } = useI18n();

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
    return null;
  }

  let title = "";
  let description = "";

  switch (type) {
    case "ai-tutor":
      title = t.SUBSCRIPTION.AI_TUTOR_TITLE;
      description = t.SUBSCRIPTION.AI_TUTOR_DESC;
      break;
    case "daily-recommendation":
      title = t.SUBSCRIPTION.DAILY_REC_TITLE;
      description = t.SUBSCRIPTION.DAILY_REC_DESC;
      break;
    case "video-tutorial":
      title = t.SUBSCRIPTION.VIDEO_TITLE;
      description = t.SUBSCRIPTION.VIDEO_DESC;
      break;
  }

  return (
    <div className="bg-[#FFFDE7] border border-learnscape-blue/30 p-6 rounded-lg mb-6">
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
              className="bg-[#FFA500] hover:bg-[#FF6F00] text-white"
            >
              {type === "video-tutorial" && contentId 
                ? t.SUBSCRIPTION.PURCHASE_VIDEO
                : t.SUBSCRIPTION.SUBSCRIBE_BUTTON}
            </Button>
            {type === "video-tutorial" && contentId && (
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => startCheckoutSession("premium_subscription")}
              >
                {t.SUBSCRIPTION.SUBSCRIBE_PREMIUM}
              </Button>
            )}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-learnscape-blue/20">
          <div className="text-3xl font-bold text-learnscape-blue">???</div>
          <div className="text-sm text-gray-500">{t.SUBSCRIPTION.PER_MONTH}</div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
