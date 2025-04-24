
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ZoomCourses = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 relative">
        <h1>Zoom Courses</h1>
      </div>
      <Footer />
    </div>
  );
};

export default ZoomCourses;
