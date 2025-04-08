
import { Calendar, Users, Clock, Video } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ZoomSessionCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    subject: string;
    upcomingSessions: {
      id: string;
      date: string;
      startTime: string;
      endTime: string;
      topic: string;
    }[];
    maxStudents: number;
    currentEnrollment: number;
    price: string;
    isPremium: boolean;
    tutor: string;
    image: string;
  };
  onViewDetails: () => void;
}

const ZoomSessionCard = ({ course, onViewDetails }: ZoomSessionCardProps) => {
  // Get the next upcoming session
  const nextSession = course.upcomingSessions[0];
  
  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {course.level.toUpperCase()} {course.subject}
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="bg-gray-50 p-3 rounded-md mb-3">
          <div className="flex items-center text-sm font-medium mb-1">
            <Calendar className="h-4 w-4 mr-2 text-learnscape-blue" />
            <span>Next Session: {formatDate(nextSession.date)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{nextSession.startTime} - {nextSession.endTime}</span>
          </div>
          <Badge variant="outline" className="mt-2">
            {nextSession.topic}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-y-2 text-xs text-gray-500">
          <div className="flex items-center mr-4">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{course.currentEnrollment}/{course.maxStudents} enrolled</span>
          </div>
          <div className="flex items-center">
            <span>Tutor: {course.tutor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
        <div className="font-semibold text-learnscape-blue">{course.price}</div>
        <Button 
          className="bg-learnscape-blue hover:bg-blue-700"
          onClick={onViewDetails}
        >
          <Video className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZoomSessionCard;
