
export interface HomeworkQuestion {
  id: string;
  title: string;
  content: string;
  question: string;
}

export interface QuestionAnswerProps {
  questionId: string;
  questionContent: string;
  questionText: string;
}
