
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";
import { Calendar, Brain, BookOpen, Award } from "lucide-react";

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
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-learnscape-darkBlue">
                Your Learning Journey
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold text-amber-500">4</span>
              <span className="text-gray-500">day streak</span>
            </div>
          </div>
          <DailyRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
