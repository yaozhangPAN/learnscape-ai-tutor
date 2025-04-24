
export interface Question {
  id: string;
  title: string;
  content: {
    question: string;
    answer?: string;
  };
  subject?: string;
  level?: string;
  term?: string;
}
