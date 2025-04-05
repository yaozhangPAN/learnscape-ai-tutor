
export type ExamPaper = {
  id: string;
  title: string;
  school: string;
  year: string;
  type: string;
  subject: string;
  level: string;
  downloadCount: number;
  isTopSchool?: boolean;
  isOnlineAvailable?: boolean;
};
