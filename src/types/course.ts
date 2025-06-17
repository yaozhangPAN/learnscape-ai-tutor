
export type CourseSeriesType = "masterclass" | "tutorial" | "past_paper";

export interface CourseSeries {
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
  views: number;
  price: string;
  priceZh?: string;
  isPremium: boolean;
  image: string;
  type: CourseSeriesType;
  courses?: Course[];
  comingSoon?: boolean;
}

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
  views: number;
  price: string;
  priceZh?: string;
  isPremium: boolean;
  image: string;
  type: "tutorial" | "past_paper" | "masterclass" | "workshop";
  videoUrl?: string;
  requiresAccessCode?: boolean;
  seriesId?: string;
};
