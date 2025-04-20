
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LockedCourseContentProps {
  onAccessCodeCheck: () => void;
}

export const LockedCourseContent = ({ onAccessCodeCheck }: LockedCourseContentProps) => {
  return (
    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-8">
        <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">需要访问权限</h3>
        <p className="text-gray-600 mb-6">
          您需要购买此课程或输入访问码才能观看此视频。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onAccessCodeCheck}>
            输入访问码
          </Button>
        </div>
      </div>
    </div>
  );
};
