
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BookOpen, FileText, ListCheck, Search, GraduationCap, Book, Calendar } from "lucide-react";
import QuestionModule from "@/components/QuestionModule";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyRecommendations from "@/components/AITutor/DailyRecommendations";

const QUESTIONS_PER_PAGE = 10;

const questionData = [
  { id: 1, title: "Grade 6 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 6", term: "CA1", date: "2025-03-01" },
  { id: 2, title: "Grade 6 - Grammar Practice - 1", subject: "English", type: "Grammar", level: "Primary 6", term: "CA1", date: "2025-03-05" },
  { id: 3, title: "Grade 5 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 5", term: "SA1", date: "2025-03-08" },
  { id: 4, title: "Grade 6 - Essay Writing - 1", subject: "English", type: "Writing", level: "Primary 6", term: "CA2", date: "2025-03-10" },
  { id: 5, title: "Grade 6 - Vocabulary Practice - 1", subject: "English", type: "Vocabulary", level: "Primary 6", term: "CA2", date: "2025-03-12" },
  { id: 6, title: "Grade 5 - Listening Practice - 1", subject: "English", type: "Listening", level: "Primary 5", term: "SA2", date: "2025-03-15" },
  { id: 7, title: "Grade 4 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 4", term: "CA1", date: "2025-03-18" },
  { id: 8, title: "Grade 6 - Comprehensive Test - 1", subject: "English", type: "Comprehensive", level: "Primary 6", term: "SA1", date: "2025-03-20" },
  { id: 9, title: "Grade 5 - Grammar Practice - 1", subject: "English", type: "Grammar", level: "Primary 5", term: "CA1", date: "2025-03-22" },
  { id: 10, title: "Grade 6 - Reading Comprehension - 2", subject: "English", type: "Reading", level: "Primary 6", term: "SA2", date: "2025-03-25" },
  { id: 11, title: "Grade 4 - Vocabulary Practice - 1", subject: "English", type: "Vocabulary", level: "Primary 4", term: "CA2", date: "2025-03-28" },
  { id: 12, title: "Grade 6 - Reading Comprehension - 3", subject: "English", type: "Reading", level: "Primary 6", term: "SA1", date: "2025-04-01" },
  { id: 13, title: "Grade 3 - Addition and Subtraction", subject: "Math", type: "Arithmetic", level: "Primary 3", term: "CA1", date: "2025-03-02" },
  { id: 14, title: "Grade 4 - Multiplication and Division", subject: "Math", type: "Arithmetic", level: "Primary 4", term: "SA1", date: "2025-03-06" },
  { id: 15, title: "Grade 5 - Fractions", subject: "Math", type: "Fractions", level: "Primary 5", term: "CA2", date: "2025-03-11" },
  { id: 16, title: "Grade 6 - Geometry", subject: "Math", type: "Geometry", level: "Primary 6", term: "SA2", date: "2025-03-16" },
  { id: 17, title: "Grade 2 - Basic Characters", subject: "Chinese", type: "Characters", level: "Primary 2", term: "CA1", date: "2025-03-03" },
  { id: 18, title: "Grade 3 - Reading Practice", subject: "Chinese", type: "Reading", level: "Primary 3", term: "SA1", date: "2025-03-09" },
  { id: 19, title: "Grade 4 - Composition", subject: "Chinese", type: "Writing", level: "Primary 4", term: "CA2", date: "2025-03-14" },
  { id: 20, title: "Grade 6 - Comprehensive Test", subject: "Chinese", type: "Comprehensive", level: "Primary 6", term: "SA2", date: "2025-03-19" },
  { id: 21, title: "Grade 3 - Plants and Animals", subject: "Science", type: "Biology", level: "Primary 3", term: "CA1", date: "2025-03-04" },
  { id: 22, title: "Grade 4 - Energy and Forces", subject: "Science", type: "Physics", level: "Primary 4", term: "SA1", date: "2025-03-13" },
  { id: 23, title: "Grade 5 - Materials and Matter", subject: "Science", type: "Chemistry", level: "Primary 5", term: "CA2", date: "2025-03-17" },
  { id: 24, title: "Grade 6 - Earth and Space", subject: "Science", type: "Earth Science", level: "Primary 6", term: "SA2", date: "2025-03-21" }
];

