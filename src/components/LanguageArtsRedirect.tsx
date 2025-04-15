
import { useEffect } from 'react';

const LanguageArtsRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://game-art.fly.dev/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-learnscape-blue"></div>
    </div>
  );
};

export default LanguageArtsRedirect;
