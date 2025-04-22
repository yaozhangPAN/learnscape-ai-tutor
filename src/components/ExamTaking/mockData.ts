
import { Question } from "./types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "语文应用（一）：请选择最适合的词语填空。",
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
    id: "q2",
    text: "短文填空（一）：阅读下面的短文，根据上下文选择合适的词语填空。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 关心" },
      { value: "B", label: "B. 帮助" },
      { value: "C", label: "C. 支持" },
      { value: "D", label: "D. 鼓励" }
    ],
    correctAnswer: "B"
  },
  {
    id: "q3",
    text: "阅读理解一（一）：请阅读下面的短文，然后回答问题。",
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
    id: "q4",
    text: "完成对话（一）：请选择最适合的句子完成对话。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 我很喜欢这本书" },
      { value: "B", label: "B. 这本书太贵了" },
      { value: "C", label: "C. 明天我们再来" },
      { value: "D", label: "D. 我们去图书馆吧" }
    ],
    correctAnswer: "D"
  },
  {
    id: "q5",
    text: "阅读理解二（一）：阅读下面的文章，选择正确的答案。",
    type: "MCQ",
    marks: 3,
    options: [
      { value: "A", label: "A. 保护环境" },
      { value: "B", label: "B. 勤奋学习" },
      { value: "C", label: "C. 关心他人" },
      { value: "D", label: "D. 为人诚实" }
    ],
    correctAnswer: "A"
  }
];
