
import ZoomSessionCard from "./ZoomSessionCard";

interface ZoomCourseGridProps {
  courses: any[]; // Use better typing if needed
  onViewDetails: (course: any) => void;
}

const ZoomCourseGrid = ({ courses, onViewDetails }: ZoomCourseGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {courses.map((course) => (
        <ZoomSessionCard
          key={course.id}
          course={course}
          onViewDetails={() => onViewDetails(course)}
        />
      ))}
    </div>
  );
};

export default ZoomCourseGrid;

