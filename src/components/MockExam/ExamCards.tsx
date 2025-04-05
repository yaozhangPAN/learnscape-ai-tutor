
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Download, FileText, PlayCircle, Star } from "lucide-react";
import { ExamPaper } from "@/types/exam";

type ExamCardsProps = {
  papers: ExamPaper[];
  handleTakeExam: (examId: string) => void;
};

const ExamCards: React.FC<ExamCardsProps> = ({ papers, handleTakeExam }) => {
  return (
    <div className="md:hidden">
      {papers.map((paper) => (
        <Card key={paper.id} className="mb-4 border-2 border-green-200 mx-4 my-4">
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
            <Button variant="outline" className="flex-1 border-2">
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

