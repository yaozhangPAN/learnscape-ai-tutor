
import { Course } from "@/types/course";

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
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  type: "tutorial",
  requiresAccessCode: true,
};

export const oralPracticeCourse: Course = {
  id: "psle-chinese-oral-practice-1",
  title: "PSLE 华文口试练习1",
  description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
  level: "p6",
  subject: "chinese",
  duration: "1 video",
  rating: 4.8,
  students: 320,
  price: "Free",
  isPremium: false,
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  type: "tutorial",
  videoUrl: "https://www.youtube.com/embed/ZobPO6C7TTM?si=0ZQL8bcz_vzgP1oq"
};

export const oralPracticeCourses: Course[] = [
  oralPracticeCourse,
  {
    id: "psle-chinese-oral-practice-2",
    title: "PSLE 华文口试练习2",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 285,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/cTRwD-h6xdA?si=c1CrIbAQHtuEAmF8"
  },
  {
    id: "psle-chinese-oral-practice-3",
    title: "PSLE 华文口试练习3",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 267,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/5Lib4BxW3tg?si=wqLRXlwKGcSNvCeM"
  },
  {
    id: "psle-chinese-oral-practice-4",
    title: "PSLE 华文口试练习4",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 245,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/C_DXx5gBPNg?si=VdSIsUAwxqc5_9rn"
  },
  {
    id: "psle-chinese-oral-practice-5",
    title: "PSLE 华文口试练习5",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 234,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/aP-XoRMU0OM?si=PM2FEF0OAB8-v1EX"
  },
  {
    id: "psle-chinese-oral-practice-6",
    title: "PSLE 华文口试练习6",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 223,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/vzmtLIyebxg?si=kPxYvgFJpxCfLpWm"
  },
  {
    id: "psle-chinese-oral-practice-7",
    title: "PSLE 华文口试练习7",
    description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
    level: "p6",
    subject: "chinese",
    duration: "1 video",
    rating: 4.8,
    students: 215,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/sP0tVrtx_LY?si=WVIDrYeoCcP8PSrN"
  }
];

export const chineseCourses: Course[] = [
  masterclassCourse,
  ...oralPracticeCourses
];
