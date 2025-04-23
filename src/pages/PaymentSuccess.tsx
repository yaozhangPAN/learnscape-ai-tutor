
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Crown, ArrowRight, Video } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { checkPremiumStatus } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useI18n();

  const paymentType = searchParams.get("type") || "";
  const contentId = searchParams.get("id") || "";

  useEffect(() => {
    if (user) {
      checkPremiumStatus().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  let title = t.PAYMENT_SUCCESS.TITLE;
  let description = t.PAYMENT_SUCCESS.DESC;
  let icon = <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />;

  if (paymentType === "premium_subscription") {
    title = t.PAYMENT_SUCCESS.TITLE_PREMIUM;
    description = t.PAYMENT_SUCCESS.DESC_PREMIUM;
    icon = <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
  } else if (paymentType === "video_tutorial") {
    title = t.PAYMENT_SUCCESS.TITLE_VIDEO;
    description = t.PAYMENT_SUCCESS.DESC_VIDEO;
    icon = <Video className="w-16 h-16 text-blue-500 mx-auto mb-4" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              <>
                {icon}
                <p className="text-gray-600">{description}</p>
                <div className="flex flex-col space-y-3 pt-4">
                  {paymentType === "premium_subscription" && (
                    <Button asChild className="bg-learnscape-blue hover:bg-blue-700">
                      <Link to="/ai-tutor">
                        {t.PAYMENT_SUCCESS.BUTTON_AI_TUTOR}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {paymentType === "video_tutorial" && contentId && (
                    <Button asChild className="bg-learnscape-blue hover:bg-blue-700">
                      <Link to={`/courses?content=${contentId}`}>
                        {t.PAYMENT_SUCCESS.BUTTON_VIDEO}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link to="/dashboard">
                      {t.PAYMENT_SUCCESS.BUTTON_DASHBOARD}
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
