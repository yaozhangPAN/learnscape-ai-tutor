
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-learnscape-yellow">
      <Navbar />
      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} flex-grow`}>
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
