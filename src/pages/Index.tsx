import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <Features />
        <div className="py-16 bg-learnscape-yellow/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-[10%] w-12 h-12 rounded-full bg-purple-200/60 animate-bounce-slow"></div>
          <div className="absolute top-20 right-[15%] w-8 h-8 rounded-full bg-blue-200/60 animate-float"></div>
          <div className="absolute bottom-10 left-[20%] w-10 h-10 rounded-full bg-green-200/60 animate-spin-slow"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-learnscape-darkBlue sm:text-4xl relative inline-block">
                Why Students Love Learnscape
                <span className="absolute -top-6 -right-8 text-2xl animate-wiggle">✨</span>
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Join thousands of Singapore students already improving their learning outcomes.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center text-white font-bold text-xl">
                    L
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Lim Wei Ling</h3>
                    <p className="text-sm text-gray-500">Primary 5 Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Learnscape has helped me improve my Mathematics scores significantly. The personalized practice questions target exactly what I need help with."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Sarah Tan</h3>
                    <p className="text-sm text-gray-500">Parent</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a working parent, I appreciate how Learnscape gives my child access to quality educational resources. The progress tracking helps me stay involved in her learning."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-learnscape-blue to-learnscape-purple flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Raj Sharma</h3>
                    <p className="text-sm text-gray-500">Primary 6 Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The AI tutor is like having a personal teacher available 24/7. It explains concepts in a way that's easy to understand and helps me prepare for PSLE."
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
