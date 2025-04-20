
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockCourses } from "@/data/mockCourses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { CourseVideo } from "@/components/Courses/CourseVideo";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AccessCodeDialog } from "@/components/Courses/AccessCodeDialog";
import { AccessCodeManager } from "@/components/Courses/AccessCodeManager";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const { hasAccessToContent } = useSubscription();
  
  const course = mockCourses.find(c => c.id === courseId);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
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
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            {hasAccess || isAdmin ? (
              <CourseVideo
                bucketName="course-videos"
                filePath="PSLE-Chinese/PSLE.mp4"
                title={course.title}
              />
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">需要访问权限</h3>
                  <p className="text-gray-600 mb-6">
                    您需要购买此课程或输入访问码才能观看此视频。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleAccessCodeCheck}>
                      输入访问码
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4 space-y-2">
              <div>课程等级: {course.level}</div>
              <div>科目: {course.subject}</div>
              <div>持续时间: {course.duration}</div>
            </div>

            {isAdmin && (
              <div className="mt-8">
                <AccessCodeManager courseId={courseId || ''} />
              </div>
            )}
          </div>
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
