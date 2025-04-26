
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
  type: "tutorial" | "past_paper" | "masterclass";
  videoUrl?: string;
  requiresAccessCode?: boolean;
  seriesId?: string;
};
