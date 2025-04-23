
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
  id: "psle-chinese-oral-practice",
  title: "PSLE 华文口试练习系列",
  titleZh: "PSLE 华文口试练习系列",
  description: "Complete set of oral practice videos to help students master oral exam techniques.",
  descriptionZh: "完整的口试练习视频系列，帮助学生掌握口试考试技巧。",
  level: "p6",
  subject: "chinese",
  duration: "7 videos",
  durationZh: "7个视频",
  rating: 4.8,
  views: 320,
  price: "Free",
  priceZh: "免费",
  isPremium: false,
  image: "https://images.unsplash.com/photo-1555431189-0fabf2667795",
  type: "tutorial",
  videoLessons: [
    {
      id: "oral-practice-1",
      title: "PSLE 华文口试练习1",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/ZobPO6C7TTM?si=0ZQL8bcz_vzgP1oq"
    },
    {
      id: "oral-practice-2",
      title: "PSLE 华文口试练习2",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/cTRwD-h6xdA?si=c1CrIbAQHtuEAmF8"
    },
    {
      id: "oral-practice-3",
      title: "PSLE 华文口试练习3",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/5Lib4BxW3tg?si=wqLRXlwKGcSNvCeM"
    },
    {
      id: "oral-practice-4",
      title: "PSLE 华文口试练习4",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/C_DXx5gBPNg?si=VdSIsUAwxqc5_9rn"
    },
    {
      id: "oral-practice-5",
      title: "PSLE 华文口试练习5",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/aP-XoRMU0OM?si=PM2FEF0OAB8-v1EX"
    },
    {
      id: "oral-practice-6",
      title: "PSLE 华文口试练习6",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/vzmtLIyebxg?si=kPxYvgFJpxCfLpWm"
    },
    {
      id: "oral-practice-7",
      title: "PSLE 华文口试练习7",
      description: "免费口试练习视频系列，帮助学生掌握口试考试技巧和要点。",
      videoUrl: "https://www.youtube.com/embed/sP0tVrtx_LY?si=WVIDrYeoCcP8PSrN"
    }
  ]
};

export const chineseCourses: Course[] = [
  masterclassCourse,
  oralPracticeCourse
];
