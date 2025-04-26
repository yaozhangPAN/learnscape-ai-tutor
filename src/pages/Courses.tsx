
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pagination } from "@/components/ui/pagination";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { CourseFilters } from "@/components/Courses/CourseFilters";
import { CourseSeriesGrid } from "@/components/Courses/CourseSeriesGrid";
import { useI18n } from "@/contexts/I18nContext";
import { mockCourseSeries } from "@/data/courses/courseSeries";

const Courses = () => {
  const { t } = useI18n();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  const filteredSeries = mockCourseSeries.filter(
    series => 
      (selectedLevel === "all" || series.level === selectedLevel) && 
      (selectedSubject === "all" || series.subject === selectedSubject) &&
      (selectedType === "all" || series.type === selectedType)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">{t.VIDEO_TUTORIALS.TITLE}</h1>
          <p className="text-gray-600">{t.VIDEO_TUTORIALS.SUBTITLE}</p>
        </div>

        <CourseFilters
          onLevelChange={setSelectedLevel}
          onSubjectChange={setSelectedSubject}
          onTypeChange={setSelectedType}
        />

        <CourseSeriesGrid series={filteredSeries} />

        <Pagination />
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
