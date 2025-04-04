
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Download, FileText, Calendar } from "lucide-react";

type Worksheet = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: string;
  date: string;
  thumbnailUrl: string;
  downloadCount: number;
};

const worksheets: Worksheet[] = [
  {
    id: "4",
    title: "Chinese Characters Practice",
    subject: "chinese",
    grade: "p2",
    type: "characters",
    date: "2024-01-10",
    thumbnailUrl: "/placeholder.svg",
    downloadCount: 156
  },
  {
    id: "8",
    title: "Chinese Reading Comprehension",
    subject: "chinese",
    grade: "p4",
    type: "reading",
    date: "2024-03-05",
    thumbnailUrl: "/placeholder.svg",
    downloadCount: 142
  },
  {
    id: "12",
    title: "Chinese Composition Templates",
    subject: "chinese",
    grade: "p6",
    type: "composition",
    date: "2024-04-02",
    thumbnailUrl: "/placeholder.svg",
    downloadCount: 224
  }
];

const Worksheets = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("chinese");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredWorksheets = worksheets.filter(
    worksheet => 
      (selectedGrade === "all" || worksheet.grade === selectedGrade)
  );

  const totalPages = Math.ceil(filteredWorksheets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorksheets = filteredWorksheets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-SG', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Printable Worksheets</h1>
          <p className="text-gray-600">
            Access a comprehensive collection of printable worksheets for primary school students.
            Download and practice with our carefully crafted materials to enhance learning.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Primary Level</h3>
              <Tabs defaultValue="all" onValueChange={setSelectedGrade}>
                <TabsList className="grid grid-cols-7 w-full">
                  <TabsTrigger value="p1">P1</TabsTrigger>
                  <TabsTrigger value="p2">P2</TabsTrigger>
                  <TabsTrigger value="p3">P3</TabsTrigger>
                  <TabsTrigger value="p4">P4</TabsTrigger>
                  <TabsTrigger value="p5">P5</TabsTrigger>
                  <TabsTrigger value="p6">P6</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Subject</h3>
              <Tabs defaultValue="chinese" onValueChange={setSelectedSubject}>
                <TabsList className="grid grid-cols-1 w-full">
                  <TabsTrigger value="chinese">Chinese</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {currentWorksheets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No worksheets found for the selected filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedGrade("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentWorksheets.map((worksheet) => (
                <Card key={worksheet.id} className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
                        {worksheet.grade.toUpperCase()} {worksheet.subject.charAt(0).toUpperCase() + worksheet.subject.slice(1)}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(worksheet.date)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{worksheet.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">Type: {worksheet.type.charAt(0).toUpperCase() + worksheet.type.slice(1)}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      <span>{worksheet.downloadCount} downloads</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Worksheet
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }} />
                    </PaginationItem>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#" 
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Worksheets;
