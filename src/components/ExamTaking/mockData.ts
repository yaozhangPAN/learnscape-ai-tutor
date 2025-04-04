
import { Question } from "./types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "If x = 5 and y = 3, calculate the value of 2x + 3y.",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 16" },
      { value: "B", label: "B. 19" },
      { value: "C", label: "C. 22" },
      { value: "D", label: "D. 25" }
    ],
    correctAnswer: "B"
  },
  {
    id: "q2",
    text: "What is the area of a rectangle with length 12 cm and width 5 cm?",
    type: "MCQ",
    marks: 2,
    options: [
      { value: "A", label: "A. 17 cm²" },
      { value: "B", label: "B. 34 cm²" },
      { value: "C", label: "C. 60 cm²" },
      { value: "D", label: "D. 120 cm²" }
    ],
    correctAnswer: "C"
  },
  {
    id: "q3",
    text: "Solve the equation: 3x - 7 = 14",
    type: "MCQ",
    marks: 3,
    options: [
      { value: "A", label: "A. x = 5" },
      { value: "B", label: "B. x = 7" },
      { value: "C", label: "C. x = 9" },
      { value: "D", label: "D. x = 21" }
    ],
    correctAnswer: "B"
  },
  {
    id: "q4",
    text: "Calculate the perimeter of a square with sides of length 8 cm.",
    type: "ShortAnswer",
    marks: 3,
    correctAnswer: "32 cm"
  },
  {
    id: "q5",
    text: "Factor completely: x² - 9",
    type: "ShortAnswer",
    marks: 3,
    correctAnswer: "(x+3)(x-3)"
  },
  {
    id: "q6",
    text: "A train travels at a speed of 80 km/h. How far will it travel in 3.5 hours?",
    type: "ShortAnswer",
    marks: 3,
    correctAnswer: "280 km"
  },
  {
    id: "q7",
    text: `<p>Look at the diagram below of a right-angled triangle.</p>
    <p>If angle A = 30° and side b = 8 cm, find the length of side a.</p>`,
    type: "ShortAnswer",
    marks: 4,
    image: "https://www.mathsisfun.com/geometry/images/triangle-right-d.svg",
    correctAnswer: "4.62 cm"
  },
  {
    id: "q8",
    text: "Explain how to solve a quadratic equation using the quadratic formula. Give an example with your solution.",
    type: "Essay",
    marks: 5
  }
];
