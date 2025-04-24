import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AccessCodeDialog } from "@/components/Courses/AccessCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { CourseCard } from "@/components/Courses/CourseCard";
import { CourseFilters } from "@/components/Courses/CourseFilters";
import { VideoDialog } from "@/components/Courses/VideoDialog";
import { Course } from "@/types/course";
import { mockCourses } from "@/data/mockCourses";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";

const Courses = () => {
  const { t } = useI18n();
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const [selectedAccessCodeCourse, setSelectedAccessCodeCourse] = useState<Course | null>(null);
  const { isPremium, hasAccessToContent, startCheckoutSession } = useSubscription();
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const contentId = searchParams.get("content");
  const [hasAccessToSelected, setHasAccessToSelected] = useState(false);
  const [courseStats, setCourseStats] = useState<{[key: string]: any}>({});

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'admin@example.com');
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (contentId) {
      const course = mockCourses.find(c => c.id === contentId);
      if (course) {
        setSelectedCourse(course);
        setDialogOpen(true);
      }
    }
  }, [contentId]);

  useEffect(() => {
    const fetchCourseStats = async () => {
      const { data: stats, error } = await supabase
        .from('course_combined_stats')
        .select('*')
        .eq('class_type', 'video');
      
      if (!error && stats) {
        const statsMap = stats.reduce((acc: any, stat: any) => {
          acc[stat.course_id] = stat;
          return acc;
        }, {});
        setCourseStats(statsMap);
      }
    };

    fetchCourseStats();
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      if (selectedCourse) {
        const access = isPremium || await hasAccessToContent(selectedCourse.id, "video_tutorial");
        setHasAccessToSelected(access);
      }
    };
    
    checkAccess();
  }, [selectedCourse, isPremium, hasAccessToContent]);

  const filteredCourses = mockCourses.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject) &&
      (selectedType === "all" || course.type === selectedType)
  );

  const handleWatchNow = async (course: Course) => {
    if (course.requiresAccessCode) {
      setSelectedAccessCodeCourse(course);
      setAccessCodeDialogOpen(true);
      return;
    }

    setSelectedCourse(course);
    
    if (course.isPremium) {
      setDialogOpen(true);
    } else {
      setHasAccessToSelected(true);
      setDialogOpen(true);
    }
  };

  const handlePurchase = async () => {
    if (!selectedCourse) return;
    
    const checkoutUrl = await startCheckoutSession("video_tutorial", selectedCourse.id);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const handleSubscribe = async () => {
    const checkoutUrl = await startCheckoutSession("premium_subscription");
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <Link 
              to={`/courses/${course.id}`} 
              className="block hover:opacity-80 transition-opacity"
              key={course.id}
            >
              <CourseCard
                course={course}
                onWatchNow={handleWatchNow}
                stats={courseStats[course.id]}
              />
            </Link>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />

      <AccessCodeDialog
        isOpen={accessCodeDialogOpen}
        onOpenChange={setAccessCodeDialogOpen}
        courseId={selectedAccessCodeCourse?.id || ""}
        onSuccess={() => {
          setSelectedCourse(selectedAccessCodeCourse);
          setDialogOpen(true);
        }}
      />

      <VideoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        course={selectedCourse}
        isPremium={isPremium}
        hasAccess={hasAccessToSelected}
        onSubscribe={handleSubscribe}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default Courses;
