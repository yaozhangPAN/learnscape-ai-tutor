
import { Course } from "@/types/course";

export const scienceCourses: Course[] = [
  {
    id: "2",
    title: "Primary 6 Science - Mastering Energy Conversions",
    titleZh: "小六科学 - 能量转换精通",
    description: "Comprehensive coverage of energy concepts for PSLE Science",
    descriptionZh: "全面讲解 PSLE 科学中的能量概念",
    level: "p6",
    subject: "science",
    duration: "8 weeks",
    durationZh: "8周",
    rating: 4.7,
    views: 173,
    price: "S$399",
    priceZh: "399新币",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  },
  {
    id: "6",
    title: "Primary 5 Science - Forces and Energy",
    titleZh: "小五科学 - 力与能量",
    description: "Understand the fundamentals of forces and energy",
    descriptionZh: "理解力与能量的基本概念",
    level: "p5",
    subject: "science",
    duration: "9 weeks",
    durationZh: "9周",
    rating: 4.5,
    views: 167,
    price: "Free",
    priceZh: "免费",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1581093804475-577d72e73ef7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  }
];

export const sciencePastPapers: Course[] = [
  {
    id: "10",
    title: "2024 PSLE Science Paper Walkthrough",
    description: "Complete analysis and solutions for the 2024 PSLE Science examination",
    level: "p6",
    subject: "science",
    duration: "3 weeks",
    rating: 4.8,
    views: 287,
    price: "S$40",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  },
  {
    id: "13",
    title: "2023 PSLE Science Paper Walkthrough",
    description: "Comprehensive examination of the 2023 PSLE Science paper with detailed explanations",
    level: "p6",
    subject: "science",
    duration: "2 weeks",
    rating: 4.8,
    views: 345,
    price: "S$40",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  }
];
