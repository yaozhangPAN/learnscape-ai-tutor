
import { useRequirePremium } from "@/hooks/useRequirePremium";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WritingCoach = () => {
  useRequirePremium();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to AI Tutor
            </Link>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue">Writing Coach</h1>
            <p className="text-gray-600 mt-1">Improve your writing skills with personalized feedback and guidance.</p>
          </div>
          
          <div className="text-center text-gray-500 py-12">
            Writing Coach features coming soon...
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
