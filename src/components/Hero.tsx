
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-learnscape-yellow/30 to-white z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-learnscape-darkBlue sm:text-5xl md:text-6xl">
                <span className="block">AI-Powered Learning for</span>
                <span className="block mt-1 gradient-text">Singapore Students</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg">
                Learnscape offers free academic support with Singapore primary school tuition materials, 
                exam papers, worksheets, and AI-driven personalized learning.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-learnscape-blue hover:bg-blue-700">
                    <Link to="/register">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium border-learnscape-blue text-learnscape-blue hover:bg-blue-50">
                    <Link to="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full h-full bg-learnscape-lightGray rounded-lg overflow-hidden">
                  <div className="p-8">
                    <div className="bg-white rounded-lg shadow-md p-6 animate-float">
                      <div className="flex space-x-4 items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-learnscape-purple flex items-center justify-center">
                          <span className="text-white font-bold text-lg">AI</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-learnscape-darkBlue">Personalized Learning</h3>
                          <p className="text-sm text-gray-500">Adaptive to your needs</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        Recommended: Practice more multiplication exercises
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
