
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCourseSeries } from "@/data/courses/courseSeries";
import { CourseGrid } from "@/components/Courses/CourseGrid";
import { CourseFilters } from "@/components/Courses/CourseFilters";
import { useI18n } from "@/contexts/I18nContext";

const CourseSeries = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const { t, lang } = useI18n();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const series = mockCourseSeries.find(s => s.id === seriesId);
  
  if (!series) {
    return <div>Series not found</div>;
  }

  const filteredCourses = series.courses?.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedType === "all" || course.type === selectedType)
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">
            {lang === 'zh' ? series.titleZh || series.title : series.title}
          </h1>
          <p className="text-gray-600">
            {lang === 'zh' ? series.descriptionZh || series.description : series.description}
          </p>
        </div>

        <CourseFilters
          onLevelChange={setSelectedLevel}
          onTypeChange={setSelectedType}
          hiddenFilters={['subject']}
        />

        <CourseGrid courses={filteredCourses} />
      </div>
      <Footer />
    </div>
  );
};

export default CourseSeries;
