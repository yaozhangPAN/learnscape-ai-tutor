
import { useState, useEffect } from 'react';

const OralExamRedirect = () => {
  const [loading, setLoading] = useState(true);

  // Hide loading spinner after iframe loads
  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
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
  );
};

export default OralExamRedirect;
