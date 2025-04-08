
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";
import { Calendar, Brain, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const DailyPlan = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-learnscape-darkBlue to-learnscape-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Calendar className="mr-3 h-8 w-8" />
            Daily Study Path
          </h1>
          <p className="text-lg max-w-3xl">
            Your personalized learning journey tailored to your learning needs 
            based on your performance and learning goals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-learnscape-blue mr-3" />
              <h2 className="text-2xl font-bold text-learnscape-darkBlue">
                Your Learning Journey
              </h2>
            </div>
            <Link to="/zoom-courses">
              <Button variant="outline" className="gap-2">
                <Video className="h-4 w-4" />
                Join Zoom Courses
              </Button>
            </Link>
          </div>
          <DailyRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
