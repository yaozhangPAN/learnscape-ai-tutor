
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Lock, Crown } from "lucide-react";
import { Course } from '@/types/course';
import { useI18n } from "@/contexts/I18nContext";

interface VideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  isPremium: boolean;
  hasAccess: boolean;
  onSubscribe: () => void;
  onPurchase: () => void;
}

export const VideoDialog: React.FC<VideoDialogProps> = ({
  open,
  onOpenChange,
  course,
  isPremium,
  hasAccess,
  onSubscribe,
  onPurchase,
}) => {
  const { t } = useI18n();
  
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription>{course.description}</DialogDescription>
        </DialogHeader>
        
        {/* Changed condition: Now we only check hasAccess for premium content, not isPremium status */}
        {(!course.isPremium || hasAccess) ? (
          <div className="aspect-video bg-black rounded-md overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4" />
                <p>Video player would be embedded here</p>
                <p className="text-sm text-gray-400 mt-2">
                  This is a placeholder for the actual video content
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">{t.VIDEO_TUTORIALS.PREMIUM_BADGE}</h3>
              <p className="text-gray-600 mb-6">
                {t.SUBSCRIPTION.VIDEO_DESC}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={onPurchase}>
                  {t.SUBSCRIPTION.PURCHASE_VIDEO} ({course.price})
                </Button>
                <Button variant="outline" onClick={onSubscribe}>
                  <Crown className="mr-2 h-4 w-4" />
                  {t.SUBSCRIPTION.SUBSCRIBE_PREMIUM}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
