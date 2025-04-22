import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LogOut, Home, CalendarDays, Video } from "lucide-react";
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
    { path: "/", name: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { path: "/daily-plan", name: "Daily Plan", icon: <CalendarDays className="mr-2 h-4 w-4" /> },
    { path: "/zoom-courses", name: "Zoom Courses", icon: <Video className="mr-2 h-4 w-4" /> },
    { path: "/ai-tutor", name: "AI Tutor", icon: <span className="ml-1 text-xs">✨</span> },
    { path: "/video-tutorials", name: "Video Lessons" },
    { path: "/question-bank", name: "Question Bank" },
    { path: "/mock-exam", name: "Mock Exam" },
    { path: "/leaderboard", name: "Leaderboard" },
    { path: "/dashboard", name: "Streak and Analyze" },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`bg-learnscape-darkBlue sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-extrabold text-white flex items-center relative">
                Learnscape
                <Sparkles className="ml-1 h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-white hover:text-yellow-300 transition-colors py-1 group relative font-bold ${
                  location.pathname === link.path ? 'text-yellow-300 font-bold' : ''
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300"></span>
                )}
                {link.icon && (
                  <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                )}
              </Link>
            ))}
            {user ? (
              <Button 
                variant="default"
                size="sm"
                onClick={handleLogout}
                className="bg-[#4CAF50] text-white hover:bg-[#16A085] transition-colors"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-[#4CAF50] text-white hover:bg-[#16A085] transition-colors"
              >
                <Link to="/login">
                  <span className="relative z-10">Login</span>
                </Link>
              </Button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-learnscape-darkBlue">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`block px-3 py-2 rounded-md text-base font-bold ${
                  location.pathname === link.path 
                    ? 'text-yellow-300 bg-white/10' 
                    : 'text-white hover:text-yellow-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                {link.path === "/ai-tutor" && <span className="ml-1 text-xs">✨</span>}
              </Link>
            ))}
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-[#4CAF50] hover:bg-[#16A085] mt-4"
              >
                <span className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#4CAF50] text-white hover:bg-[#16A085] mt-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
