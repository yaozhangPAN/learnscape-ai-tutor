
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, BookOpen } from "lucide-react";

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
      <div className="absolute inset-0 bg-gradient-to-b from-learnscape-yellow/30 to-white z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-10 h-10 rounded-full bg-red-200 animate-bounce-slow opacity-70 hidden md:block"></div>
      <div className="absolute top-40 right-20 w-8 h-8 rounded-full bg-blue-200 animate-float opacity-70 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 rounded-full bg-green-200 animate-spin-slow opacity-70 hidden md:block"></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-purple-200 animate-wiggle opacity-70 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-learnscape-darkBlue sm:text-5xl md:text-6xl">
                <span className="block mb-2">Learning is an</span>
                <span className="block mt-1 gradient-text flex items-center gap-2">
                  Adventure! <Sparkles className="inline-block w-6 h-6 md:w-8 md:h-8 animate-wiggle text-yellow-400" />
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg">
                Join Learnscape for free academic support with Singapore primary school tuition materials, exam papers, worksheets, and get premium supports from AI Tutor for personalized, interactive AI-powered learning!
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-learnscape-blue hover:bg-blue-700 group">
                    <Link to="/register">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium border-learnscape-blue text-learnscape-blue hover:bg-blue-50">
                    <Link to="/about">
                      Our Story <BookOpen className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-learnscape-purple hover:bg-purple-700 text-white group">
                    <Link to="/referral">
                      Invite Friends <Sparkles className="ml-2 h-4 w-4 transition-all group-hover:animate-spin-slow" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full h-full bg-learnscape-lightGray rounded-lg overflow-hidden">
                  <div className="p-8">
                    <div className="bg-white rounded-lg shadow-md p-6 animate-float hover:animate-bounce-slow transition-all">
                      <div className="flex space-x-4 items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center animate-pulse">
                          <Brain className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-learnscape-darkBlue flex items-center">
                            AI Tutor <Sparkles className="ml-2 h-4 w-4 text-yellow-400" />
                          </h3>
                          <p className="text-sm text-gray-500">Your learning companion</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100 relative">
                        <span className="absolute -top-2 -left-2 bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center text-xs">💡</span>
                        Let's practice more multiplication today!
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
