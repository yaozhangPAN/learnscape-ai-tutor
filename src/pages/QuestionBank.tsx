
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BookOpen, FileText, ListCheck, Search } from "lucide-react";
import QuestionModule from "@/components/QuestionModule";

const QUESTIONS_PER_PAGE = 10;

const questionData = [
  { id: 1, title: "Grade 6 - Reading Comprehension - 1", type: "Reading", level: "Grade 6", date: "2025-03-01" },
  { id: 2, title: "Grade 6 - Grammar Practice - 1", type: "Grammar", level: "Grade 6", date: "2025-03-05" },
  { id: 3, title: "Grade 5 - Reading Comprehension - 1", type: "Reading", level: "Grade 5", date: "2025-03-08" },
  { id: 4, title: "Grade 6 - Essay Writing - 1", type: "Writing", level: "Grade 6", date: "2025-03-10" },
  { id: 5, title: "Grade 6 - Vocabulary Practice - 1", type: "Vocabulary", level: "Grade 6", date: "2025-03-12" },
  { id: 6, title: "Grade 5 - Listening Practice - 1", type: "Listening", level: "Grade 5", date: "2025-03-15" },
  { id: 7, title: "Grade 4 - Reading Comprehension - 1", type: "Reading", level: "Grade 4", date: "2025-03-18" },
  { id: 8, title: "Grade 6 - Comprehensive Test - 1", type: "Comprehensive", level: "Grade 6", date: "2025-03-20" },
  { id: 9, title: "Grade 5 - Grammar Practice - 1", type: "Grammar", level: "Grade 5", date: "2025-03-22" },
  { id: 10, title: "Grade 6 - Reading Comprehension - 2", type: "Reading", level: "Grade 6", date: "2025-03-25" },
  { id: 11, title: "Grade 4 - Vocabulary Practice - 1", type: "Vocabulary", level: "Grade 4", date: "2025-03-28" },
  { id: 12, title: "Grade 6 - Reading Comprehension - 3", type: "Reading", level: "Grade 6", date: "2025-04-01" },
];

const questionModules = [
  {
    title: "Reading Comprehension",
    description: "Improve students' reading comprehension and analytical skills",
    icon: <BookOpen className="h-6 w-6 text-white" />,
    count: 24,
    color: "bg-learnscape-blue text-white"
  },
  {
    title: "Grammar & Vocabulary",
    description: "Strengthen grammar knowledge and expand vocabulary",
    icon: <FileText className="h-6 w-6 text-white" />,
    count: 18,
    color: "bg-learnscape-purple text-white"
  },
  {
    title: "Comprehensive Practice",
    description: "Thoroughly test students' language application ability",
    icon: <ListCheck className="h-6 w-6 text-white" />,
    count: 12,
    color: "bg-green-500 text-white"
  }
];

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQuestions = questionData.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-learnscape-darkBlue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Question Bank</h1>
          <p className="text-lg max-w-3xl">
            Our carefully designed question bank covers all levels of Chinese language learning, 
            from basic vocabulary to advanced reading comprehension, helping students improve their 
            Chinese language skills comprehensively.
          </p>
        </div>
      </div>

      {/* Question Modules */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-8">Question Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questionModules.map((module, index) => (
            <QuestionModule
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              count={module.count}
              color={module.color}
            />
          ))}
        </div>
      </div>

      {/* Search and Question List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-6">Question List</h2>
          
          {/* Search */}
          <div className="relative flex items-center mb-6">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Questions Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{question.title}</TableCell>
                      <TableCell>{question.type}</TableCell>
                      <TableCell>{question.level}</TableCell>
                      <TableCell>{question.date}</TableCell>
                      <TableCell className="text-right">
                        <Button className="bg-learnscape-blue text-white">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
