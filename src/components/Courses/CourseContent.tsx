
import { CourseVideo } from "./CourseVideo";
import { LockedCourseContent } from "./LockedCourseContent";
import { CourseHomework } from "./CourseHomework";
import { mockCourses } from "@/data/mockCourses";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

interface CourseContentProps {
  hasAccess: boolean;
  isAdmin: boolean;
  courseId: string;
  courseTitle: string;
  onAccessCodeCheck: () => void;
}

export const CourseContent = ({ 
  hasAccess, 
  isAdmin, 
  courseId, 
  courseTitle,
  onAccessCodeCheck 
}: CourseContentProps) => {
  const course = mockCourses.find(c => c.id === courseId);
  const isOralPracticeCourse = courseId.includes('psle-chinese-oral-practice');
  
  return (
    <div className="space-y-8">
      {hasAccess || isAdmin ? (
        <>
          <CourseVideo
            bucketName={course?.videoUrl ? undefined : "course-videos"}
            filePath={course?.videoUrl ? undefined : "PSLE-Chinese/PSLE.mp4"}
            title={courseTitle}
            videoUrl={course?.videoUrl}
          />
          
          {isOralPracticeCourse && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">练习今天学到的口语考试技巧</h3>
              <p className="mb-4 text-gray-600">
                观看完视频后，建议您使用我们的AI口语练习功能来巩固所学知识。AI辅导员会给您实时的反馈和建议。
              </p>
              <Link to="/ai-tutor/oral-exam">
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  前往AI口语练习
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <LockedCourseContent onAccessCodeCheck={onAccessCodeCheck} />
      )}
      
      {!isOralPracticeCourse && <CourseHomework />}
    </div>
  );
};
