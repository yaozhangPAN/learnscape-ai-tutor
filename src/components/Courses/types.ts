
export interface HomeworkQuestion {
  id: string;
  title: string;
  content: string;
  question: string;
  imageUrl?: string;
}

export interface QuestionAnswerProps {
  questionId: string;
  questionContent: string;
  questionText: string;
  imageUrl?: string;
}
