
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AccessCodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  onSuccess: () => void;
}

export const AccessCodeDialog = ({ isOpen, onOpenChange, courseId, onSuccess }: AccessCodeDialogProps) => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verifyCode = async () => {
    if (!code.trim()) {
      toast({
        variant: "destructive",
        title: "请输入访问码",
        description: "请输入有效的访问码",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Check if the access code exists and is active for this course
      const { data, error } = await supabase
        .from("access_codes")
        .select("*")
        .eq("code", code.trim())
        .eq("course_id", courseId)
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Error verifying code:", error);
        toast({
          variant: "destructive",
          title: "访问码无效",
          description: "请检查您的访问码并重试",
        });
        return;
      }

      // Store the access in purchased_content table to give user access
      const { error: purchaseError } = await supabase
        .from("purchased_content")
        .insert({
          content_id: courseId,
          content_type: "video_tutorial",
          price: 0,
          currency: "SGD"
        });

      if (purchaseError) {
        console.error("Error recording access:", purchaseError);
        toast({
          variant: "destructive",
          title: "处理错误",
          description: "无法记录您的访问权限，请稍后再试",
        });
        return;
      }

      toast({
        title: "验证成功",
        description: "访问码已验证，您现在可以观看课程内容",
      });
      
      // Call the success callback to update the UI
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        variant: "destructive",
        title: "发生错误",
        description: "验证访问码时出错",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>输入访问码</DialogTitle>
          <DialogDescription>
            请输入您的访问码以查看此内容
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="请输入访问码"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={verifyCode} disabled={!code || isVerifying}>
            {isVerifying ? "验证中..." : "提交"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
