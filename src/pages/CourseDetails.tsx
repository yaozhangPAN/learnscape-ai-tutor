
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { mockCourses } from "@/data/mockCourses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      setIsAdmin(user?.email === 'admin@example.com');
    };

    checkAdminStatus();
  }, [user]);

  if (!course) {
    return <div>课程未找到</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            {isAdmin && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4">管理员视频上传</h2>
                <VideoUpload 
                  courseId={course.id} 
                  onUploadSuccess={(videoUrl) => {
                    console.log('Video uploaded:', videoUrl);
                  }}
                />
                <VideoUploadStatus courseId={course.id} />
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetails;
