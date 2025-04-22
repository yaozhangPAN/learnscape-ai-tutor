
import { Course } from "@/types/course";
import { chineseCourses, masterclassCourse, oralPracticeCourse, oralPracticeCourses } from "./courses/chinese";

export { masterclassCourse, oralPracticeCourse, oralPracticeCourses };

export const mockCourses: Course[] = [
  ...chineseCourses
];

