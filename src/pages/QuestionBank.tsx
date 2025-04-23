import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { QuestionViewer } from "@/components/QuestionBank/QuestionViewer";

const QuestionBank = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    // Fetch questions from an API or use local mock data
    const mockQuestions = [
      { id: 1, title: "Question 1", subject: "Math" },
      { id: 2, title: "Question 2", subject: "Science" },
      { id: 3, title: "Question 3", subject: "English" },
      { id: 4, title: "Question 4", subject: "Math" },
      { id: 5, title: "Question 5", subject: "Science" },
      { id: 6, title: "Question 6", subject: "English" },
      { id: 7, title: "Question 7", subject: "Math" },
      { id: 8, title: "Question 8", subject: "Science" },
      { id: 9, title: "Question 9", subject: "English" },
      { id: 10, title: "Question 10", subject: "Math" },
      { id: 11, title: "Question 11", subject: "Science" },
      { id: 12, title: "Question 12", subject: "English" },
      { id: 13, title: "Question 13", subject: "Math" },
      { id: 14, title: "Question 14", subject: "Science" },
      { id: 15, title: "Question 15", subject: "English" },
    ];

    setQuestions(mockQuestions);
  }, []);

  const filteredQuestions = questions.filter((question) => {
    const searchMatch = question.title.toLowerCase().includes(searchQuery.toLowerCase());
    const subjectMatch = selectedSubject === "all" || question.subject === selectedSubject;
    return searchMatch && subjectMatch;
  });

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(1); // Reset to the first page when the subject changes
  };

  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{ 
        background: `linear-gradient(135deg, #F0E4B0 0%, #AED581 100%)`,
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Question Bank</h1>

        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mr-2"
          />
          <Select onValueChange={handleSubjectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paginatedQuestions.map((question) => (
          <QuestionViewer key={question.id} question={question} />
        ))}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionBank;
