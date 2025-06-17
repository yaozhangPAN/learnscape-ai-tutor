
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
  onPurchase?: () => void;
}

export const CourseContent = ({ 
  hasAccess, 
  isAdmin, 
  courseId, 
  courseTitle,
  onAccessCodeCheck,
  onPurchase
}: CourseContentProps) => {
  const { t, lang } = useI18n();
  const course = mockCourses.find(c => c.id === courseId);
  const isOralPracticeCourse = courseId.includes('psle-chinese-oral-practice');
  const isWorkshopCourse = courseId === 'psle-chinese-workshop';
  
  // Check if it's one of the oral comprehension 2 courses
  const isOralComprehension2Course = courseId.includes('psle-oral-comprehension2');
  
  // Updated to include lessons 7-10
  const isFirstLesson = courseId === 'psle-chinese-masterclass-lesson1';
  const isSecondLesson = courseId === 'psle-chinese-masterclass-lesson2';
  const isThirdLesson = courseId === 'psle-chinese-masterclass-lesson3';
  const isFourthLesson = courseId === 'psle-chinese-masterclass-lesson4';
  const isFifthLesson = courseId === 'psle-chinese-masterclass-lesson5';
  const isSixthLesson = courseId === 'psle-chinese-masterclass-lesson6';
  const isSeventhLesson = courseId === 'psle-chinese-masterclass-lesson7';
  const isEighthLesson = courseId === 'psle-chinese-masterclass-lesson8';
  const isNinthLesson = courseId === 'psle-chinese-masterclass-lesson9';
  const isTenthLesson = courseId === 'psle-chinese-masterclass-lesson10';
  
  const isMasterclassLesson = 
    isFirstLesson || 
    isSecondLesson || 
    isThirdLesson || 
    isFourthLesson || 
    isFifthLesson || 
    isSixthLesson ||
    isSeventhLesson ||
    isEighthLesson ||
    isNinthLesson ||
    isTenthLesson;
  
  return (
    <div className="space-y-8">
      {/* Here we need to respect the access rule determined by the SubscriptionContext */}
      {(hasAccess || isAdmin) ? (
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
          
          {isOralComprehension2Course && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                {lang === 'zh' ? '口语考试练习' : 'Oral Exam Practice'}
              </h3>
              <p className="mb-4 text-gray-600">
                {lang === 'zh' 
                  ? '观看完视频后，建议您使用我们的AI口语练习功能来巩固所学的口试技巧。'
                  : 'After watching the video, we recommend using our AI Oral Practice feature to reinforce the oral exam techniques you\'ve learned.'}
              </p>
              <Link to="/ai-tutor/oral-exam">
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  {lang === 'zh' ? '前往口语考试练习' : 'Go to Oral Exam Practice'}
                </Button>
              </Link>
            </div>
          )}
          
          {isWorkshopCourse && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {lang === 'zh' ? '课程资源' : 'Course Resources'}
              </h3>
              <p className="mb-4 text-gray-600">
                {lang === 'zh' 
                  ? '如果您对PSLE华文备考有任何疑问，欢迎使用我们的AI辅导员功能获取帮助。'
                  : 'If you have any questions about PSLE Chinese preparation, feel free to use our AI Tutor feature for assistance.'}
              </p>
              <div className="flex gap-3">
                <Link to="/ai-tutor">
                  <Button className="gap-2">
                    <Check className="h-4 w-4" />
                    {lang === 'zh' ? 'AI辅导员' : 'AI Tutor'}
                  </Button>
                </Link>
                <Link to="/video-tutorials">
                  <Button variant="outline" className="gap-2">
                    {lang === 'zh' ? '查看更多课程' : 'Browse Courses'}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <LockedCourseContent 
          onAccessCodeCheck={onAccessCodeCheck} 
          onPurchase={onPurchase}
          course={course}
        />
      )}
      
      {!isOralPracticeCourse && !isMasterclassLesson && !isWorkshopCourse && !isOralComprehension2Course && <CourseHomework />}
    </div>
  );
};
