
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
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

const Courses = () => {
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

    if (!course.isPremium) {
      setSelectedCourse(course);
      setDialogOpen(true);
      return;
    }

    const hasAccess = isPremium || await hasAccessToContent(course.id, "video_tutorial");
    
    if (hasAccess) {
      setSelectedCourse(course);
      setDialogOpen(true);
    } else {
      setSelectedCourse(course);
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
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Star Teacher Video Lessons</h1>
          <p className="text-gray-600">
            Access high-quality video tutorials designed by expert educators to help you master key concepts and excel in your exams.
          </p>
        </div>

        <CourseFilters
          onLevelChange={setSelectedLevel}
          onSubjectChange={setSelectedSubject}
          onTypeChange={setSelectedType}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onWatchNow={handleWatchNow}
            />
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
        hasAccess={selectedCourse ? hasAccessToContent(selectedCourse.id, "video_tutorial") : false}
        onSubscribe={handleSubscribe}
        onPurchase={handlePurchase}
      />

      {isAdmin && (
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
          <div className="space-y-4">
            <VideoUpload 
              courseId="psle-chinese-masterclass" 
              onUploadSuccess={(videoUrl) => {
                console.log('Video uploaded:', videoUrl);
              }}
            />
            <VideoUploadStatus courseId="psle-chinese-masterclass" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
