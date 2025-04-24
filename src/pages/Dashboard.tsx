
import React from 'react';
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import LearningProgress from "@/components/dashboard/LearningProgress";
import ActivityModules from "@/components/dashboard/ActivityModules";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const mockSubjects = [
  { name: 'Chinese', progress: 75 },
  { name: 'English', progress: 60 },
  { name: 'Math', progress: 85 }
];

const mockModules = [
  { name: 'Vocabulary', completed: 12, total: 20 },
  { name: 'Grammar', completed: 8, total: 15 },
  { name: 'Writing', completed: 5, total: 10 }
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
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <LearningProgress subjects={mockSubjects} />
            </Card>
            <Card className="p-6">
              <ActivityModules modules={mockModules} />
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
