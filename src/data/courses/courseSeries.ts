
import { chineseProfMarkingCourse } from "./chinese";
import { englishCourses } from "./english";
import { mathCourses } from "./mathematics";
import { scienceCourses } from "./science";

export const mockCourseSeries = [
  chineseProfMarkingCourse,
  ...englishCourses,
  ...mathCourses,
  ...scienceCourses
];
