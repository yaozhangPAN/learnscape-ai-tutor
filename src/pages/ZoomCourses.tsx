
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaskOverlay from "@/components/MaskOverlay";

const ZoomCourses = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 relative">
        <MaskOverlay />
      </div>
      <Footer />
    </div>
  );
};

export default ZoomCourses;
