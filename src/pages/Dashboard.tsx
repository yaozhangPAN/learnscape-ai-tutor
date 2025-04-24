
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import ActivityModules from "@/components/dashboard/ActivityModules";
import StreakComponent from "@/components/StreakComponent";
import UserRecentActivities from "@/components/UserRecentActivities";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react";
import { trackUserBehavior, usePageViewTracking } from "@/utils/behaviorTracker";

const mockSubjects = [
  { name: 'Chinese', progress: 75 },
  { name: 'English', progress: 60 },
  { name: 'Math', progress: 85 }
];

// Update mockModules to match the ActivityModule type
const mockModules = [
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
  
  // Track page view
  usePageViewTracking('dashboard');

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleModuleClick = (moduleTitle: string) => {
    trackUserBehavior('click', {
      componentId: 'activity-module',
      actionDetails: { module: moduleTitle }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <div onClick={() => handleModuleClick(mockModules[0].title)}>
            <ActivityModules modules={mockModules} />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <StreakComponent />
            </Card>
            <Card className="p-6">
              <UserRecentActivities />
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
