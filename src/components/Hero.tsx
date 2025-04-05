
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay before showing the animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-learnscape-yellow to-white z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-10 h-10 rounded-full bg-green-200 animate-bounce-slow opacity-70 hidden md:block"></div>
      <div className="absolute top-40 right-20 w-8 h-8 rounded-full bg-green-200 animate-float opacity-70 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 rounded-full bg-green-200 animate-spin-slow opacity-70 hidden md:block"></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-green-200 animate-wiggle opacity-70 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 pb-10">
        {/* Cartoon-style header banner */}
        <div className="mb-8 bg-[#5BC8DF] text-white text-center py-6 px-4 rounded-full shadow-md">
          <h2 className="text-3xl md:text-4xl font-extrabold">ONLINE LEARNING</h2>
        </div>
      
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="flex flex-col items-center lg:items-start">
              <img src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" alt="Cartoon student" className="w-24 h-24 mb-4 hidden" />
              
              <h1 className="text-4xl font-extrabold tracking-tight text-learnscape-darkBlue sm:text-5xl md:text-6xl">
                <span className="flex items-center gap-2 mb-4">Welcome!</span>
              </h1>
              <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:text-2xl">
                Explore thousands of fun and interactive lessons.
              </p>
              
              <div className="mt-8 sm:flex gap-4">
                <Button asChild className="w-48 flex items-center justify-center px-8 py-6 text-xl font-bold bg-[#F9B64C] hover:bg-[#F9B64C]/90 text-[#03353E] border-2 border-[#03353E] rounded-full shadow-lg">
                  <Link to="/register">
                    Sign Up
                  </Link>
                </Button>
                
                <Button asChild className="w-48 mt-4 sm:mt-0 flex items-center justify-center px-8 py-6 text-xl font-bold bg-[#A8E6CF] hover:bg-[#A8E6CF]/90 text-[#03353E] border-2 border-[#03353E] rounded-full shadow-lg">
                  <Link to="/login">
                    Log In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="relative mx-auto w-full rounded-3xl overflow-hidden">
              <div className="relative block w-full">
                <img 
                  src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" 
                  alt="Cartoon learning mascot" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Learning Section */}
      <div className="bg-[#A8E6CF] py-8 px-4 rounded-3xl mx-4 sm:mx-8 lg:mx-16 mb-8 border-2 border-[#03353E] shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#03353E] mb-4">Continue Learning</h2>
            <div className="bg-[#03353E]/10 h-6 w-48 rounded-full mb-3"></div>
            <div className="bg-[#03353E]/10 h-6 w-32 rounded-full"></div>
          </div>
          <img 
            src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" 
            alt="Study mascot" 
            className="w-24 h-24 hidden sm:block"
          />
        </div>
      </div>
      
      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16 mb-16">
        <Link to="/courses" className="bg-[#A8E6CF] p-6 rounded-3xl border-2 border-[#03353E] shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" 
              alt="Courses mascot" 
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-3xl font-bold text-[#03353E]">COURSES</h3>
          </div>
        </Link>
        
        <Link to="/question-bank" className="bg-[#A8E6CF] p-6 rounded-3xl border-2 border-[#03353E] shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" 
              alt="Math mascot" 
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-3xl font-bold text-[#03353E]">MATH</h3>
            <p className="text-2xl font-bold text-[#03353E]">1+2=3</p>
          </div>
        </Link>
        
        <Link to="/leaderboard" className="bg-[#A8E6CF] p-6 rounded-3xl border-2 border-[#03353E] shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/lovable-uploads/4b1aa4fb-6b5d-4514-b522-b9dfa724392d.png" 
              alt="Achievements mascot" 
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-3xl font-bold text-[#03353E]">Achievements</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