const questionModules = [
  {
    title: "English Language",
    description: "Improve students' reading comprehension and analytical skills",
    icon: <BookOpen className="h-6 w-6 text-white" />,
    count: questionData.filter(q => q.subject === "English").length,
    color: "bg-learnscape-blue text-white"
  },
  {
    title: "Mathematics",
    description: "Strengthen numerical reasoning and problem-solving abilities",
    icon: <FileText className="h-6 w-6 text-white" />,
    count: questionData.filter(q => q.subject === "Math").length,
    color: "bg-learnscape-purple text-white"
  },
  {
    title: "Chinese Language",
    description: "Develop language proficiency and cultural understanding",
    icon: <Book className="h-6 w-6 text-white" />,
    count: questionData.filter(q => q.subject === "Chinese").length,
    color: "bg-orange-500 text-white"
  },
  {
    title: "Science",
    description: "Foster scientific inquiry and critical thinking",
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    count: questionData.filter(q => q.subject === "Science").length,
    color: "bg-green-500 text-white"
  },
  {
    title: "Daily Recommendations",
    description: "Personalized study recommendations based on your progress",
    icon: <Calendar className="h-6 w-6 text-white" />,
    count: 5,
    color: "bg-amber-500 text-white"
  }
];

const grades = ["All Grades", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"];
const subjects = ["All Subjects", "English", "Math", "Chinese", "Science"];
const terms = ["All Terms", "CA1", "SA1", "CA2", "SA2"];

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [activeTab, setActiveTab] = useState("question-list");

  // Apply all filters
  const filteredQuestions = questionData.filter(question => {
    // Search term filter
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Grade filter
    const matchesGrade = selectedGrade === "All Grades" || question.level === selectedGrade;
    
    // Subject filter
    const matchesSubject = selectedSubject === "All Subjects" || question.subject === selectedSubject;
    
    // Term filter
    const matchesTerm = selectedTerm === "All Terms" || question.term === selectedTerm;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesTerm;
  });

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-learnscape-darkBlue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Question Bank</h1>
          <p className="text-lg max-w-3xl">
            Our comprehensive question bank covers English, Math, Chinese, and Science for Primary 1 to Primary 6 students.
            Practice with questions designed for different assessment periods: CA1, SA1, CA2, and SA2.
          </p>
        </div>
      </div>

      {/* Question Modules */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-8">Subject Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {questionModules.map((module, index) => (
            <QuestionModule
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              count={module.count}
              color={module.color}
              onClick={() => {
                if (module.title === "Daily Recommendations") {
                  setActiveTab("daily-recommendations");
                } else {
                  setActiveTab("question-list");
                  if (module.title !== "Daily Recommendations") {
                    setSelectedSubject(module.title.replace(" Language", ""));
                    handleFilterChange();
                  }
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Tabs for Question List and Daily Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="question-list" className="text-base">
              <Search className="h-4 w-4 mr-2" />
              Question List
            </TabsTrigger>
            <TabsTrigger value="daily-recommendations" className="text-base">
              <Calendar className="h-4 w-4 mr-2" />
              Daily Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="question-list">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-6">Question List</h2>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Search */}
                <div className="relative flex items-center col-span-1 md:col-span-4">
                  <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    className="pl-10 pr-4"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleFilterChange();
                    }}
                  />
                </div>
                
                {/* Subject Filter */}
                <div>
                  <Select 
                    value={selectedSubject} 
                    onValueChange={(value) => {
                      setSelectedSubject(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Grade Filter */}
                <div>
                  <Select 
                    value={selectedGrade} 
                    onValueChange={(value) => {
                      setSelectedGrade(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Term Filter */}
                <div>
                  <Select 
                    value={selectedTerm} 
                    onValueChange={(value) => {
                      setSelectedTerm(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Term" />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map((term) => (
                        <SelectItem key={term} value={term}>
                          {term}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Clear Filters Button */}
                <div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedSubject("All Subjects");
                      setSelectedGrade("All Grades");
                      setSelectedTerm("All Terms");
                      setSearchTerm("");
                      handleFilterChange();
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Questions Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentQuestions.length > 0 ? (
                        currentQuestions.map((question) => (
                          <TableRow key={question.id}>
                            <TableCell className="font-medium">{question.title}</TableCell>
                            <TableCell>{question.subject}</TableCell>
                            <TableCell>{question.level}</TableCell>
                            <TableCell>{question.term}</TableCell>
                            <TableCell>{question.date}</TableCell>
                            <TableCell className="text-right">
                              <Button className="bg-learnscape-blue text-white">View</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No questions match your search criteria. Try adjusting your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Results count */}
              <div className="mt-4 text-sm text-gray-500">
                Showing {currentQuestions.length > 0 ? (currentPage - 1) * QUESTIONS_PER_PAGE + 1 : 0} to {Math.min(currentPage * QUESTIONS_PER_PAGE, filteredQuestions.length)} of {filteredQuestions.length} questions
              </div>

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
          </TabsContent>
          
          <TabsContent value="daily-recommendations">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <DailyRecommendations />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuestionBank;
