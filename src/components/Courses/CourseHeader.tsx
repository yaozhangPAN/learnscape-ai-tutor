
import React from 'react';
import { Course } from '@/types/course';
import { Button } from "@/components/ui/button";
import { Video, Crown } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";

interface CourseHeaderProps {
  course: Course;
  onWatchNow: () => void;
  onSubscribe: () => void;
  hasAccess: boolean;
}

export const CourseHeader = ({ course, onWatchNow, onSubscribe, hasAccess }: CourseHeaderProps) => {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const isMasterclass = course.id.includes('psle-chinese-masterclass');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
              {course.level.toUpperCase()} {course.subject}
            </span>
            {course.isPremium && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center">
                <Crown className="h-3 w-3 mr-1" />
                {t.VIDEO_TUTORIALS.PREMIUM_BADGE}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="font-semibold text-learnscape-blue text-lg">{course.price}</div>
            <div className="text-sm text-gray-500">{course.duration}</div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {user ? (
              hasAccess ? (
                <Button 
                  className="bg-learnscape-blue hover:bg-blue-700"
                  onClick={onWatchNow}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {t.VIDEO_TUTORIALS.WATCH_NOW}
                </Button>
              ) : (
                <Button 
                  className={isMasterclass ? "bg-learnscape-blue hover:bg-blue-700" : "bg-amber-500 hover:bg-amber-600"}
                  onClick={onSubscribe}
                >
                  {isMasterclass ? (
                    <span>{lang === 'zh' ? '购买本课程' : 'Purchase This Course'}</span>
                  ) : (
                    <>
                      <Crown className="h-4 w-4 mr-2" />
                      {lang === 'zh' ? '订阅高级会员' : 'Subscribe to Premium'}
                    </>
                  )}
                </Button>
              )
            ) : (
              <Button 
                disabled 
                className="bg-gray-400"
              >
                {lang === 'zh' ? '请先登录' : 'Please Log In'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
