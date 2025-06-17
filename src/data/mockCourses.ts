import { Course } from "@/types/course";
import { chineseCourses, masterclassCourse, oralPracticeCourse, oralPracticeCourses } from "./courses/chinese";
import { oralComprehension2Courses } from "./courses/oralComprehension2";

export { masterclassCourse, oralPracticeCourse, oralPracticeCourses };

// Filter out any items that don't match the Course type and cast to Course[]
export const mockCourses = [
  ...chineseCourses
    .filter(course => !('courses' in course) || course.courses === undefined) as Course[],
  
  // 添加新的PSLE口试冲刺课+阅读理解二课程
  ...oralComprehension2Courses
];
