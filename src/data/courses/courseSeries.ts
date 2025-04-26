
import { CourseSeries } from "@/types/course";
import { mathematicsCourses, mathematicsPastPapers } from "./mathematics";
import { scienceCourses, sciencePastPapers } from "./science";
import { englishCourses, englishPastPapers } from "./english";

export const mockCourseSeries: CourseSeries[] = [
  {
    id: "psle-math-masterclass",
    title: "PSLE Mathematics Masterclass",
    titleZh: "PSLE 数学精品课程",
    description: "Complete preparation for PSLE Mathematics with comprehensive coverage of all topics",
    descriptionZh: "全面覆盖 PSLE 数学所有考点的系统课程",
    level: "p6",
    subject: "mathematics",
    duration: "12 months",
    durationZh: "12个月",
    rating: 4.9,
    views: 15000,
    price: "S$999",
    priceZh: "999新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    type: "masterclass",
    courses: [...mathematicsCourses, ...mathematicsPastPapers]
  },
  {
    id: "psle-science-masterclass",
    title: "PSLE Science Masterclass",
    titleZh: "PSLE 科学精品课程",
    description: "Master all PSLE Science concepts with our comprehensive course series",
    descriptionZh: "通过我们的系统课程掌握所有 PSLE 科学概念",
    level: "p6",
    subject: "science",
    duration: "12 months",
    durationZh: "12个月",
    rating: 4.8,
    views: 12000,
    price: "S$999",
    priceZh: "999新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    type: "masterclass",
    courses: [...scienceCourses, ...sciencePastPapers]
  },
  {
    id: "psle-english-masterclass",
    title: "PSLE English Masterclass",
    titleZh: "PSLE 英语精品课程",
    description: "Comprehensive English language preparation for PSLE success",
    descriptionZh: "全面的 PSLE 英语备考课程",
    level: "p6",
    subject: "english",
    duration: "12 months",
    durationZh: "12个月",
    rating: 4.7,
    views: 11000,
    price: "S$999",
    priceZh: "999新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    type: "masterclass",
    courses: [...englishCourses, ...englishPastPapers]
  }
];
