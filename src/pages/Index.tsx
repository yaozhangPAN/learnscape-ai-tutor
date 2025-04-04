
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <div className="py-16 bg-learnscape-yellow/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-learnscape-darkBlue sm:text-4xl">
              Why Students Love Learnscape
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Join thousands of Singapore students already improving their learning outcomes.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
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
            
            <div className="bg-white p-8 rounded-lg shadow-md">
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
            
            <div className="bg-white p-8 rounded-lg shadow-md">
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
  );
};

export default Index;
