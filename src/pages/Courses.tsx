import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Book, Clock, Star, Users, Video, Crown, Lock, BookOpen } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  isPremium: boolean;
  image: string;
  type?: string;
};

const mockCourses: Course[] = [
  // ... keep existing mockCourses array
];

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isPremium, hasAccessToContent, startCheckoutSession } = useSubscription();
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get("content");

  const videoUrls: Record<string, string> = {
    "1": "https://cdn.videvo.net/videvo_files/video/free/2012-06/large_watermarked/hd0048_preview.mp4",
    "2": "https://cdn.videvo.net/videvo_files/video/free/2014-07/large_watermarked/ScientificExperiment_preview.mp4",
    "3": "https://cdn.videvo.net/videvo_files/video/free/2015-07/large_watermarked/Thailand_Timelapse_HD_preview.mp4",
    "9": "https://cdn.videvo.net/videvo_files/video/free/2014-10/large_watermarked/Number_Patterns_preview.mp4",
    "10": "https://cdn.videvo.net/videvo_files/video/free/2017-08/large_watermarked/170724_15_Chemistry_07_preview.mp4",
  };

  const filteredCourses = mockCourses.filter(
    course => 
      (selectedLevel === "all" || course.level === selectedLevel) && 
      (selectedSubject === "all" || course.subject === selectedSubject) &&
      (selectedType === "all" || course.type === selectedType)
  );

  useEffect(() => {
    if (contentId) {
      const course = mockCourses.find(c => c.id === contentId);
      if (course) {
        setSelectedCourse(course);
        setDialogOpen(true);
      }
    }
  }, [contentId]);

  const handleWatchNow = async (course: Course) => {
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

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
            <div>
              <h3 className="text-lg font-semibold mb-2">Content Type</h3>
              <Tabs defaultValue="all" onValueChange={setSelectedType}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                  <TabsTrigger value="past_paper">Past Papers</TabsTrigger>
                  <TabsTrigger value="all">All Types</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {course.isPremium && (
                  <div className="absolute top-2 right-2 bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </div>
                )}
                {course.type === "past_paper" && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Past Paper
                  </div>
                )}
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
                <Button 
                  className="bg-learnscape-blue hover:bg-blue-700"
                  onClick={() => handleWatchNow(course)}
                >
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
                <DialogDescription>{selectedCourse.description}</DialogDescription>
              </DialogHeader>
              
              {(isPremium || !selectedCourse.isPremium || hasAccessToContent(selectedCourse.id, "video_tutorial")) ? (
                <div className="aspect-video bg-black rounded-md overflow-hidden">
                  {videoUrls[selectedCourse.id] ? (
                    <video 
                      className="w-full h-full" 
                      controls
                      src={videoUrls[selectedCourse.id]}
                      poster={selectedCourse.image}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Video className="h-16 w-16 mx-auto mb-4" />
                        <p>No video available for this course</p>
                        <p className="text-sm text-gray-400 mt-2">
                          This is a placeholder for the actual video content
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                    <p className="text-gray-600 mb-6">
                      This video tutorial requires a purchase or premium subscription to access.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={handlePurchase}>
                        Purchase ({selectedCourse.price})
                      </Button>
                      <Button variant="outline" onClick={handleSubscribe}>
                        <Crown className="mr-2 h-4 w-4" />
                        Subscribe to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
