import { Course, CourseSeries } from "@/types/course";

// 将Google Drive视频链接转换为嵌入格式的函数
const convertGoogleDriveLink = (shareUrl: string): string => {
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : shareUrl;
};

// PSLE口试冲刺课+阅读理解二 系列课程
export const oralComprehension2Courses: Course[] = [
  {
    id: "psle-oral-comprehension2-lesson1",
    title: "第一课",
    titleZh: "第一课",
    description: "PSLE口试冲刺课+阅读理解二 第一课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第一课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1Kw806mDXf_ir3FW4XZXJL1D1WLbwVVH8/view?usp=sharing"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson2",
    title: "第二课",
    titleZh: "第二课",
    description: "PSLE口试冲刺课+阅读理解二 第二课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第二课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1KKgneP3Yr60w4D3pdAhkSY6wvTD0CvVt/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson3",
    title: "第三课",
    titleZh: "第三课",
    description: "PSLE口试冲刺课+阅读理解二 第三课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第三课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1yZUIAKZxWoql3hpCSTbUhloeRYtAUPMu/view?usp=sharing"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson4",
    title: "第四课",
    titleZh: "第四课",
    description: "PSLE口试冲刺课+阅读理解二 第四课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第四课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/119080K0B8ZzaN67U0B6ZrKFttEYn8tQZ/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson5",
    title: "第五课",
    titleZh: "第五课",
    description: "PSLE口试冲刺课+阅读理解二 第五课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第五课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1pV44Ye_n2Z3TxjrhiOYOW8DzxIrbWQv3/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson6",
    title: "第六课",
    titleZh: "第六课",
    description: "PSLE口试冲刺课+阅读理解二 第六课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第六课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1UF0oJ7RW4lNKIvLB1CrvnbUFEuAVv2BF/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson7",
    title: "第七课",
    titleZh: "第七课",
    description: "PSLE口试冲刺课+阅读理解二 第七课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第七课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1jony9ziV6N2Rv2YjAEeHi8WDkL--iGk8/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson8",
    title: "第八课",
    titleZh: "第八课",
    description: "PSLE口试冲刺课+阅读理解二 第八课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第八课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1pyp0F1JVCA0JrGbJSF80ziBLMuXHsyOw/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson9",
    title: "第九课",
    titleZh: "第九课",
    description: "PSLE口试冲刺课+阅读理解二 第九课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第九课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1ySxvrJ4DS7PuoutPE4OMzakOtFoQLRBd/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  },
  {
    id: "psle-oral-comprehension2-lesson10",
    title: "第十课",
    titleZh: "第十课",
    description: "PSLE口试冲刺课+阅读理解二 第十课",
    descriptionZh: "PSLE口试冲刺课+阅读理解二 第十课",
    level: "p5-p6",
    subject: "chinese",
    duration: "45分钟",
    durationZh: "45分钟",
    rating: 4.8,
    views: 0,
    price: "S$99",
    priceZh: "99新币",
    isPremium: true,
    requiresAccessCode: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    type: "tutorial",
    videoUrl: convertGoogleDriveLink("https://drive.google.com/file/d/1YzC1aT-VsOb1kR-QfRoUsvSy66eadn7y/view?usp=drive_link"),
    seriesId: "psle-oral-comprehension2-series"
  }
];

// 课程系列定义
export const oralComprehension2Series: CourseSeries = {
  id: "psle-oral-comprehension2-series",
  title: "PSLE口试冲刺课+阅读理解二",
  titleZh: "PSLE口试冲刺课+阅读理解二",
  description: "专为P5-P6学生设计的PSLE口试和阅读理解进阶课程，通过十堂系统课程提升口语表达和阅读理解能力",
  descriptionZh: "专为P5-P6学生设计的PSLE口试和阅读理解进阶课程，通过十堂系统课程提升口语表达和阅读理解能力",
  level: "p5-p6",
  subject: "chinese",
  duration: "10堂课",
  durationZh: "10堂课",
  rating: 4.8,
  views: 0,
  price: "S$399",
  priceZh: "399新币",
  isPremium: true,
  image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
  type: "tutorial",
  courses: oralComprehension2Courses
};
