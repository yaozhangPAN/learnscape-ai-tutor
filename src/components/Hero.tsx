
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Calendar } from "lucide-react";

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEF7CD] to-white z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-10 h-10 rounded-full bg-green-200 animate-bounce-slow opacity-70 hidden md:block"></div>
      <div className="absolute top-40 right-20 w-8 h-8 rounded-full bg-green-200 animate-float opacity-70 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 rounded-full bg-yellow-200 animate-spin-slow opacity-70 hidden md:block"></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-yellow-200 animate-wiggle opacity-70 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#5E2D00] sm:text-5xl md:text-6xl">
                <span className="block mb-2">Fun AI Learning for</span>
                <span className="block mt-1 text-[#3A761E] flex items-center gap-2">
                  Singapore Students <Sparkles className="inline-block w-6 h-6 md:w-8 md:h-8 animate-wiggle text-yellow-400" />
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg">
                Learnscape offers academic support with Top Schools tuition materials, exam papers, worksheets, Star Teacher Video Lessons, and AI Tutor for personalized, interactive AI-powered learning.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-[#4ABA79] hover:bg-[#3A9A69] group">
                    <Link to="/daily-plan" className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Daily Adventure
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-[#FFD700] hover:bg-[#f0c800] text-black group">
                    <Link to="/referral" className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Get Rewards <Sparkles className="ml-2 h-4 w-4 transition-all group-hover:animate-spin-slow" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                <img 
                  src="/public/lovable-uploads/415ba260-aeec-4f17-ae4e-b005b78136d5.png" 
                  alt="Wise Bear Character" 
                  className="absolute -left-4 -top-4 w-32 h-auto z-10 animate-float"
                />
                <div className="relative block w-full bg-white rounded-xl shadow-lg overflow-hidden p-6">
                  <div className="text-2xl font-bold text-[#5E2D00] mb-4">My Learning</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/courses" className="bg-[#4ABA79] text-white px-4 py-3 rounded-xl flex items-center justify-between hover:scale-105 transition-transform">
                      <span>Video Lessons</span>
                    </Link>
                    <Link to="/question-bank" className="bg-[#82D9CB] text-[#31514A] px-4 py-3 rounded-xl flex items-center justify-between hover:scale-105 transition-transform">
                      <span>Question Bank</span>
                      <div className="text-xs">PSLE Topics</div>
                    </Link>
                    <Link to="/daily-plan" className="bg-[#FFA85C] text-white px-4 py-3 rounded-xl flex items-center justify-between hover:scale-105 transition-transform relative">
                      <span>My Words</span>
                      <img 
                        src="/public/lovable-uploads/72f82c67-0df8-4350-814c-79ce2d5faa3f.png" 
                        alt="Explorer Bunny" 
                        className="absolute -bottom-1 -right-1 w-12 h-auto"
                      />
                    </Link>
                    <Link to="/ai-tutor" className="bg-[#4ABA79] text-white px-4 py-3 rounded-xl flex items-center justify-between hover:scale-105 transition-transform relative">
                      <div>
                        <div>AI Tutor</div>
                        <div className="text-xs">Speaking, Writing</div>
                      </div>
                      <img 
                        src="/public/lovable-uploads/2ac414cd-b34a-4efa-bf70-b16c471a377f.png" 
                        alt="Red Panda Wizard" 
                        className="absolute -bottom-1 -right-1 w-12 h-auto"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="font-bold text-[#5E2D00]">Daily Goal</div>
                    <div className="bg-[#F44336] text-white rounded-full p-2 text-sm font-bold">
                      50 XP
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
