
import { CourseVideo } from "./CourseVideo";
import { LockedCourseContent } from "./LockedCourseContent";
import { CourseHomework } from "./CourseHomework";
import { mockCourses } from "@/data/mockCourses";

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
  
  return (
    <div className="space-y-8">
      {hasAccess || isAdmin ? (
        <CourseVideo
          bucketName={course?.videoUrl ? undefined : "course-videos"}
          filePath={course?.videoUrl ? undefined : "PSLE-Chinese/PSLE.mp4"}
          title={courseTitle}
          videoUrl={course?.videoUrl}
        />
      ) : (
        <LockedCourseContent onAccessCodeCheck={onAccessCodeCheck} />
      )}
      <CourseHomework />
    </div>
  );
};
