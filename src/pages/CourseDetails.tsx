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

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const { hasAccessToContent } = useSubscription();
  
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

      const access = await hasAccessToContent(courseId, "video_tutorial");
      setHasAccess(access);
    };

    checkAccess();
  }, [courseId, user, hasAccessToContent]);

  if (!course) {
    return <div>课程未找到</div>;
  }

  const handleAccessCodeCheck = () => {
    setAccessCodeDialogOpen(true);
  };

  const handleAccessCodeSuccess = () => {
    setHasAccess(true);
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
