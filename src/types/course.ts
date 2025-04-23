
export type Course = {
  id: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  level: string;
  subject: string;
  duration: string;
  durationZh?: string;
  rating: number;
  students: number;
  price: string;
  priceZh?: string;
  isPremium: boolean;
  image: string;
  type: "tutorial" | "past_paper";
  videoUrl?: string;
  requiresAccessCode?: boolean;
};
