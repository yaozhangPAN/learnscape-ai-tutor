
export interface Question {
  id: string;
  title: string;
  content: {
    question: string;
    options?: Record<string, string>;
    answer?: string;
  } | string;
  subject?: string;
  level?: string;
  term?: string;
}
