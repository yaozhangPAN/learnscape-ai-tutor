
import { Link } from "react-router-dom";
import { CourseSeriesCard } from "./CourseSeriesCard";
import { CourseSeries } from "@/types/course";
import MaskOverlay from "@/components/MaskOverlay";

interface CourseSeriesGridProps {
  series: CourseSeries[];
}

export const CourseSeriesGrid = ({ series }: CourseSeriesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {series.map((series) => (
        <div key={series.id} className="relative">
          {series.comingSoon ? (
            <div className="relative cursor-not-allowed">
              <CourseSeriesCard series={series} />
              <MaskOverlay />
            </div>
          ) : (
            <Link 
              to={`/courses/series/${series.id}`} 
              className="block hover:opacity-80 transition-opacity"
            >
              <CourseSeriesCard series={series} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
