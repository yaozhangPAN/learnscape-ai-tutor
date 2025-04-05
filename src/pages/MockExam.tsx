
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Download, 
  FileText, 
  Calendar, 
  Search, 
  School, 
  BookOpen, 
  Star, 
  Filter,
  ChevronDown,
  PlayCircle
} from "lucide-react";

type ExamPaper = {
  id: string;
  title: string;
  school: string;
  year: string;
  type: string;
  subject: string;
  level: string;
  downloadCount: number;
  isTopSchool?: boolean;
  isOnlineAvailable?: boolean;
};

const mockExamPapers: ExamPaper[] = [
  {
    id: "1",
    title: "English Paper 1",
    school: "Rosyth School",
    year: "2023",
    type: "SA2",
    subject: "english",
    level: "p6",
    downloadCount: 245,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "2",
    title: "Mathematics Paper 2",
    school: "Nanyang Primary",
    year: "2023",
    type: "SA1",
    subject: "mathematics",
    level: "p6",
    downloadCount: 317,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "3",
    title: "Science Paper 1",
    school: "Raffles Primary",
    year: "2023",
    type: "SA2",
    subject: "science",
    level: "p6",
    downloadCount: 198,
    isTopSchool: true,
    isOnlineAvailable: true
  },
  {
    id: "4",
    title: "Chinese Paper 1",
    school: "Tao Nan School",
    year: "2023",
    type: "SA1",
    subject: "chinese",
    level: "p5",
    downloadCount: 156,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "5",
    title: "Mathematics Paper 1",
    school: "Henry Park Primary",
    year: "2023",
    type: "SA2",
    subject: "mathematics",
    level: "p5",
    downloadCount: 267,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "6",
    title: "Science Paper 2",
    school: "Catholic High Primary",
    year: "2023",
    type: "SA1",
    subject: "science",
    level: "p5",
    downloadCount: 182,
    isTopSchool: true,
    isOnlineAvailable: false
  },
  {
    id: "7",
    title: "English Comprehension",
    school: "Methodist Girls' School",
    year: "2023",
    type: "SA2",
    subject: "english",
    level: "p6",
    downloadCount: 203,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "8",
    title: "Mathematics Problem Solving",
    school: "Anglo-Chinese School",
    year: "2022",
    type: "SA2",
    subject: "mathematics",
    level: "p6",
    downloadCount: 289,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "9",
    title: "Science Practical",
    school: "Maha Bodhi School",
    year: "2022",
    type: "SA1",
    subject: "science",
    level: "p5",
    downloadCount: 178,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "10",
    title: "English Grammar",
    school: "CHIJ Primary",
    year: "2022",
    type: "SA2",
    subject: "english",
    level: "p5",
    downloadCount: 165,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "11",
    title: "Mathematics Fractions",
    school: "St. Nicholas Girls' School",
    year: "2022",
    type: "SA1",
    subject: "mathematics",
    level: "p5",
    downloadCount: 192,
    isTopSchool: false,
    isOnlineAvailable: false
  },
  {
    id: "12",
    title: "Science Energy",
    school: "Pei Hwa Presbyterian",
    year: "2022",
    type: "SA2",
    subject: "science",
    level: "p6",
    downloadCount: 213,
    isTopSchool: false,
    isOnlineAvailable: false
  }
];

const schools = Array.from(new Set(mockExamPapers.map(paper => paper.school))).sort();
const years = Array.from(new Set(mockExamPapers.map(paper => paper.year))).sort((a, b) => b.localeCompare(a));
const paperTypes = Array.from(new Set(mockExamPapers.map(paper => paper.type))).sort();

