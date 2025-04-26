
import { chineseProfMarkingCourse } from "./chinese";
import { englishCourses } from "./english";
import { mathematicsCourses } from "./mathematics";
import { scienceCourses } from "./science";

export const mockCourseSeries = [
  chineseProfMarkingCourse,
  ...englishCourses,
  ...mathematicsCourses,
  ...scienceCourses
];
