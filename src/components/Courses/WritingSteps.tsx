
import React from 'react';
import { cn } from "@/lib/utils";
import { Circle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WritingStep {
  id: string;
  title: string;
  status: 'current' | 'completed' | 'upcoming';
}

const steps: WritingStep[] = [
  { id: 'understanding', title: 'Understanding', status: 'current' },
  { id: 'outlining', title: 'Outlining', status: 'upcoming' },
  { id: 'drafting', title: 'Drafting', status: 'upcoming' },
  { id: 'revising', title: 'Revising', status: 'upcoming' },
];

export const WritingSteps: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="p-2">
            ← My Essays
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex items-center",
                    step.status === 'current' && "text-blue-500",
                    step.status === 'completed' && "text-green-500",
                    step.status === 'upcoming' && "text-gray-300"
                  )}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium",
                      step.status === 'current' && "text-blue-500",
                      step.status === 'completed' && "text-green-500",
                      step.status === 'upcoming' && "text-gray-400"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-0.5 mx-2",
                      step.status === 'completed' ? "bg-green-500" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          Next: Start Outlining
        </Button>
      </div>
    </div>
  );
};
