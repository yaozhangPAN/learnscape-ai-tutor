
import { Course } from "@/types/course";

export const masterclassCourse: Course = {
  id: "psle-chinese-masterclass",
  title: "PSLE 华文名师阅读理解、作文专项提分课",
  description: "赠课：本系列课试听内容，由资深华文名师主讲，针对PSLE华文考试阅读理解和作文重点难点进行专项训练，助你提升成绩。",
  level: "p6",
  subject: "chinese",
  duration: "10 weeks",
  rating: 4.9,
  views: 156,
  price: "free",
  isPremium: true,
  image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop",
  type: "masterclass",
  requiresAccessCode: true,
  seriesId: "psle-chinese-masterclass"
};

export const oralPracticeCourse: Course = {
  id: "psle-chinese-oral-practice-1",
  title: "PSLE 华文口试练习1",
  description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
  level: "p6",
  subject: "chinese",
  duration: "1 video",
  rating: 4.8,
  views: 320,
  price: "Free",
  isPremium: false,
  image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 285,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 267,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 245,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 234,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 223,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
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
    views: 215,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
    type: "tutorial",
    videoUrl: "https://www.youtube.com/embed/sP0tVrtx_LY?si=WVIDrYeoCcP8PSrN"
  }
];

export const oralPracticeSeries = {
  id: "psle-chinese-oral-practice",
  title: "PSLE Chinese Oral Practice Series",
  titleZh: "PSLE 华文口试练习系列",
  description: "Comprehensive oral practice series with detailed demonstrations and tips for PSLE Chinese oral exam",
  descriptionZh: "全面的PSLE华文口试练习系列，包含详细示范和应试技巧",
  level: "p6",
  subject: "chinese",
  duration: "7 videos",
  durationZh: "7个视频",
  rating: 4.8,
  views: 1789,
  price: "Free",
  priceZh: "免费",
  isPremium: false,
  image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
  type: "tutorial" as const,
  courses: oralPracticeCourses
};

export const chineseProfMarkingCourse = {
  id: "psle-chinese-masterclass",
  title: "PSLE Chinese Masterclass-Comprehension and composition",
  titleZh: "PSLE 华文名师阅读理解、作文专项提分课",
  description: "Get your Chinese essays and papers marked by experienced PSLE teachers with detailed feedback.",
  descriptionZh: "由资深华文名师主讲，针对PSLE华文考试阅读理解和作文重点难点进行专项训练，助你提升成绩。",
  level: "p6",
  subject: "chinese",
  duration: "10 weeks",
  durationZh: "10周",
  rating: 4.9,
  views: 156,
  price: "S$399",
  priceZh: "399新币",
  isPremium: true,
  image: "/lovable-uploads/3a8a17fe-664a-4c72-990a-dee148e1f5bb.png",
  type: "masterclass" as const,
  courses: [masterclassCourse]
};

export const chineseCourses = [
  chineseProfMarkingCourse,
  masterclassCourse,
  ...oralPracticeCourses
];
