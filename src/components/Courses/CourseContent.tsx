
import { CourseVideo } from "./CourseVideo";
import { LockedCourseContent } from "./LockedCourseContent";
import { CourseHomework } from "./CourseHomework";

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
  return (
    <div className="space-y-8">
      {hasAccess || isAdmin ? (
        <CourseVideo
          bucketName="course-videos"
          filePath="PSLE-Chinese/PSLE.mp4"
          title={courseTitle}
        />
      ) : (
        <LockedCourseContent onAccessCodeCheck={onAccessCodeCheck} />
      )}
      <CourseHomework />
    </div>
  );
};
