
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DictationPractice from "@/components/AITutor/DictationPractice";

const DictationPracticePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <DictationPractice />
      </main>
      <Footer />
    </div>
  );
};

export default DictationPracticePage;
