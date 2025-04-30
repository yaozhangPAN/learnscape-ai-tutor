
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface WritingHeaderProps {
  title?: string;
}

const WritingHeader: React.FC<WritingHeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/ai-tutor/writing-coach" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Link>
        <h1 className="text-xl font-semibold text-gray-800">
          {title || "写作练习"}
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>
    </header>
  );
};

export default WritingHeader;
