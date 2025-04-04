
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-learnscape-darkBlue">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white">
              Learnscape
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              AI-powered learning for Singapore primary school students.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Mock Exams
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Worksheets
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Video Tutorials
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-300 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Learnscape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
