import { useState } from "react";
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

const mockZoomCourses = [
  {
    id: "z1",
    title: "PSLE Math: Problem Solving Strategies",
    description: "Live interactive sessions focused on problem-solving techniques for PSLE Mathematics. Get real-time feedback from our expert tutors.",
    level: "p6",
    subject: "mathematics",
    upcomingSessions: [
      { 
        id: "s1", 
        date: "2025-04-15", 
        startTime: "16:00", 
        endTime: "17:30", 
        topic: "Word Problems Mastery" 
      },
      { 
        id: "s2", 
        date: "2025-04-22", 
        startTime: "16:00", 
        endTime: "17:30", 
        topic: "Geometry and Angles" 
      }
    ],
    maxStudents: 20,
    currentEnrollment: 12,
    price: "S$30 per session",
    isPremium: false,
    tutor: "Ms. Wong",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "z2",
    title: "PSLE Science: Experimental Techniques",
    description: "Guided virtual experiments and demonstrations to help students understand key scientific concepts for PSLE Science.",
    level: "p6",
    subject: "science",
    upcomingSessions: [
      { 
        id: "s3", 
        date: "2025-04-16", 
        startTime: "17:00", 
        endTime: "18:30", 
        topic: "Forces and Energy" 
      },
      { 
        id: "s4", 
        date: "2025-04-23", 
        startTime: "17:00", 
        endTime: "18:30", 
        topic: "Electrical Circuits" 
      }
    ],
    maxStudents: 15,
    currentEnrollment: 8,
    price: "S$35 per session",
    isPremium: true,
    tutor: "Mr. Tan",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "z3",
    title: "PSLE English: Composition Techniques",
    description: "Interactive writing sessions to improve composition skills with immediate feedback from experienced English teachers.",
    level: "p6",
    subject: "english",
    upcomingSessions: [
      { 
        id: "s5", 
        date: "2025-04-17", 
        startTime: "15:30", 
        endTime: "17:00", 
        topic: "Narrative Writing" 
      },
      { 
        id: "s6", 
        date: "2025-04-24", 
        startTime: "15:30", 
        endTime: "17:00", 
        topic: "Descriptive Techniques" 
      }
    ],
    maxStudents: 12,
    currentEnrollment: 10,
    price: "S$30 per session",
    isPremium: false,
    tutor: "Mrs. Lee",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "z4",
    title: "P5 Chinese: Oral Practice Sessions",
    description: "Small group sessions focused on improving Chinese speaking and comprehension skills through interactive conversations.",
    level: "p5",
    subject: "chinese",
    upcomingSessions: [
      { 
        id: "s7", 
        date: "2025-04-18", 
        startTime: "16:00", 
        endTime: "17:00", 
        topic: "Picture Description" 
      },
      { 
        id: "s8", 
        date: "2025-04-25", 
        startTime: "16:00", 
        endTime: "17:00", 
        topic: "Conversation Practice" 
      }
    ],
    maxStudents: 8,
    currentEnrollment: 6,
    price: "S$40 per session",
    isPremium: true,
    tutor: "Ms. Zhang",
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const ZoomCourses = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const { isPremium, hasAccessToContent, startCheckoutSession } = useSubscription();

  const filteredCourses = mockZoomCourses.filter(
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
    <div 
      className="min-h-screen flex flex-col" 
      style={{ 
        background: `linear-gradient(135deg, #F0E4B0 0%, #AED581 100%)`,
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Live Zoom Courses</h1>
          <p className="text-gray-600">
            Join our interactive online classes with expert tutors for real-time learning, questions, and feedback.
          </p>
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
                      <span>{selectedCourse.currentEnrollment}/{selectedCourse.maxStudents} students enrolled</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Sessions run weekly</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>90 minutes per session</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Upcoming Sessions</h3>
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
                    Enroll in Course
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
