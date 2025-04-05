
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";

type QuestionModuleProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  videoUrl?: string;
  isPremium?: boolean;
  contentId?: string;
  onClick?: () => void;
};

const QuestionModule = ({ 
  title, 
  description, 
  icon, 
  count, 
  color, 
  videoUrl, 
  isPremium = false,
  contentId,
  onClick 
}: QuestionModuleProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const { isPremium: hasSubscription, hasAccessToContent, startCheckoutSession } = useSubscription();
  
  const handleViewClick = async () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (!videoUrl) return;
    
    // If video requires premium access
    if (isPremium) {
      // Check if user has premium subscription or has purchased this content
      const hasAccess = hasSubscription || await hasAccessToContent(contentId || "", "video_tutorial");
      
      if (hasAccess) {
        setShowVideo(true);
      } else {
        // Redirect to payment if they don't have access
        const checkoutUrl = await startCheckoutSession("video_tutorial", contentId);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      }
    } else {
      // Free video - just show it
      setShowVideo(true);
    }
  };

  return (
    <Card className="card-hover border border-gray-100 h-full cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div className="text-2xl font-bold">{count}</div>
        </div>
        <CardTitle className="text-xl font-bold text-learnscape-darkBlue mt-4">
          {title}
          {isPremium && !hasSubscription && (
            <Lock className="inline-block ml-2 h-4 w-4 text-learnscape-blue" />
          )}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {showVideo && videoUrl ? (
          <div className="aspect-video w-full rounded-md overflow-hidden">
            <video 
              controls 
              className="w-full h-full" 
              src={videoUrl}
              poster="/placeholder.svg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleViewClick}
          className={`w-full flex items-center justify-center ${color.includes('bg-learnscape-blue') ? 'text-white' : ''}`}
        >
          {showVideo && videoUrl ? "Close Video" : "View All"}
          {!showVideo && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionModule;
