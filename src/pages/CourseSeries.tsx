
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pagination } from "@/components/ui/pagination";
import { CourseGrid } from "@/components/Courses/CourseGrid";
import { useI18n } from "@/contexts/I18nContext";
import { mockCourseSeries } from "@/data/courses/courseSeries";
import { Course } from "@/types/course";

const CourseSeries = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const { t } = useI18n();
  const [courses, setCourses] = useState<Course[]>([]);
  const [seriesTitle, setSeriesTitle] = useState("");

  useEffect(() => {
    // Find the course series by ID
    const series = mockCourseSeries.find(s => s.id === seriesId);
    if (series) {
      setCourses(series.courses || []);
      setSeriesTitle(series.title);
    }
  }, [seriesId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">{seriesTitle}</h1>
          <p className="text-gray-600">{t.VIDEO_TUTORIALS.SUBTITLE}</p>
        </div>

        {courses.length > 0 ? (
          <CourseGrid courses={courses} />
        ) : (
          <p className="text-gray-500">No courses found in this series.</p>
        )}

        <Pagination />
      </div>
      <Footer />
    </div>
  );
};

export default CourseSeries;
