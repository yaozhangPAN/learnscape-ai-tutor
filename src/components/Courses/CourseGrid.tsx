
import { Link } from "react-router-dom";
import { CourseCard } from "./CourseCard";
import { Course } from "@/types/course";

interface CourseGridProps {
  courses: Course[];
}

export const CourseGrid = ({ courses }: CourseGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {courses.map((course) => (
        <Link 
          to={`/courses/${course.id}`} 
          className="block hover:opacity-80 transition-opacity"
          key={course.id}
        >
          <CourseCard
            course={course}
            onWatchNow={() => {}}
          />
        </Link>
      ))}
    </div>
  );
};
