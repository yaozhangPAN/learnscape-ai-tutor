
import { useState } from 'react';
import { useRequirePremium } from "@/hooks/useRequirePremium";
import Navbar from "@/components/Navbar";

const OralExamRedirect = () => {
  useRequirePremium();

  const [loading, setLoading] = useState(true);

  // Hide loading spinner after iframe loads
  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-learnscape-blue"></div>
          </div>
        )}
        <iframe 
          src="https://oral-test.fly.dev/" 
          className="w-full h-screen border-0"
          onLoad={handleIframeLoad}
          title="Oral Exam Practice"
        />
      </div>
    </div>
  );
};

export default OralExamRedirect;
