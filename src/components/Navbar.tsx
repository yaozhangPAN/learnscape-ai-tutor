
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
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
    { path: "/dashboard", name: "Streak" },
    { path: "/ai-tutor", name: "AI Tutor" },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-extrabold text-[#03353E] flex items-center relative">
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
                className={`text-[#03353E] hover:text-[#4ABA79] transition-colors py-1 group relative ${
                  location.pathname === link.path ? 'text-[#4ABA79] font-medium' : ''
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4ABA79]"></span>
                )}
                <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.path === "/ai-tutor" && <span className="text-xs">✨</span>}
                </span>
              </Link>
            ))}
            {user ? (
              <Button 
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center border-[#03353E] text-[#03353E]"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-[#4ABA79] hover:bg-[#4ABA79]/90 text-[#03353E] border border-[#03353E] group relative overflow-hidden rounded-full"
              >
                <Link to="/login">
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#03353E] hover:text-[#4ABA79] focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-[#03353E] hover:text-[#4ABA79]"
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
                    ? 'text-[#4ABA79] bg-green-50' 
                    : 'text-[#03353E] hover:text-[#4ABA79]'
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
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 mt-4"
              >
                <span className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#4ABA79] text-[#03353E] hover:bg-[#4ABA79]/90 mt-4 text-center border border-[#03353E]"
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
