
import React from 'react';
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import LearningProgress from "@/components/dashboard/LearningProgress";
import ActivityModules from "@/components/dashboard/ActivityModules";
import StreakComponent from "@/components/StreakComponent";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookX, Book, Star } from "lucide-react";

const mockSubjects = [
  { name: 'Chinese', progress: 75 },
  { name: 'English', progress: 60 },
  { name: 'Math', progress: 85 }
];

// Update mockModules to match the ActivityModule type
const mockModules = [
  { 
    title: "错题本", 
    description: "Review incorrect answers",
    icon: <BookX className="h-8 w-8 text-white" />,
    count: 12, 
    color: "bg-rose-600",
    isLoading: false,
    link: "/wrong-questions"
  },
  { 
    title: "收藏夹", 
    description: "Your saved questions",
    icon: <Star className="h-8 w-8 text-white" />,
    count: 8, 
    color: "bg-amber-600",
    isLoading: false,
    link: "/favorites"
  },
  { 
    title: "词汇学习", 
    description: "Build vocabulary",
    icon: <Book className="h-8 w-8 text-white" />,
    count: 5, 
    color: "bg-blue-600",
    isLoading: false,
    link: "/ai-tutor/vocabulary"
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <ActivityModules modules={mockModules} />
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <LearningProgress subjects={mockSubjects} />
            </Card>
            <Card className="p-6">
              <StreakComponent />
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
