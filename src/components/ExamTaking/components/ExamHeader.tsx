
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { ExamTimer } from "../ExamTimer";
import { ExamPaper } from "../types";

interface ExamHeaderProps {
  exam: ExamPaper;
  onTimeExpired: () => void;
}

const ExamHeader = ({ exam, onTimeExpired }: ExamHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{exam?.title}</h1>
      <ExamTimer 
        initialTime={exam?.durationMinutes * 60} 
        onTimeExpired={onTimeExpired}
      />
    </div>
  );
};

export default ExamHeader;
