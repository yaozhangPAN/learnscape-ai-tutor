
export type QuestionType = "MCQ" | "ShortAnswer" | "Essay";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  marks: number;
  image?: string;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  school: string;
  subject: string;
  level: string;
  year: string;
  type: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  isAnswered: boolean;
  marksAwarded: number;
}
