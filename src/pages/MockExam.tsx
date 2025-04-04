
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";

type ExamPaper = {
  id: string;
  title: string;
  school: string;
  year: string;
  type: string;
  subject: string;
  level: string;
  downloadCount: number;
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
    downloadCount: 245
  },
  {
    id: "2",
    title: "Mathematics Paper 2",
    school: "Nanyang Primary",
    year: "2023",
    type: "SA1",
    subject: "mathematics",
    level: "p6",
    downloadCount: 317
  },
  {
    id: "3",
    title: "Science Paper 1",
    school: "Raffles Primary",
    year: "2023",
    type: "SA2",
    subject: "science",
    level: "p6",
    downloadCount: 198
  },
  {
    id: "4",
    title: "Chinese Paper 1",
    school: "Tao Nan School",
    year: "2023",
    type: "SA1",
    subject: "chinese",
    level: "p5",
    downloadCount: 156
  },
  {
    id: "5",
    title: "Mathematics Paper 1",
    school: "Henry Park Primary",
    year: "2023",
    type: "SA2",
    subject: "mathematics",
    level: "p5",
    downloadCount: 267
  },
  {
    id: "6",
    title: "Science Paper 2",
    school: "Catholic High Primary",
    year: "2023",
    type: "SA1",
    subject: "science",
    level: "p5",
    downloadCount: 182
  }
];

const MockExam = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("p6");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const filteredPapers = mockExamPapers.filter(
    paper => 
      (selectedLevel === "all" || paper.level === selectedLevel) && 
      (selectedSubject === "all" || paper.subject === selectedSubject)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">Mock Exam Papers</h1>
          <p className="text-gray-600">
            Access a comprehensive collection of past year exam papers from top schools in Singapore.
            Practice with real exam questions to prepare for your primary school examinations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Primary Level</h3>
              <Tabs defaultValue="p6" onValueChange={setSelectedLevel}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="p6">Primary 6</TabsTrigger>
                  <TabsTrigger value="p5">Primary 5</TabsTrigger>
                  <TabsTrigger value="all">All Levels</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Subject</h3>
              <Tabs defaultValue="all" onValueChange={setSelectedSubject}>
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="mathematics">Math</TabsTrigger>
                  <TabsTrigger value="science">Science</TabsTrigger>
                  <TabsTrigger value="chinese">Chinese</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="border-gray-200 hover:shadow-md transition-shadow">
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
                <p className="text-gray-600 text-sm mb-4">{paper.school}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  <span>{paper.downloadCount} downloads</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Paper
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockExam;
