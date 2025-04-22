
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Download, FileText, PlayCircle, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ExamPaper } from "@/types/exam";

type ExamCardsProps = {
  papers: ExamPaper[];
  handleTakeExam: (examId: string) => void;
};

const ExamCards: React.FC<ExamCardsProps> = ({ papers, handleTakeExam }) => {
  const handleDownload = async (paper: ExamPaper) => {
    try {
      // This is just a simulation. In production, you would fetch the actual file URL from your backend
      const pdfUrl = `https://api.yourbackend.com/exams/${paper.id}/download`;
      
      // For demo, we'll create a sample PDF content
      const response = await fetch(pdfUrl).catch(() => {
        // Fallback for demo: create a text file with exam details
        const content = `
          Paper: ${paper.title}
          School: ${paper.school}
          Year: ${paper.year}
          Type: ${paper.type}
          Subject: ${paper.subject}
          Level: ${paper.level}
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        return new Response(blob);
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${paper.title}_${paper.school}_${paper.year}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Starting download",
        description: `Downloading ${paper.title}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the exam paper.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="md:hidden">
      {papers.map((paper) => (
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
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleDownload(paper)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700" 
              onClick={() => handleTakeExam(paper.id)}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Take Online
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ExamCards;
