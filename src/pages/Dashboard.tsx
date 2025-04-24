
import React from 'react';
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import LearningProgress from "@/components/dashboard/LearningProgress";
import ActivityModules from "@/components/dashboard/ActivityModules";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
              <LearningProgress />
            </Card>
            <Card className="p-6">
              <ActivityModules />
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
