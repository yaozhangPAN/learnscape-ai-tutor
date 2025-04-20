
import { Course } from "@/types/course";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <div className="text-gray-600 space-y-1">
        <div>课程等级: {course.level}</div>
        <div>科目: {course.subject}</div>
        <div>持续时间: {course.duration}</div>
      </div>
    </div>
  );
};
