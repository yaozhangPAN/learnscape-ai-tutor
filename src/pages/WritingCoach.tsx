
import React from "react";
import { useRequirePremium } from "@/hooks/useRequirePremium";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import NewEssayForm from "@/components/WritingCoach/NewEssayForm";

// Rename the existing writing practice component
import WritingPractice from "@/components/WritingCoach/WritingPractice";

const WritingCoach = () => {
  useRequirePremium();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route index element={<NewEssayForm />} />
          <Route path="/practice" element={<WritingPractice />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
