
export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  subject: string;
  duration: string;
  rating: number;
  students: number;
  price: string;
  isPremium: boolean;
  image: string;
  type: string;
  requiresAccessCode?: boolean;
  videoUrl?: string;
}
