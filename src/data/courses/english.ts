
import { Course } from "@/types/course";

export const englishCourses: Course[] = [
  {
    id: "3",
    title: "Primary 6 English - Mastering Comprehension",
    description: "Enhance reading and comprehension skills for PSLE English",
    level: "p6",
    subject: "english",
    duration: "12 weeks",
    rating: 4.9,
    students: 215,
    price: "S$499",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  }
];

export const englishPastPapers: Course[] = [
  {
    id: "11",
    title: "2024 PSLE English Paper Walkthrough",
    description: "Expert analysis of the 2024 PSLE English paper with model answers",
    level: "p6",
    subject: "english",
    duration: "3 weeks",
    rating: 4.7,
    students: 254,
    price: "S$40",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  }
];
