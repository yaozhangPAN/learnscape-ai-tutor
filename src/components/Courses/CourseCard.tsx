
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Eye, Clock, Video, Crown, BookOpen } from "lucide-react";
import { Course } from '@/types/course';
import { useI18n } from '@/contexts/I18nContext';

interface CourseCardProps {
  course: Course;
  onWatchNow: (course: Course) => void;
  stats?: {
    views: number;
    enrollment_count: number | null;
  };
  isLessonInSeries?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onWatchNow, stats, isLessonInSeries }) => {
  const { t } = useI18n();

  // Simplified card for individual lessons in a series
  if (isLessonInSeries) {
    return (
      <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
        <div className="h-36 overflow-hidden relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        </CardContent>
        <CardFooter className="flex justify-end items-center pt-2">
          <Button 
            className="bg-learnscape-blue hover:bg-blue-700"
            onClick={() => onWatchNow(course)}
          >
            <Video className="h-4 w-4 mr-2" />
            {t.VIDEO_TUTORIALS.WATCH_NOW}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Full card for series and standalone courses
  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
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
            <Eye className="h-3.5 w-3.5 mr-1" />
            <span>{stats?.views || course.views} {t.VIDEO_TUTORIALS.VIEWS}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
        <div className="font-semibold text-learnscape-blue">{course.price}</div>
        <Button 
          className="bg-learnscape-blue hover:bg-blue-700"
          onClick={() => onWatchNow(course)}
        >
          <Video className="h-4 w-4 mr-2" />
          {t.VIDEO_TUTORIALS.WATCH_NOW}
        </Button>
      </CardFooter>
    </Card>
  );
};
