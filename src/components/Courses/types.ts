
export interface HomeworkQuestion {
  id: string;
  title: string;
  content: string;
  question: string;
  imageUrl?: string;
}

export interface QuestionAnswerProps {
  questionId: string;
  questionContent: any; // Changed from string to any to support nested properties
  questionText: string;
  imageUrl?: string;
}
