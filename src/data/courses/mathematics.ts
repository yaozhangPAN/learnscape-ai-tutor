
import { Course } from "@/types/course";

export const mathematicsCourses: Course[] = [
  {
    id: "1",
    title: "Primary 6 Mathematics - Problem Solving Strategies",
    description: "Learn effective problem-solving techniques for PSLE Mathematics",
    level: "p6",
    subject: "mathematics",
    duration: "10 weeks",
    rating: 4.8,
    students: 248,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  },
  {
    id: "5",
    title: "Primary 5 Mathematics - Fractions and Decimals",
    description: "Master the concepts of fractions and decimals",
    level: "p5",
    subject: "mathematics",
    duration: "8 weeks",
    rating: 4.7,
    students: 186,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "tutorial"
  }
];

export const mathematicsPastPapers: Course[] = [
  {
    id: "9",
    title: "2024 PSLE Mathematics Paper Walkthrough",
    description: "Detailed explanation of the 2024 PSLE Mathematics paper with step-by-step solutions",
    level: "p6",
    subject: "mathematics",
    duration: "3 weeks",
    rating: 4.9,
    students: 312,
    price: "S$40",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  },
  {
    id: "12",
    title: "2023 PSLE Mathematics Paper Walkthrough",
    description: "In-depth review of the 2023 PSLE Mathematics paper with strategies for similar questions",
    level: "p6",
    subject: "mathematics",
    duration: "2 weeks",
    rating: 4.9,
    students: 398,
    price: "S$40",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  },
  {
    id: "14",
    title: "P5 Common Test - Mathematics Solutions",
    description: "Expert guidance on typical Primary 5 mathematics assessment questions",
    level: "p5",
    subject: "mathematics",
    duration: "1 week",
    rating: 4.6,
    students: 178,
    price: "Free",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "past_paper"
  }
];
