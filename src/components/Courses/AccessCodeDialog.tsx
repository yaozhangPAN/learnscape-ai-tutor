
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
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  const verifyCode = async () => {
    if (!code.trim()) {
      toast({
        variant: "destructive",
        title: "请输入访问码",
        description: "请输入有效的访问码",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "请先登录",
        description: "您需要登录才能使用访问码",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Check if the access code exists and is active
      const { data: accessCode, error: accessCodeError } = await supabase
        .from("access_codes")
        .select("*")
        .eq("code", code.trim())
        .eq("course_id", courseId)
        .eq("is_active", true)
        .single();

      if (accessCodeError || !accessCode) {
        toast({
          variant: "destructive",
          title: "访问码无效",
          description: "请检查您的访问码并重试",
        });
        return;
      }

      // Check if user already has access
      const { data: existingAccess } = await supabase
        .from("purchased_content")
        .select("*")
        .eq("content_id", courseId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingAccess) {
        toast({
          title: "已有访问权限",
          description: "您已经拥有此课程的访问权限",
        });
        onSuccess();
        onOpenChange(false);
        return;
      }

      // Begin transaction
      const { error: purchaseError } = await supabase
        .from("purchased_content")
        .insert({
          content_id: courseId,
          content_type: "video_tutorial",
          price: 0,
          currency: "SGD",
          user_id: user.id
        });

      if (purchaseError) {
        console.error("Error recording access:", purchaseError);
        throw purchaseError;
      }

      // Add enrollment record
      const { error: enrollmentError } = await supabase
        .from("course_enrollments")
        .insert({
          course_id: courseId,
          user_id: user.id,
          class_type: "video"
        });

      if (enrollmentError) {
        console.error("Error recording enrollment:", enrollmentError);
        throw enrollmentError;
      }

      toast({
        title: "验证成功",
        description: "访问码已验证，您现在可以观看课程内容",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Full error:", error);
      toast({
        variant: "destructive",
        title: "发生错误",
        description: "验证访问码时出错，请稍后再试",
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
