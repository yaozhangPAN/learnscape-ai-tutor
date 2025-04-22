
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-learnscape-darkBlue py-4">
      <div className="container mx-auto text-center">
        <Link to="/" className="text-xl font-bold text-white">
          Learnscape
        </Link>
        <p className="mt-2 text-sm text-gray-300">
          © {new Date().getFullYear()} Learnscape
        </p>
      </div>
    </footer>
  );
};

export default Footer;
