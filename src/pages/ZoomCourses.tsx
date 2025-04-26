import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomCourseFilters from "@/components/ZoomCourses/ZoomCourseFilters";
import ZoomCourseGrid from "@/components/ZoomCourses/ZoomCourseGrid";
import UpcomingSessions from "@/components/ZoomCourses/UpcomingSessions";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const baseZoomCourses = [
  {
    id: "zoom-course-1",
    title: "PSLE阅读理解+作文专项冲刺",
    description: "共十堂课，每堂2小时。系统性地提升阅读理解能力和写作技巧，帮助学生在PSLE中取得优异成绩。",
    level: "p6",
    subject: "chinese",
    maxStudents: 25,
    price: "S$599",
    isPremium: true,
    tutor: "Zhang Liping",
    image: "/lovable-uploads/08dd607c-c712-4811-a7fb-d18a717613dd.png", // Swapped image
    upcomingSessions: [
      {
        id: "session-1",
        date: "2025-06-01",
        startTime: "14:00",
        endTime: "16:00",
        topic: "第一课 (具体时间待定)"
      }
    ]
  },
  {
    id: "zoom-course-2",
    title: "PSLE口试专项冲刺",
    description: "共十堂课，每堂1小时。针对性训练口语表达能力，提高朗读和会话技巧，为PSLE口试做好充分准备。",
    level: "p6",
    subject: "chinese",
    maxStudents: 25,
    price: "S$299",
    isPremium: false,
    tutor: "Zhang Liping",
    image: "/lovable-uploads/02c00429-df63-4436-8a1b-a1a76314f56e.png", // Swapped image
    upcomingSessions: [
      {
        id: "session-2",
        date: "2025-06-02",
        startTime: "16:00",
        endTime: "17:00",
        topic: "第一课 (具体时间待定)"
      }
    ]
  },
  {
    id: "zoom-course-3",
    title: "PSLE作文专项冲刺",
    description: "共十堂课，每堂1.5小时。深入讲解作文技巧，提供实战练习和个性化指导，帮助学生在作文考试中脱颖而出。",
    level: "p6",
    subject: "chinese",
    maxStudents: 25,
    price: "S$399",
    isPremium: false,
    tutor: "Zhang Liping",
    image: "/lovable-uploads/673f2711-1205-4d7f-b4cd-7ac68b6ca77e.png", // 卡通图标
    upcomingSessions: [
      {
        id: "session-3",
        date: "2025-06-03",
        startTime: "15:00",
        endTime: "16:30",
        topic: "第一课 (具体时间待定)"
      }
    ]
  },
  {
    id: "zoom-course-4",
    title: "PSLE历届真题讲解",
    description: "共十堂课，每堂1小时。深度解析历年PSLE真题，掌握考试重点和答题技巧，提高应试能力。",
    level: "p6",
    subject: "chinese",
    maxStudents: 25,
    price: "S$299",
    isPremium: false,
    tutor: "Zhang Liping",
    image: "/lovable-uploads/87e2cca6-743b-42dc-81ac-356df86c7e4f.png", // 卡通图标
    upcomingSessions: [
      {
        id: "session-4",
        date: "2025-06-04",
        startTime: "17:00",
        endTime: "18:00",
        topic: "第一课 (具体时间待定)"
      }
    ]
  }
];

const ZoomCourses = () => {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeSession, setActiveSession] = useState(null);

  const { data: enrollmentData, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ['zoomCourseEnrollmentCounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('zoom_course_enrollment_counts')
        .select('course_id,enrollment_count');

      if (error) {
        console.error('Error fetching enrollment counts:', error);
        return {};
      }

      const map: Record<string, number> = {};
      (data || []).forEach(row => {
        if (row.course_id) {
          map[row.course_id] = Number(row.enrollment_count) || 0;
        }
      });
      return map;
    }
  });

  const zoomCourses = baseZoomCourses.map(course => ({
    ...course,
    currentEnrollment: enrollmentData?.[course.id] || 0
  }));

  const filteredCourses = zoomCourses.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject)
  );

  const handleViewCourseDetails = (course) => {
    console.log("View course details:", course);
  };

  const handleJoinSession = (session, courseId) => {
    console.log("Joining session:", session, "for course:", courseId);
    setActiveSession(session);
  };

  const upcomingSessions = zoomCourses.map(course => ({
    id: course.upcomingSessions[0].id,
    courseId: course.id,
    courseTitle: course.title,
    subject: course.subject,
    level: course.level,
    date: course.upcomingSessions[0].date,
    startTime: course.upcomingSessions[0].startTime,
    endTime: course.upcomingSessions[0].endTime,
    topic: course.upcomingSessions[0].topic,
    tutor: course.tutor
  }));

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 relative">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2 flex items-center">
            <BookOpen className="mr-2 h-8 w-8" />
            在线课堂
          </h1>
          <p className="text-gray-600">加入我们的在线课程，与顶尖教师一起实时互动学习。</p>
        </div>

        <UpcomingSessions 
          sessions={upcomingSessions}
          onJoinSession={handleJoinSession}
        />

        <ZoomCourseFilters
          selectedLevel={selectedLevel}
          selectedSubject={selectedSubject}
          onLevelChange={setSelectedLevel}
          onSubjectChange={setSelectedSubject}
        />

        <ZoomCourseGrid
          courses={filteredCourses}
          onViewDetails={handleViewCourseDetails}
          isLoading={isLoadingEnrollments}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ZoomCourses;
