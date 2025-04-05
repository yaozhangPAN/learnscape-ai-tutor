
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";
import { Calendar, Brain, Sparkles, Star } from "lucide-react";

const DailyPlan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white py-16 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-yellow-200 opacity-70 animate-bounce-slow"></div>
        <div className="absolute bottom-10 left-20 w-10 h-10 rounded-full bg-blue-200 opacity-70 animate-float"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Calendar className="mr-3 h-8 w-8" />
            Daily Study Plan
            <Sparkles className="ml-3 h-6 w-6 text-yellow-200 animate-pulse" />
          </h1>
          <p className="text-lg max-w-3xl backdrop-blur-sm bg-white/10 p-4 rounded-lg">
            Your personalized AI-powered daily study plan tailored to your learning needs 
            based on your performance and learning goals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center mr-3">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-learnscape-darkBlue flex items-center">
              Your Personalized Study Plan
              <Star className="ml-2 h-5 w-5 text-yellow-400 animate-spin-slow" />
            </h2>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-pink-100 opacity-30 blur-md animate-pulse hidden md:block"></div>
          <div className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-green-100 opacity-30 blur-md animate-bounce-slow hidden md:block"></div>
          
          <DailyRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
