
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold gradient-text">Learnscape</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-learnscape-blue transition-colors">
              Home
            </Link>
            <Link to="/mock-exam" className="text-gray-700 hover:text-learnscape-blue transition-colors">
              Mock Exam
            </Link>
            <Link to="#features" className="text-gray-700 hover:text-learnscape-blue transition-colors">
              Features
            </Link>
            <Link to="#about" className="text-gray-700 hover:text-learnscape-blue transition-colors">
              About Us
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-learnscape-blue transition-colors">
              Dashboard
            </Link>
            <Button 
              asChild
              className="bg-learnscape-blue hover:bg-blue-700"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-learnscape-blue focus:outline-none"
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
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-learnscape-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/mock-exam" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-learnscape-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Mock Exam
            </Link>
            <Link 
              to="#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-learnscape-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-learnscape-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-learnscape-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-learnscape-blue text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
