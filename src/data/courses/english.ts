
import { Course } from "@/types/course";

export const englishCourses: Course[] = [
  {
    id: "3",
    title: "Primary 6 English - Mastering Comprehension",
    titleZh: "小六英语 - 阅读理解精通",
    description: "Enhance reading and comprehension skills for PSLE English",
    descriptionZh: "提升 PSLE 英语阅读理解能力",
    level: "p6",
    subject: "english",
    duration: "12 weeks",
    durationZh: "12周",
    rating: 4.9,
    views: 5240, // Replaced students with views
    price: "S$499",
    priceZh: "499新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  }
];

export const englishPastPapers: Course[] = [
  {
    id: "11",
    title: "2024 PSLE English Paper Walkthrough",
    titleZh: "2024小六英语考试解析",
    description: "Expert analysis of the 2024 PSLE English paper with model answers",
    descriptionZh: "2024年小六英语考试解析",
    level: "p6",
    subject: "english",
    duration: "3 weeks",
    durationZh: "3周",
    rating: 4.7,
    views: 3850, // Replaced students with views
    price: "S$40",
    priceZh: "40新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  }
];
