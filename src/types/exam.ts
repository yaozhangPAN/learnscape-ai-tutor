
export type ExamPaper = {
  id: string;
  title: string;
  school: string;
  year: string;
  type: string;
  subject: string;
  level: string;
  downloadCount: number;
  isTopSchool?: boolean; // Keeping this to maintain compatibility with existing data
  isOnlineAvailable?: boolean; // This is now optional as all papers can be taken online
};
