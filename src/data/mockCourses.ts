
import { Course } from "@/types/course";
import { chineseCourses, masterclassCourse, oralPracticeCourse, oralPracticeCourses } from "./courses/chinese";

export { masterclassCourse, oralPracticeCourse, oralPracticeCourses };

// Filter out any items that don't match the Course type and cast to Course[]
export const mockCourses: Course[] = chineseCourses
  .filter(course => !('courses' in course) || course.courses === undefined) as Course[];

