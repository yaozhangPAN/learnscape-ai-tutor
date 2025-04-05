import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-learnscape-yellow">
      <div className="absolute inset-0 bg-gradient-to-b from-learnscape-yellow to-white z-0"></div>
      
      <div className="absolute top-20 left-10 w-8 h-8 text-white">✨</div>
      <div className="absolute top-40 right-20 w-8 h-8 text-white">✨</div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 text-white">✨</div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 text-white">☁️</div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-learnscape-darkBlue sm:text-5xl md:text-6xl">
                <span className="block mb-2">Learning is an</span>
                <span className="block mt-1 text-learnscape-brown flex items-center gap-2">
                  Adventure! <Sparkles className="inline-block w-6 h-6 md:w-8 md:h-8 animate-wiggle text-yellow-400" />
                </span>
              </h1>
              <p className="mt-3 text-base text-learnscape-darkBlue sm:mt-5 sm:text-lg">
                Join our fun-filled learning journey with engaging activities, exciting challenges, and friendly characters to guide you along the way!
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-bold bg-green-500 hover:bg-green-600 rounded-full text-white group">
                    <Link to="/question-bank">
                      Start Adventure
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-full group">
                    <Link to="/dashboard">
                      My Achievements <Sparkles className="ml-2 h-4 w-4 transition-all group-hover:animate-spin-slow" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="relative mx-auto w-full rounded-2xl shadow-lg lg:max-w-md">
                <div className="relative block w-full h-full bg-cyan-200 rounded-2xl overflow-hidden border-4 border-white">
                  <div className="p-6">
                    <Link to="/question-bank" className="block">
                      <div className="bg-cyan-100 rounded-xl shadow-md p-6 transition-all hover:scale-105">
                        <div className="text-center mb-4">
                          <h3 className="text-2xl font-bold text-teal-700">
                            Adventure Time!
                          </h3>
                        </div>
                        <div className="flex justify-center">
                          <img 
                            src="/lovable-uploads/6fc86bb0-e4ce-4b8b-80fb-d8a2360bcad7.png" 
                            alt="Adventure scene with mountains and castle" 
                            className="h-32 object-contain rounded-lg" 
                          />
                        </div>
                        <div className="mt-4 text-sm text-center text-teal-700 bg-white p-3 rounded-lg border border-teal-200 font-medium">
                          Start your learning adventure today!
                        </div>
                      </div>
                    </Link>
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
