
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Book, Clock, Star, Users, Video } from "lucide-react";

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  subject: string;
  duration: string;
  rating: number;
  students: number;
  price: string;
  image: string;
};

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Primary 6 Mathematics - Problem Solving Strategies",
    description: "Learn effective problem-solving techniques for PSLE Mathematics",
    level: "p6",
    subject: "mathematics",
    duration: "10 weeks",
    rating: 4.8,
    students: 248,
    price: "Free",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "Primary 6 Science - Mastering Energy Conversions",
    description: "Comprehensive coverage of energy concepts for PSLE Science",
    level: "p6",
    subject: "science",
    duration: "8 weeks",
    rating: 4.7,
    students: 173,
    price: "Free",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Primary 6 English - Mastering Comprehension",
    description: "Enhance reading and comprehension skills for PSLE English",
    level: "p6",
    subject: "english",
    duration: "12 weeks",
    rating: 4.9,
    students: 215,
    price: "Free",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Primary 6 Chinese - Vocabulary Building",
    description: "Expand your Chinese vocabulary for PSLE Chinese examinations",
    level: "p6",
    subject: "chinese",
    duration: "10 weeks",
    rating: 4.6,
    students: 142,
    price: "Free",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Primary 5 Mathematics - Fractions and Decimals",
    description: "Master the concepts of fractions and decimals",
    level: "p5",
    subject: "mathematics",
    duration: "8 weeks",
    rating: 4.7,
    students: 186,
    price: "Free",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "Primary 5 Science - Forces and Energy",
    description: "Understand the fundamentals of forces and energy",
    level: "p5",
    subject: "science",
    duration: "9 weeks",
    rating: 4.5,
    students: 167,
    price: "Free",
    image: "https://images.unsplash.com/photo-1581093804475-577d72e73ef7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "7",
    title: "Primary 6 Chinese - Mastering Comprehension",
    description: "Improve your reading and understanding of Chinese texts for PSLE",
    level: "p6",
    subject: "chinese",
    duration: "11 weeks",
    rating: 4.8,
    students: 156,
    price: "Free",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "8",
    title: "Primary 6 Chinese - Mastering Composition",
    description: "Develop essential writing skills for Chinese compositions in PSLE",
    level: "p6",
    subject: "chinese",
    duration: "12 weeks",
    rating: 4.9,
    students: 168,
    price: "Free",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const filteredCourses = mockCourses.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Video Tutorials</h1>
          <p className="text-gray-600">
            Access high-quality video tutorials designed by expert educators to help you master key concepts and excel in your exams.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Primary Level</h3>
              <Tabs defaultValue="p6" onValueChange={setSelectedLevel}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="p6">Primary 6</TabsTrigger>
                  <TabsTrigger value="p5">Primary 5</TabsTrigger>
                  <TabsTrigger value="all">All Levels</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Subject</h3>
              <Tabs defaultValue="all" onValueChange={setSelectedSubject}>
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="mathematics">Math</TabsTrigger>
                  <TabsTrigger value="science">Science</TabsTrigger>
                  <TabsTrigger value="chinese">Chinese</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {course.level.toUpperCase()} {course.subject}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-y-2 text-xs text-gray-500">
                  <div className="flex items-center mr-4">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    <span>{course.students} students</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="font-semibold text-learnscape-blue">{course.price}</div>
                <Button className="bg-learnscape-blue hover:bg-blue-700">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardFooter>
            </Card>
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
    </div>
  );
};

export default Courses;
