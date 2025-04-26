
import { Link } from "react-router-dom";
import { CourseSeriesCard } from "./CourseSeriesCard";
import { CourseSeries } from "@/types/course";

interface CourseSeriesGridProps {
  series: CourseSeries[];
}

export const CourseSeriesGrid = ({ series }: CourseSeriesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {series.map((series) => (
        <Link 
          to={`/courses/series/${series.id}`} 
          className="block hover:opacity-80 transition-opacity"
          key={series.id}
        >
          <CourseSeriesCard series={series} />
        </Link>
      ))}
    </div>
  );
};
