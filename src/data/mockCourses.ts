
import { Course } from "@/types/course";
import { chineseCourses, masterclassCourse, oralPracticeCourse, oralPracticeCourses } from "./courses/chinese";
import { mathematicsCourses, mathematicsPastPapers } from "./courses/mathematics";
import { scienceCourses, sciencePastPapers } from "./courses/science";
import { englishCourses, englishPastPapers } from "./courses/english";

export { masterclassCourse, oralPracticeCourse, oralPracticeCourses };

export const mockCourses: Course[] = [
  ...chineseCourses,
  ...mathematicsCourses,
  ...mathematicsPastPapers,
  ...scienceCourses,
  ...sciencePastPapers,
  ...englishCourses,
  ...englishPastPapers,
];
