
import { Question } from "./types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "语文应用（一）：妈妈叫我不要喝冷的饮料，这对身体无益。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. yin liao" },
      { value: "2", label: "B. yin liao" },
      { value: "3", label: "C. ying lao" },
      { value: "4", label: "D. ying lao" }
    ],
    correctAnswer: "1"
  },
  {
    id: "q2",
    text: "语文应用（二）：再三催促下，小华终于把故事书还给我。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. cui cu" },
      { value: "2", label: "B. cui zú" },
      { value: "3", label: "C. chui chu" },
      { value: "4", label: "D. chui zhu" }
    ],
    correctAnswer: "1"
  },
  {
    id: "q3",
    text: "语文应用（三）：因为很久没下雨，所以土地都干__了。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. 列" },
      { value: "2", label: "B. 例" },
      { value: "3", label: "C. 烈" },
      { value: "4", label: "D. 裂" }
    ],
    correctAnswer: "4"
  },
  {
    id: "q4",
    text: "语文应用（四）：姐姐高中__业后，想去英国留学。",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. 必" },
      { value: "2", label: "B. 闭" },
      { value: "3", label: "C. 毕" },
      { value: "4", label: "D. 壁" }
    ],
    correctAnswer: "3"
  },
  {
    id: "q5",
    text: "阅读理解（一）：根据文章内容，丽丽是个怎样的孩子?",
    type: "MCQ",
    marks: 3,
    options: [
      { value: "1", label: "A. 很多缺点，又不愿改过" },
      { value: "2", label: "B. 懒得做事，喜欢说笑话" },
      { value: "3", label: "C. 没礼貌，对自己要求不高" },
      { value: "4", label: "D. 智力不高，对自己要求高" }
    ],
    correctAnswer: "2"
  },
  {
    id: "q6",
    text: "阅读理解（二）：为什么丽丽看来垂头丧气?",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. 她一直没有考第一名" },
      { value: "2", label: "B. 老师说她做事不认真" },
      { value: "3", label: "C. 她在考试中得到最低分" },
      { value: "4", label: "D. 父母和老师都劝她改过" }
    ],
    correctAnswer: "3"
  },
  {
    id: "q7",
    text: "阅读理解（三）：陈爷爷怎么帮助丽丽?",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "1", label: "A. 耐心地教导丽丽做功课" },
      { value: "2", label: "B. 吩咐丽丽以后要准时交功课" },
      { value: "3", label: "C. 劝告丽丽不要因为小事而哭" },
      { value: "4", label: "D. 叫丽丽不要理睬嘲笑她的同学" }
    ],
    correctAnswer: "1"
  }
];
