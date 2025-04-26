import { Course } from "@/types/course";

export const masterclassCourse: Course = {
  id: "psle-chinese-masterclass",
  title: "PSLE 华文名师专项提分课",
  description: "由资深华文名师主讲，针对PSLE华文考试重点难点进行专项训练，助你提升成绩。",
  level: "p6",
  subject: "chinese",
  duration: "10 weeks",
  rating: 4.9,
  views: 156,
  price: "S$399",
  isPremium: true,
  image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop",
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

export const chineseProfMarkingCourse = {
  id: "psle-chinese-prof-marking",
  title: "PSLE Chinese Papers Professional Marking",
  titleZh: "PSLE 华文名师专项提分课",
  description: "Get your Chinese essays and papers marked by experienced PSLE teachers with detailed feedback.",
  descriptionZh: "由资深华文名师主讲，针对PSLE华文考试重点难点进行专项训练，助你提升成绩。",
  level: "p6",
  subject: "chinese",
  duration: "10 weeks",
  durationZh: "10周",
  rating: 4.9,
  views: 156,
  price: "S$399",
  priceZh: "399新币",
  isPremium: true,
  image: "/lovable-uploads/47dff8f2-25a7-4d51-b09b-92406d7858c1.png",
  type: "masterclass",
  courses: []
};

export const chineseCourses = [
  chineseProfMarkingCourse,
  masterclassCourse,
  ...oralPracticeCourses
];
