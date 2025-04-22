import { ExamPaper } from "@/types/exam";

export const mockExamPapers: ExamPaper[] = [
  {
    id: "13",
    title: "Chinese Paper 2",
    school: "Nanyang Primary",
    year: "2019",
    type: "SA1",
    subject: "chinese",
    level: "p6",
    downloadCount: 178,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "1",
    title: "English Paper 1",
    school: "Rosyth School",
    year: "2023",
    type: "SA2",
    subject: "english",
    level: "p6",
    downloadCount: 245,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "2",
    title: "Mathematics Paper 2",
    school: "Nanyang Primary",
    year: "2023",
    type: "SA1",
    subject: "mathematics",
    level: "p6",
    downloadCount: 317,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "3",
    title: "Science Paper 1",
    school: "Raffles Primary",
    year: "2023",
    type: "SA2",
    subject: "science",
    level: "p6",
    downloadCount: 198,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "4",
    title: "Chinese Paper 1",
    school: "Tao Nan School",
    year: "2023",
    type: "SA1",
    subject: "chinese",
    level: "p5",
    downloadCount: 156,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "5",
    title: "Mathematics Paper 1",
    school: "Henry Park Primary",
    year: "2023",
    type: "SA2",
    subject: "mathematics",
    level: "p5",
    downloadCount: 267,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "6",
    title: "Science Paper 2",
    school: "Catholic High Primary",
    year: "2023",
    type: "SA1",
    subject: "science",
    level: "p5",
    downloadCount: 182,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "7",
    title: "English Comprehension",
    school: "Methodist Girls' School",
    year: "2023",
    type: "SA2",
    subject: "english",
    level: "p6",
    downloadCount: 203,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "8",
    title: "Mathematics Problem Solving",
    school: "Anglo-Chinese School",
    year: "2022",
    type: "SA2",
    subject: "mathematics",
    level: "p6",
    downloadCount: 289,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "9",
    title: "Science Practical",
    school: "Maha Bodhi School",
    year: "2022",
    type: "SA1",
    subject: "science",
    level: "p5",
    downloadCount: 178,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "10",
    title: "English Grammar",
    school: "CHIJ Primary",
    year: "2022",
    type: "SA2",
    subject: "english",
    level: "p5",
    downloadCount: 165,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "11",
    title: "Mathematics Fractions",
    school: "St. Nicholas Girls' School",
    year: "2022",
    type: "SA1",
    subject: "mathematics",
    level: "p5",
    downloadCount: 192,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "12",
    title: "Science Energy",
    school: "Pei Hwa Presbyterian",
    year: "2022",
    type: "SA2",
    subject: "science",
    level: "p6",
    downloadCount: 213,
    isTopSchool: false,
    isOnlineAvailable: false
  }
];

export const schools = Array.from(new Set(mockExamPapers.map(paper => paper.school))).sort();
export const years = Array.from(new Set(mockExamPapers.map(paper => paper.year))).sort((a, b) => b.localeCompare(a));
export const paperTypes = Array.from(new Set(mockExamPapers.map(paper => paper.type))).sort();