const MockExam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<string>(searchParams.get("mode") || "PAPER_MOCK");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get("grade") || "all");
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get("subject") || "all");
  const [selectedSchool, setSelectedSchool] = useState<string>(searchParams.get("schoolId") || "all");
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get("paperYear") || "all");
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("paperType") || "all");
  const [topSchoolsOnly, setTopSchoolsOnly] = useState<boolean>(searchParams.get("topSchools") === "true");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const itemsPerPage = viewMode === "PAPER_MOCK" ? 10 : 20;

  const filteredPapers = mockExamPapers.filter(paper => {
    const matchesLevel = selectedLevel === "all" || paper.level === selectedLevel;
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject;
    const matchesSchool = selectedSchool === "all" || paper.school === selectedSchool;
    const matchesYear = selectedYear === "all" || paper.year === selectedYear;
    const matchesType = selectedType === "all" || paper.type === selectedType;
    const matchesTopSchool = !topSchoolsOnly || paper.isTopSchool;
    const matchesSearch = searchQuery === "" || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      paper.school.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLevel && matchesSubject && matchesSchool && matchesYear && 
           matchesType && matchesTopSchool && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPapers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const params: Record<string, string> = {
      mode: viewMode,
      grade: selectedLevel !== "all" ? selectedLevel : "",
      subject: selectedSubject !== "all" ? selectedSubject : "",
      schoolId: selectedSchool !== "all" ? selectedSchool : "",
      paperYear: selectedYear !== "all" ? selectedYear : "",
      paperType: selectedType !== "all" ? selectedType : "",
      page: currentPage.toString()
    };
    
    if (topSchoolsOnly) {
      params.topSchools = "true";
    }
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key];
      }
    });
    
    setSearchParams(params);
  }, [
    viewMode, selectedLevel, selectedSubject, selectedSchool, 
    selectedYear, selectedType, topSchoolsOnly, currentPage, searchQuery
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedLevel, selectedSubject, selectedSchool, 
    selectedYear, selectedType, topSchoolsOnly, searchQuery
  ]);

  const resetFilters = () => {
    setSelectedLevel("all");
    setSelectedSubject("all");
    setSelectedSchool("all");
    setSelectedYear("all");
    setSelectedType("all");
    setTopSchoolsOnly(false);
    setSearchQuery("");
  };

  const handleTakeExam = (examId: string) => {
    navigate(`/take-exam/${examId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Past Year Exam Papers</h1>
          <p className="text-gray-600">
            Access a comprehensive collection of past year exam papers from top schools in Singapore.
            Practice with real exam questions to prepare for your primary school examinations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search by exam title or school..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={resetFilters}
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="p6">Primary 6</SelectItem>
                  <SelectItem value="p5">Primary 5</SelectItem>
                  <SelectItem value="p4">Primary 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paper Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {paperTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant={topSchoolsOnly ? "default" : "outline"} 
                className="w-full"
                onClick={() => setTopSchoolsOnly(!topSchoolsOnly)}
              >
                <Star className={`h-4 w-4 mr-2 ${topSchoolsOnly ? "fill-yellow-400" : ""}`} />
                Top Schools Only
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-learnscape-darkBlue">
                Exam Papers
                <span className="ml-2 text-sm font-normal text-gray-500">({filteredPapers.length} results)</span>
              </h2>
            </div>
          </div>

          {filteredPapers.length > 0 ? (
            <div>
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paper Name</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Downloads</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {paper.isTopSchool && <Star className="h-3 w-3 fill-yellow-400 mr-1" />}
                            {paper.school}
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{paper.subject}</TableCell>
                        <TableCell className="uppercase">{paper.level}</TableCell>
                        <TableCell>{paper.year}</TableCell>
                        <TableCell>{paper.type}</TableCell>
                        <TableCell className="text-right">{paper.downloadCount}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          {paper.isOnlineAvailable && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                              onClick={() => handleTakeExam(paper.id)}
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Take Online
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden">
                {currentItems.map((paper) => (
                  <Card key={paper.id} className="mb-4 border-gray-200 mx-4 my-4">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
                          {paper.level.toUpperCase()} {paper.type}
                        </div>
                        <div className="text-gray-500 text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {paper.year}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{paper.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex items-center">
                        {paper.isTopSchool && <Star className="h-3 w-3 fill-yellow-400 mr-1" />}
                        {paper.school}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>{paper.downloadCount} downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {paper.isOnlineAvailable && (
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700" 
                          onClick={() => handleTakeExam(paper.id)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Take Online
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          return page === 1 || 
                                 page === totalPages || 
                                 (page >= currentPage - 1 && page <= currentPage + 1);
                        })
                        .map((page, index, array) => {
                          const shouldShowEllipsisAfter = index < array.length - 1 && array[index + 1] - page > 1;
                          
                          return (
                            <React.Fragment key={page}>
                              <PaginationItem>
                                <PaginationLink 
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                              
                              {shouldShowEllipsisAfter && (
                                <PaginationItem>
                                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                                </PaginationItem>
                              )}
                            </React.Fragment>
                          );
                        })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Papers Found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any papers matching your filters. Try adjusting your search criteria.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockExam;
