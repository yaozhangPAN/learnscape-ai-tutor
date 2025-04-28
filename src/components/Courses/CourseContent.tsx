
import React, { useState } from 'react';
import { CourseVideo } from "./CourseVideo";
import { LockedCourseContent } from "./LockedCourseContent";
import { CourseHomework } from "./CourseHomework";
import { mockCourses } from "@/data/mockCourses";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface CourseContentProps {
  hasAccess: boolean;
  isAdmin: boolean;
  courseId: string;
  courseTitle: string;
  onAccessCodeCheck: () => void;
}

export const CourseContent = ({ 
  hasAccess, 
  isAdmin, 
  courseId, 
  courseTitle,
  onAccessCodeCheck 
}: CourseContentProps) => {
  const { t, lang } = useI18n();
  const course = mockCourses.find(c => c.id === courseId);
  const isOralPracticeCourse = courseId.includes('psle-chinese-oral-practice');
  const isFirstLesson = courseId === 'psle-chinese-masterclass-lesson1';
  const isSecondLesson = courseId === 'psle-chinese-masterclass-lesson2';
  const isThirdLesson = courseId === 'psle-chinese-masterclass-lesson3';
  const isFourthLesson = courseId === 'psle-chinese-masterclass-lesson4';
  const isFifthLesson = courseId === 'psle-chinese-masterclass-lesson5';
  const isSixthLesson = courseId === 'psle-chinese-masterclass-lesson6';
  const isMasterclassLesson = isFirstLesson || isSecondLesson || isThirdLesson || isFourthLesson || isFifthLesson || isSixthLesson;
  
  return (
    <div className="space-y-8">
      {hasAccess || isAdmin ? (
        <>
          <CourseVideo
            bucketName={course?.videoUrl ? undefined : "course-videos"}
            filePath={course?.videoUrl ? undefined : "PSLE-Chinese/PSLE.mp4"}
            title={courseTitle}
            videoUrl={course?.videoUrl}
          />
          
          {isOralPracticeCourse && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                {lang === 'zh' ? '练习今天学到的口语考试技巧' : 'Practice the oral exam techniques you learned today'}
              </h3>
              <p className="mb-4 text-gray-600">
                {lang === 'zh' 
                  ? '观看完视频后，建议您使用我们的AI口语练习功能来巩固所学知识。AI辅导员会给您实时的反馈和建议。'
                  : 'After watching the video, we recommend using our AI Oral Practice feature to reinforce what you\'ve learned. The AI tutor will give you real-time feedback and suggestions.'}
              </p>
              <Link to="/ai-tutor/oral-exam">
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  {lang === 'zh' ? '前往AI口语练习' : 'Go to AI Oral Practice'}
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <LockedCourseContent onAccessCodeCheck={onAccessCodeCheck} />
      )}
      
      {!isOralPracticeCourse && !isMasterclassLesson && <CourseHomework />}
    </div>
  );
};
