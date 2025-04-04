
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";

interface ExamTimerProps {
  initialTime: number; // in seconds
  onTimeExpired: () => void;
}

const ExamTimer = ({ initialTime, onTimeExpired }: ExamTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeExpired();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, onTimeExpired]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getColorClass = () => {
    const percentRemaining = (timeRemaining / initialTime) * 100;
    if (percentRemaining > 50) return "text-green-600";
    if (percentRemaining > 25) return "text-amber-500";
    return "text-red-600";
  };
  
  return (
    <Card className="flex items-center px-4 py-2 gap-2">
      {timeRemaining <= 300 ? (
        <AlertCircle className={`h-5 w-5 ${getColorClass()}`} />
      ) : (
        <Clock className={`h-5 w-5 ${getColorClass()}`} />
      )}
      <span className={`font-mono text-lg font-semibold ${getColorClass()}`}>
        {formatTime(timeRemaining)}
      </span>
    </Card>
  );
};

export default ExamTimer;
