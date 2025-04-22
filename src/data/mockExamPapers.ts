
import { ExamPaper } from "@/types/exam";

export const mockExamPapers: ExamPaper[] = [
  {
    id: "1",
    title: "南洋小学小六华文试卷",
    school: "Nanyang Primary",
    year: "2024",
    type: "SA1",
    subject: "chinese",
    level: "p6",
    downloadCount: 245,
    isTopSchool: true,
    isOnlineAvailable: true
  }
];

export const schools = Array.from(new Set(mockExamPapers.map(paper => paper.school))).sort();
export const years = Array.from(new Set(mockExamPapers.map(paper => paper.year))).sort((a, b) => b.localeCompare(a));
export const paperTypes = Array.from(new Set(mockExamPapers.map(paper => paper.type))).sort();
