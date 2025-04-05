
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/question-bank", name: "Question Bank" },
    { path: "/video-tutorials", name: "Video Lessons" },
    { path: "/mock-exam", name: "Mock Exam" },
    { path: "/leaderboard", name: "Leaderboard" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/ai-tutor", name: "AI Tutor" },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`bg-learnscape-orange sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-extrabold text-white flex items-center relative">
                ONLINE LEARNING
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-white hover:text-learnscape-yellow transition-colors py-1 group relative font-semibold ${
                  location.pathname === link.path ? 'text-learnscape-yellow font-bold' : ''
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                )}
              </Link>
            ))}
            {user ? (
              <Button 
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center bg-white text-learnscape-orange hover:bg-learnscape-yellow hover:text-learnscape-orange rounded-full"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-white text-learnscape-orange hover:bg-learnscape-yellow hover:text-learnscape-orange font-bold rounded-full"
              >
                <Link to="/login">
                  <span>Log In</span>
                </Link>
              </Button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-learnscape-yellow focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-learnscape-orange">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-learnscape-yellow"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path 
                    ? 'text-learnscape-yellow' 
                    : 'text-white hover:text-learnscape-yellow'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-full text-base font-medium text-learnscape-orange bg-white hover:bg-learnscape-yellow mt-4"
              >
                <span className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-full text-base font-medium bg-white text-learnscape-orange hover:bg-learnscape-yellow mt-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
