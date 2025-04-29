import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCourses } from "@/data/mockCourses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AccessCodeDialog } from "@/components/Courses/AccessCodeDialog";
import { AccessCodeManager } from "@/components/Courses/AccessCodeManager";
import { CourseHeader } from "@/components/Courses/CourseHeader";
import { CourseContent } from "@/components/Courses/CourseContent";
import { useToast } from "@/hooks/use-toast";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const { hasAccessToContent, startCheckoutSession } = useSubscription();
  
  const course = mockCourses.find(c => c.id === courseId);

  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(user?.email === 'admin@example.com');
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    const checkAccess = async () => {
      if (!courseId || !user) {
        setHasAccess(false);
        return;
      }

      // Free courses that don't require access codes are always accessible
      if (course && !course.isPremium && !course.requiresAccessCode) {
        setHasAccess(true);
        return;
      }

      // For all other courses (premium or requiring access code),
      // we now check if the user has purchased specific access
      const access = await hasAccessToContent(courseId, "video_tutorial");
      setHasAccess(access);
    };

    checkAccess();
  }, [courseId, user, hasAccessToContent, course]);

  if (!course) {
    return <div>课程未找到</div>;
  }

  const handleAccessCodeCheck = () => {
    setAccessCodeDialogOpen(true);
  };

  const handleAccessCodeSuccess = () => {
    setHasAccess(true);
  };

  const handlePurchaseCourse = async () => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "您需要先登录才能购买课程",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Show purchase instructions toast
    toast({
      title: "购买课程",
      description: "请联系管理员购买课程，微信zhangliping0801",
      variant: "default",
    });

    // Keep the original checkout code but it won't be reached in normal flow
    try {
      const checkoutUrl = await startCheckoutSession("video_tutorial", courseId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error: any) {
      console.error("Failed to initiate checkout:", error);
      toast({
        title: "购买失败",
        description: "无法启动购买流程，请稍后再试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="max-w-5xl mx-auto w-full space-y-8">
            <CourseHeader course={course} />
            <CourseContent
              hasAccess={hasAccess}
              isAdmin={isAdmin}
              courseId={courseId || ''}
              courseTitle={course.title}
              onAccessCodeCheck={handleAccessCodeCheck}
              onPurchase={handlePurchaseCourse}
            />
          </div>
          
          {isAdmin && (
            <div className="max-w-5xl mx-auto w-full">
              <AccessCodeManager courseId={courseId || ''} />
            </div>
          )}
        </div>
      </div>

      <AccessCodeDialog
        isOpen={accessCodeDialogOpen}
        onOpenChange={setAccessCodeDialogOpen}
        courseId={courseId || ''}
        onSuccess={handleAccessCodeSuccess}
      />
      <Footer />
    </div>
  );
};

export default CourseDetails;
