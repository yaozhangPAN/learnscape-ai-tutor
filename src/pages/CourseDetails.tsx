import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockCourses } from "@/data/mockCourses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AccessCodeDialog } from "@/components/Courses/AccessCodeDialog";
import { AccessCodeManager } from "@/components/Courses/AccessCodeManager";
import { CourseHeader } from "@/components/Courses/CourseHeader";
import { CourseContent } from "@/components/Courses/CourseContent";
import { VideoDialog } from "@/components/Courses/VideoDialog";
import { useToast } from "@/hooks/use-toast";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const { hasAccessToContent, startCheckoutSession, isPremium } = useSubscription();
  const { toast } = useToast();
  
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

      if (course && !course.isPremium && !course.requiresAccessCode) {
        setHasAccess(true);
        return;
      }

      if (course && course.id.includes('psle-chinese-masterclass')) {
        const access = await hasAccessToContent(courseId, "video_tutorial");
        setHasAccess(access || isPremium || isAdmin);
        return;
      }

      if (isPremium || isAdmin) {
        setHasAccess(true);
        return;
      }

      const access = await hasAccessToContent(courseId, "video_tutorial");
      setHasAccess(access);
    };

    checkAccess();
  }, [courseId, user, hasAccessToContent, course, isPremium, isAdmin]);

  if (!course) {
    return <div>课程未找到</div>;
  }

  const handleAccessCodeCheck = () => {
    setAccessCodeDialogOpen(true);
  };

  const handleAccessCodeSuccess = () => {
    setHasAccess(true);
  };

  const handleWatchVideo = () => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "您需要登录才能观看此视频。",
        variant: "destructive",
      });
      return;
    }
    
    if (hasAccess || isAdmin) {
      setVideoDialogOpen(true);
    } else {
      handlePurchaseOrSubscribe();
    }
  };

  const handlePurchaseOrSubscribe = async () => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "您需要登录才能购买或订阅课程。",
        variant: "destructive",
      });
      return;
    }

    const isMasterclass = course.id.includes('psle-chinese-masterclass');
    
    if (isMasterclass) {
      const url = await startCheckoutSession("video_tutorial", courseId);
      if (url) {
        window.location.href = url;
      }
    } else if (course.requiresAccessCode) {
      setAccessCodeDialogOpen(true);
    } else {
      const url = await startCheckoutSession("premium_subscription");
      if (url) {
        window.location.href = url;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="max-w-5xl mx-auto w-full space-y-8">
            <CourseHeader 
              course={course} 
              onWatchNow={handleWatchVideo}
              onSubscribe={handlePurchaseOrSubscribe}
              hasAccess={hasAccess}
            />
            <CourseContent
              hasAccess={hasAccess}
              isAdmin={isAdmin}
              courseId={courseId || ''}
              courseTitle={course.title}
              onAccessCodeCheck={handleAccessCodeCheck}
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

      <VideoDialog
        open={videoDialogOpen}
        onOpenChange={setVideoDialogOpen}
        course={course}
        isPremium={isPremium}
        hasAccess={hasAccess}
        onSubscribe={handlePurchaseOrSubscribe}
        onPurchase={handlePurchaseOrSubscribe}
      />
      <Footer />
    </div>
  );
};

export default CourseDetails;
