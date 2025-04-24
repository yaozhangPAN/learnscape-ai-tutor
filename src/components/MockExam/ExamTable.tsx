
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, PlayCircle, Star } from "lucide-react";
import { ExamPaper } from "@/types/exam";

type ExamTableProps = {
  papers: ExamPaper[];
  handleTakeExam: (examId: string) => void;
};

const ExamTable: React.FC<ExamTableProps> = ({ papers, handleTakeExam }) => {
  const handleDownload = (paperId: string) => {
    // Using the exact format from the provided URL
    const downloadUrl = `https://xfwnjocfdvuocvwjopke.supabase.co/storage/v1/object/public/exam-papers/${paperId}.pdf`;
    window.open(downloadUrl, '_blank');
  };

  return (
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
          {papers.map((paper) => (
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
                <Button 
                  size="sm"
                  onClick={() => handleDownload(paper.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  onClick={() => handleTakeExam(paper.id)}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Take Online
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamTable;
