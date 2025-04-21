
export interface Question {
  id: number;
  title: string;
  content: any;
  subject: string;
  type: string;
  level: string;
  term: string;
  date: string;
}

export interface Answer {
  id: string;
  value: string;
}
