
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Course } from "@/types/course";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

interface LockedCourseContentProps {
  onAccessCodeCheck: () => void;
  onPurchase?: () => void;
  course?: Course;
}

export const LockedCourseContent = ({ 
  onAccessCodeCheck, 
  onPurchase,
  course 
}: LockedCourseContentProps) => {
  const { lang } = useI18n();
  const { toast } = useToast();
  const requiresAccessCode = course?.requiresAccessCode;

  const handlePurchaseClick = () => {
    toast({
      title: "购买课程",
      description: "请联系管理员购买课程，微信zhangliping0801",
      variant: "default",
    });
    
    // Still call the original onPurchase if provided
    if (onPurchase) {
      onPurchase();
    }
  };

  return (
    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-8">
        <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">
          {lang === 'zh' ? '需要访问权限' : 'Access Required'}
        </h3>
        <p className="text-gray-600 mb-6">
          {requiresAccessCode 
            ? (lang === 'zh' ? '您需要输入访问码才能观看此视频。' : 'You need an access code to watch this video.')
            : (lang === 'zh' ? '您需要购买此课程才能观看此视频。' : 'You need to purchase this course to watch this video.')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {requiresAccessCode ? (
            <Button onClick={onAccessCodeCheck}>
              {lang === 'zh' ? '输入访问码' : 'Enter Access Code'}
            </Button>
          ) : (
            <Button onClick={handlePurchaseClick}>
              {lang === 'zh' ? '购买此课程' : 'Purchase This Course'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
