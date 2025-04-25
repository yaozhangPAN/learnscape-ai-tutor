
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomCourseFilters from "@/components/ZoomCourses/ZoomCourseFilters";
import ZoomCourseGrid from "@/components/ZoomCourses/ZoomCourseGrid";
import UpcomingSessions from "@/components/ZoomCourses/UpcomingSessions";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen } from "lucide-react";

// Mock data for zoom courses
const mockZoomCourses = [
  {
    id: "zoom-course-1",
    title: "PSLE 数学备考",
    description: "通过练习和讲解帮助学生掌握PSLE所需的数学技能和解题策略。",
    level: "p6",
    subject: "mathematics",
    maxStudents: 20,
    currentEnrollment: 12,
    price: "S$25 / 课时",
    isPremium: true,
    tutor: "林老师",
    image: "/lovable-uploads/67febdd9-e430-46e6-b523-5036340c4c65.png",
    upcomingSessions: [
      {
        id: "session-1",
        date: "2025-05-15",
        startTime: "14:00",
        endTime: "15:30",
        topic: "分数和小数"
      }
    ]
  },
  {
    id: "zoom-course-2",
    title: "PSLE 英语口语指导",
    description: "帮助学生准备PSLE英语口语部分，包括朗读和会话练习。",
    level: "p6",
    subject: "english",
    maxStudents: 10,
    currentEnrollment: 8,
    price: "S$30 / 课时",
    isPremium: false,
    tutor: "Ms. Lee",
    image: "/lovable-uploads/35e5ebeb-cc32-46fc-961d-fb6241e51756.png",
    upcomingSessions: [
      {
        id: "session-2",
        date: "2025-05-10",
        startTime: "16:00",
        endTime: "17:30",
        topic: "口语表达技巧"
      }
    ]
  },
  {
    id: "zoom-course-3",
    title: "科学实验课",
    description: "通过实际实验加深对科学概念的理解，提高学生学习兴趣。",
    level: "p5",
    subject: "science",
    maxStudents: 15,
    currentEnrollment: 10,
    price: "S$28 / 课时",
    isPremium: false,
    tutor: "张教授",
    image: "/lovable-uploads/1bd5d4e2-d0e7-4caf-a458-e87bbd5e7418.png",
    upcomingSessions: [
      {
        id: "session-3",
        date: "2025-05-12",
        startTime: "15:00",
        endTime: "16:30",
        topic: "物质的性质"
      }
    ]
  }
];

// Mock upcoming sessions
const mockUpcomingSessions = [
  {
    id: "session-1",
    courseId: "zoom-course-1",
    courseTitle: "PSLE 数学备考",
    subject: "mathematics",
    level: "p6",
    date: "2025-05-15",
    startTime: "14:00",
    endTime: "15:30",
    topic: "分数和小数",
    tutor: "林老师"
  },
  {
    id: "session-2", 
    courseId: "zoom-course-2",
    courseTitle: "PSLE 英语口语指导",
    subject: "english",
    level: "p6",
    date: "2025-05-10",
    startTime: "16:00",
    endTime: "17:30",
    topic: "口语表达技巧",
    tutor: "Ms. Lee"
  },
  {
    id: "today-session",
    courseId: "zoom-course-3",
    courseTitle: "科学实验课",
    subject: "science",
    level: "p5",
    date: new Date().toISOString().split('T')[0],
    startTime: "15:00",
    endTime: "16:30",
    topic: "物质的性质",
    tutor: "张教授"
  }
];

const ZoomCourses = () => {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [activeSession, setActiveSession] = useState(null);

  // Filter courses based on selections
  const filteredCourses = mockZoomCourses.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject)
  );

  const handleViewCourseDetails = (course) => {
    console.log("View course details:", course);
    // In a real app, this would navigate to a course details page
  };

  const handleJoinSession = (session, courseId) => {
    console.log("Joining session:", session, "for course:", courseId);
    setActiveSession(session);
    // In a real implementation, this would open the Zoom session
  };

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
          sessions={mockUpcomingSessions}
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
        />
      </div>
      <Footer />
    </div>
  );
};

export default ZoomCourses;
