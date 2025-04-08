
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

interface Session {
  id: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  level: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  tutor: string;
}

interface UpcomingSessionsProps {
  sessions: Session[];
  onJoinSession: (session: Session, courseId: string) => void;
}

const UpcomingSessions = ({ sessions, onJoinSession }: UpcomingSessionsProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const sessionDate = new Date(dateString);
    return today.toDateString() === sessionDate.toDateString();
  };

  if (sessions.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 border-learnscape-blue/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-learnscape-darkBlue">
          <Calendar className="h-5 w-5 inline-block mr-2" />
          Upcoming Sessions This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1 mb-3 md:mb-0">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="font-medium text-learnscape-darkBlue">{session.courseTitle}</h3>
                  <Badge variant="outline" className="text-xs">
                    {session.level.toUpperCase()} {session.subject}
                  </Badge>
                  {isToday(session.date) && (
                    <Badge className="bg-green-500 hover:bg-green-600">Today</Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{session.topic}</div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>{formatDate(session.date)}</span>
                  <Clock className="h-3.5 w-3.5 ml-3 mr-1.5" />
                  <span>{session.startTime} - {session.endTime}</span>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => onJoinSession(session, session.courseId)}
                className="md:ml-4"
              >
                <Video className="h-3.5 w-3.5 mr-1.5" />
                Join Session
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
