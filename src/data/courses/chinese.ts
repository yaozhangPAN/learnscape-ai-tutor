
import { Course } from "@/types/course";

export const oralPracticeCourse: Course = {
  id: "psle-chinese-oral-practice",
  title: "PSLE 华文口试练习",
  description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
  level: "p6",
  subject: "chinese",
  duration: "1 video",
  rating: 4.8,
  students: 320,
  price: "Free",
  isPremium: false,
  image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b",
  type: "tutorial",
  videoUrl: "https://www.youtube.com/embed/ZobPO6C7TTM?si=0ZQL8bcz_vzgP1oq"
};

export const masterclassCourse: Course = {
  id: "psle-chinese-masterclass",
  title: "PSLE 华文名师专项提分课",
  description: "由资深华文名师主讲，针对PSLE华文考试重点难点进行专项训练，助你提升成绩。",
  level: "p6",
  subject: "chinese",
  duration: "10 weeks",
  rating: 4.9,
  students: 156,
  price: "S$399",
  isPremium: true,
  image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b",
  type: "tutorial",
  requiresAccessCode: true,
};

export const chineseCourses: Course[] = [
  oralPracticeCourse,
  masterclassCourse,
  {
    id: "4",
    title: "Primary 6 Chinese - Vocabulary Building",
    description: "Expand your Chinese vocabulary for PSLE Chinese examinations",
    level: "p6",
    subject: "chinese",
    duration: "10 weeks",
    rating: 4.6,
    students: 142,
    price: "S$599",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  },
  {
    id: "7",
    title: "Primary 6 Chinese - Mastering Comprehension",
    description: "Improve your reading and understanding of Chinese texts for PSLE",
    level: "p6",
    subject: "chinese",
    duration: "11 weeks",
    rating: 4.8,
    students: 156,
    price: "S$399",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  },
  {
    id: "8",
    title: "Primary 6 Chinese - Mastering Composition",
    description: "Develop essential writing skills for Chinese compositions in PSLE",
    level: "p6",
    subject: "chinese",
    duration: "12 weeks",
    rating: 4.9,
    students: 168,
    price: "S$499",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1449157291145-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  }
];
