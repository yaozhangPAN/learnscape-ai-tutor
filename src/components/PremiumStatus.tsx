
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Crown, Star, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

const PremiumStatus = () => {
  const { isPremium, startCheckoutSession, loadingSubscription } = useSubscription();

  const handleSubscribe = async () => {
    const checkoutUrl = await startCheckoutSession("premium_subscription");
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  if (loadingSubscription) {
    return (
      <Card className="h-full animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </CardFooter>
      </Card>
    );
  }

  if (isPremium) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Crown className="h-5 w-5 text-green-500" /> Premium Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-green-500 text-green-500" />
            ))}
          </div>
          <p className="text-emerald-800">
            You have full access to all premium features including AI Tutor, Daily Recommendations,
            and all Video Tutorials.
          </p>
        </CardContent>
        <CardFooter className="border-t border-green-200 pt-3">
          <p className="text-sm text-emerald-700">
            Thank you for being a premium member!
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-[#FFFDE7] border border-yellow-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-learnscape-darkBlue">Upgrade to Premium</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Get unlimited access to AI Tutor, Daily Recommendations, and all Video Tutorials.
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-[#FFA500] mt-0.5 mr-1 flex-shrink-0" />
            <span>Unlimited AI tutor sessions</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-[#FFA500] mt-0.5 mr-1 flex-shrink-0" />
            <span>Personalized daily recommendations</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-4 w-4 text-[#FFA500] mt-0.5 mr-1 flex-shrink-0" />
            <span>Access to all premium video tutorials</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="border-t border-yellow-100 pt-3">
        <Button 
          onClick={handleSubscribe}
          variant="orange" 
          className="w-full"
        >
          <Crown className="mr-2 h-4 w-4" />
          Subscribe for S$99/month
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumStatus;
