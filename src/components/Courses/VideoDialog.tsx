
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
  const { lang } = useI18n();
  
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-[#2F5530]">{course.title}</DialogTitle>
          <DialogDescription>{course.description}</DialogDescription>
        </DialogHeader>
        
        {(isPremium || !course.isPremium || hasAccess) ? (
          <div className="aspect-video bg-black rounded-md overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4" />
                <p>{lang === "zh" ? "视频播放器将嵌入在此处" : "Video player would be embedded here"}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {lang === "zh" ? "这是实际视频内容的占位符" : "This is a placeholder for the actual video content"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-[#2F5530]">
                {lang === "zh" ? "高级内容" : "Premium Content"}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === "zh" 
                  ? "观看此视频教程需要购买或订阅高级会员。"
                  : "This video tutorial requires a purchase or premium subscription to access."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-[#26A69A] hover:bg-[#1E8276] text-white"
                  onClick={onPurchase}
                >
                  {lang === "zh" ? `购买 (${course.price})` : `Purchase (${course.price})`}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#2F5530] text-[#2F5530] hover:bg-[#2F5530] hover:text-white"
                  onClick={onSubscribe}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  {lang === "zh" ? "订阅高级会员" : "Subscribe to Premium"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
