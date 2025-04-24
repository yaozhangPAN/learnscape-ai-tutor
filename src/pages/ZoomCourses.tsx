
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import UpcomingSessions from "@/components/ZoomCourses/UpcomingSessions";
import ZoomCourseFilters from "@/components/ZoomCourses/ZoomCourseFilters";
import ZoomCourseGrid from "@/components/ZoomCourses/ZoomCourseGrid";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useI18n } from "@/contexts/I18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const mockZoomCourses = [
  {
    id: "psle-reading-writing-intensive",
    title: "PSLE阅读理解+作文专项冲刺（共十堂，每堂2小时）",
    description: "全面提升阅读理解和作文技能，深入解析PSLE考试要点。",
    level: "p6",
    subject: "chinese",
    upcomingSessions: [
      { id: "s1", date: "2025-06-03", startTime: "14:00", endTime: "16:00", topic: "第一讲：阅读理解技巧" },
      { id: "s2", date: "2025-06-10", startTime: "14:00", endTime: "16:00", topic: "第二讲：作文写作框架" },
    ],
    maxStudents: 25,
    price: "S$599",
    isPremium: true,
    tutor: "张丽萍老师",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "psle-oral-intensive",
    title: "PSLE口试专项冲刺（共十堂，每堂1小时）",
    description: "专注于PSLE口试考试技巧，全面提升口语表达能力。",
    level: "p6",
    subject: "chinese",
    upcomingSessions: [
      { id: "s3", date: "2025-06-04", startTime: "10:00", endTime: "11:00", topic: "第一讲：看图说话技巧" },
      { id: "s4", date: "2025-06-11", startTime: "10:00", endTime: "11:00", topic: "第二讲：会话训练" },
    ],
    maxStudents: 25,
    price: "S$299",
    isPremium: true,
    tutor: "张丽萍老师",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "psle-composition-intensive",
    title: "PSLE作文专项冲刺（共十堂，每堂1.5小时）",
    description: "深入讲解PSLE作文考试要求，提供高分写作技巧。",
    level: "p6",
    subject: "chinese",
    upcomingSessions: [
      { id: "s5", date: "2025-06-05", startTime: "14:00", endTime: "15:30", topic: "第一讲：记叙文写作技巧" },
      { id: "s6", date: "2025-06-12", startTime: "14:00", endTime: "15:30", topic: "第二讲：议论文写作方法" },
    ],
    maxStudents: 25,
    price: "S$399",
    isPremium: true,
    tutor: "张丽萍老师",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "psle-past-papers",
    title: "PSLE历届真题讲解（共十堂，每堂1小时）",
    description: "详细解析PSLE往年真题，帮助学生掌握考试技巧。",
    level: "p6",
    subject: "chinese",
    upcomingSessions: [
      { id: "s7", date: "2025-06-06", startTime: "11:00", endTime: "12:00", topic: "第一讲：2024年试题解析" },
      { id: "s8", date: "2025-06-13", startTime: "11:00", endTime: "12:00", topic: "第二讲：2023年试题解析" },
    ],
    maxStudents: 25,
    price: "S$299",
    isPremium: true,
    tutor: "张丽萍老师",
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const fetchEnrollments = async () => {
  const { data: enrollments, error } = await supabase
    .from('zoom_course_enrollment_counts')
    .select('*');

  if (error) throw error;
  return enrollments;
};

const ZoomCourses = () => {
  const { t } = useI18n();
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isPremium, hasAccessToContent, startCheckoutSession } = useSubscription();

  const { data: enrollments = [] } = useQuery({
    queryKey: ['enrollments'],
    queryFn: fetchEnrollments,
  });

  const coursesWithEnrollments = mockZoomCourses.map(course => ({
    ...course,
    currentEnrollment: enrollments.find(e => e.course_id === course.id)?.enrollment_count || 0
  }));

  const filteredCourses = coursesWithEnrollments.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject)
  );

  const allUpcomingSessions = mockZoomCourses.flatMap(course => 
    course.upcomingSessions.map(session => ({
      ...session,
      courseId: course.id,
      courseTitle: course.title,
      subject: course.subject,
      level: course.level,
      tutor: course.tutor
    }))
  ).sort((a, b) => new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime());

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingWeekSessions = allUpcomingSessions.filter(session => {
    const sessionDate = new Date(session.date + 'T' + session.startTime);
    return sessionDate >= today && sessionDate <= nextWeek;
  });

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleJoinSession = (session: any, courseId: string) => {
    const course = mockZoomCourses.find(c => c.id === courseId);
    setSelectedSession({...session, course});
  };

  const handleEnroll = async () => {
    if (!selectedCourse) return;
    const checkoutUrl = await startCheckoutSession("zoom_session", selectedCourse.id);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">{t.ONLINE_CLASSROOM.TITLE}</h1>
          <p className="text-gray-600">{t.ONLINE_CLASSROOM.SUBTITLE}</p>
        </div>

        <UpcomingSessions 
          sessions={upcomingWeekSessions} 
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
          onViewDetails={handleViewDetails}
        />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedCourse && (
            <>
              <DialogHeader>
                <Badge className="w-fit mb-2" variant="outline">
                  {selectedCourse.level.toUpperCase()} {selectedCourse.subject}
                </Badge>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
                <DialogDescription>{selectedCourse.description}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div>
                  <img 
                    src={selectedCourse.image} 
                    alt={selectedCourse.title} 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedCourse.currentEnrollment}/{selectedCourse.maxStudents} {t.ONLINE_CLASSROOM.STUDENTS}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{t.ONLINE_CLASSROOM.WEEKLY_SESSIONS}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>90 {t.ONLINE_CLASSROOM.MINUTES}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.ONLINE_CLASSROOM.UPCOMING_SESSIONS}</h3>
                  <div className="space-y-3">
                    {selectedCourse.upcomingSessions.map((session: any) => (
                      <div key={session.id} className="p-3 border rounded-md">
                        <div className="font-medium">{session.topic}</div>
                        <div className="text-sm text-gray-600">{formatDate(session.date)}</div>
                        <div className="text-sm text-gray-600">
                          {session.startTime} - {session.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex items-center justify-between flex-row">
                <div className="font-semibold text-learnscape-blue">{selectedCourse.price}</div>
                <div className="flex gap-3">
                  <Button onClick={handleEnroll}>
                    {t.ONLINE_CLASSROOM.JOIN_SESSION}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ZoomCourses;
