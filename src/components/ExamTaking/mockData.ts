
import { Question } from "./types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "阅读理解（一）：请阅读下面的短文，然后回答问题。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 为人诚实" },
      { value: "B", label: "B. 勤奋学习" },
      { value: "C", label: "C. 关心他人" },
      { value: "D", label: "D. 保护环境" }
    ],
    correctAnswer: "C"
  },
  {
    id: "q2",
    text: "阅读理解（二）：根据短文内容选择正确的答案。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 春天" },
      { value: "B", label: "B. 夏天" },
      { value: "C", label: "C. 秋天" },
      { value: "D", label: "D. 冬天" }
    ],
    correctAnswer: "A"
  },
  {
    id: "q3",
    text: "词语运用：请选择最适合的词语填空。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 匆匆忙忙" },
      { value: "B", label: "B. 轻轻松松" },
      { value: "C", label: "C. 高高兴兴" },
      { value: "D", label: "D. 认认真真" }
    ],
    correctAnswer: "D"
  },
  {
    id: "q4",
    text: "写出下面词语的反义词。",
    type: "ShortAnswer",
    marks: 2,
    correctAnswer: "关闭 - 开启"
  },
  {
    id: "q5",
    text: "造句：使用"虽然……但是……"完成句子。",
    type: "ShortAnswer",
    marks: 3,
    correctAnswer: "虽然下雨了，但是他们还是准时到达了。"
  }
];
