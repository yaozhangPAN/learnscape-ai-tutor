
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
    if (!user) {
      toast({
        variant: "destructive",
        title: "需要登录",
        description: "请先登录以使用访问码。",
      });
      return;
    }

    setIsVerifying(true);
    try {
      console.log("Verifying access code for course:", courseId);
      // First verify the access code exists and is valid
      const { data: accessCode, error: accessCodeError } = await supabase
        .from("access_codes")
        .select()
        .eq("code", code)
        .eq("course_id", courseId)
        .eq("is_active", true)
        .single();

      if (accessCodeError || !accessCode) {
        console.error("Access code validation error:", accessCodeError);
        toast({
          variant: "destructive",
          title: "无效的访问码",
          description: "请检查您的访问码并重试。",
        });
        setIsVerifying(false);
        return;
      }

      console.log("Access code validated successfully:", accessCode.id);

      // Check if the user already has access to this content
      const { data: existingAccess, error: existingAccessError } = await supabase
        .from("purchased_content")
        .select()
        .eq("user_id", user.id)
        .eq("content_id", courseId)
        .eq("content_type", "video_tutorial");
      
      if (existingAccessError) {
        console.error("Error checking existing access:", existingAccessError);
      }
      
      if (existingAccess && existingAccess.length > 0) {
        console.log("User already has access to this course");
        toast({
          title: "已经验证",
          description: "您的访问码已经验证过，已有访问权限。",
        });
        onSuccess();
        onOpenChange(false);
        return;
      }

      // Since we can't use the RPC function due to TypeScript errors, let's use a direct insert instead
      const { data: insertData, error: insertError } = await supabase
        .from("purchased_content")
        .insert({
          user_id: user.id,
          content_id: courseId,
          content_type: 'video_tutorial',
          price: 0,
          currency: 'SGD',
          payment_reference: `access_code:${code}`
        })
        .select();

      if (insertError) {
        console.error("Error recording access via direct insert:", insertError);
        toast({
          variant: "destructive",
          title: "错误",
          description: "记录您的访问权限时出错，请稍后再试。",
        });
        setIsVerifying(false);
        return;
      }

      console.log("Access successfully recorded:", insertData);
      toast({
        title: "验证成功！",
        description: "访问码验证成功。",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "验证访问码时出错。",
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
            请输入您的访问码以查看此内容。
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="输入您的访问码"
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
