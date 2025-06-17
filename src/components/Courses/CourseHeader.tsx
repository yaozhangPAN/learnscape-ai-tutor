
import { Course } from "@/types/course";
import { useI18n } from "@/contexts/I18nContext";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  const { t, lang } = useI18n();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-4">
        {lang === 'zh' ? course.titleZh || course.title : course.title}
      </h1>
      <p className="text-gray-600 mb-2">
        {lang === 'zh' ? course.descriptionZh || course.description : course.description}
      </p>
      <div className="text-gray-600 space-y-1">
        <div>{lang === 'zh' ? '课程等级: ' : 'Level: '}{course.level}</div>
        <div>{lang === 'zh' ? '科目: ' : 'Subject: '}{course.subject}</div>
      </div>
    </div>
  );
};
