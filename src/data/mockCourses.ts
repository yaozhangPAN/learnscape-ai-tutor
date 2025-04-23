
import { Course } from "@/types/course";
import { chineseCourses, masterclassCourse, oralPracticeCourse } from "./courses/chinese";

export { masterclassCourse, oralPracticeCourse };

export const mockCourses: Course[] = [
  ...chineseCourses
];
