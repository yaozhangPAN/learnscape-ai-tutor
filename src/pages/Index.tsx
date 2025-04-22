
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        
        {/* Learning Features Section with Cartoon Characters */}
        <div className="py-16 bg-[#FEF7CD] relative overflow-hidden">
          {/* Decorative stars */}
          <div className="absolute top-10 left-[10%] text-white text-2xl">✦</div>
          <div className="absolute top-20 right-[15%] text-white text-xl">✦</div>
          <div className="absolute bottom-10 left-[20%] text-white text-xl">✦</div>
          <div className="absolute bottom-40 right-[10%] text-white text-xl">✦</div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#5E2D00] sm:text-4xl">
                Fun Learning Features
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore our interactive learning tools designed for Singapore students
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                <img 
                  src="/public/lovable-uploads/415ba260-aeec-4f17-ae4e-b005b78136d5.png" 
                  alt="Wise Bear Character" 
                  className="absolute -top-12 -right-8 w-24 h-auto"
                />
                <h3 className="text-xl font-bold text-[#5E2D00] mt-2">Video Lessons</h3>
                <p className="mt-2 text-gray-600">
                  Learn from expert teachers with our comprehensive video tutorials covering all PSLE subjects.
                </p>
                <Link to="/courses" className="mt-4 inline-flex items-center text-[#4ABA79] hover:text-[#3A9A69]">
                  Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                <img 
                  src="/public/lovable-uploads/2ac414cd-b34a-4efa-bf70-b16c471a377f.png" 
                  alt="Red Panda Wizard" 
                  className="absolute -top-12 -right-8 w-24 h-auto"
                />
                <h3 className="text-xl font-bold text-[#5E2D00] mt-2">AI Tutor</h3>
                <p className="mt-2 text-gray-600">
                  Get personalized help with writing, speaking, and vocabulary from our friendly AI tutor.
                </p>
                <Link to="/ai-tutor" className="mt-4 inline-flex items-center text-[#4ABA79] hover:text-[#3A9A69]">
                  Meet Your Tutor <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                <img 
                  src="/public/lovable-uploads/72f82c67-0df8-4350-814c-79ce2d5faa3f.png" 
                  alt="Explorer Bunny" 
                  className="absolute -top-12 -right-8 w-24 h-auto"
                />
                <h3 className="text-xl font-bold text-[#5E2D00] mt-2">Question Bank</h3>
                <p className="mt-2 text-gray-600">
                  Practice with thousands of exam-style questions and get instant feedback to improve your skills.
                </p>
                <Link to="/question-bank" className="mt-4 inline-flex items-center text-[#4ABA79] hover:text-[#3A9A69]">
                  Start Practicing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Daily Goal Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[#5E2D00] sm:text-4xl">
                  Daily Learning Adventures
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Follow your personalized daily plan to make consistent progress. Complete activities, earn XP, and track your learning journey.
                </p>
                <div className="mt-8">
                  <Link to="/daily-plan">
                    <button className="bg-[#4ABA79] hover:bg-[#3A9A69] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                      Start Today's Adventure <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 relative">
                <div className="bg-[#FEF7CD] rounded-2xl p-6 shadow-md relative overflow-hidden">
                  <img 
                    src="/public/lovable-uploads/31625b2a-8819-4cc9-838a-c9ab2a1e1da4.png" 
                    alt="Learning Progress" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute bottom-6 right-6 bg-[#F44336] text-white rounded-full p-3 text-lg font-bold animate-pulse">
                    50 XP
                  </div>
                </div>
                <img 
                  src="/public/lovable-uploads/415ba260-aeec-4f17-ae4e-b005b78136d5.png" 
                  alt="Wise Bear Character" 
                  className="absolute -bottom-10 -left-10 w-32 h-auto transform -rotate-12"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="py-16 bg-[#F2FCE2] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-[10%] w-12 h-12 rounded-full bg-[#FEF7CD] animate-bounce-slow"></div>
          <div className="absolute top-20 right-[15%] w-8 h-8 rounded-full bg-[#FEF7CD] animate-float"></div>
          <div className="absolute bottom-10 left-[20%] w-10 h-10 rounded-full bg-[#FEF7CD] animate-spin-slow"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#5E2D00] sm:text-4xl relative inline-block">
                Why Students Love Learnscape
                <span className="absolute -top-6 -right-8 text-2xl animate-wiggle">✨</span>
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Join thousands of Singapore students already improving their learning outcomes.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#4ABA79] to-[#38A169] flex items-center justify-center text-white font-bold text-xl">
                    L
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#5E2D00]">Lim Wei Ling</h3>
                    <p className="text-sm text-gray-500">Primary 5 Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Learnscape has helped me improve my Mathematics scores significantly. The personalized practice questions target exactly what I need help with."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#4ABA79] to-[#38A169] flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#5E2D00]">Sarah Tan</h3>
                    <p className="text-sm text-gray-500">Parent</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a working parent, I appreciate how Learnscape gives my child access to quality educational resources. The progress tracking helps me stay involved in her learning."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#4ABA79] to-[#38A169] flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#5E2D00]">Raj Sharma</h3>
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
