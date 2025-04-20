
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
    setIsVerifying(true);
    try {
      const { data, error } = await supabase
        .from("access_codes")
        .select()
        .eq("code", code)
        .eq("course_id", courseId)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        toast({
          variant: "destructive",
          title: "Invalid access code",
          description: "Please check your access code and try again.",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Access code verified successfully.",
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while verifying your access code.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Access Code</DialogTitle>
          <DialogDescription>
            Please enter your access code to view this content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter your access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={verifyCode} disabled={!code || isVerifying}>
            {isVerifying ? "Verifying..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
