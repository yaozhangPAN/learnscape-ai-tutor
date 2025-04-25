
import ZoomSessionCard from "./ZoomSessionCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ZoomCourseGridProps {
  courses: any[]; // Use better typing if needed
  onViewDetails: (course: any) => void;
  isLoading?: boolean;
}

const ZoomCourseGrid = ({ courses, onViewDetails, isLoading }: ZoomCourseGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

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

