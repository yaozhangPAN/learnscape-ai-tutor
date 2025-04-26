
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseFiltersProps {
  onLevelChange: (level: string) => void;
  onSubjectChange?: (subject: string) => void;
  onTypeChange: (type: string) => void;
  hiddenFilters?: string[];
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  onLevelChange,
  onSubjectChange,
  onTypeChange,
  hiddenFilters = []
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Primary Level</h3>
          <Tabs defaultValue="p6" onValueChange={onLevelChange}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="p6">Primary 6</TabsTrigger>
              <TabsTrigger value="p5">Primary 5</TabsTrigger>
              <TabsTrigger value="all">All Levels</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {!hiddenFilters.includes('subject') && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Subject</h3>
            <Tabs defaultValue="all" onValueChange={onSubjectChange || (() => {})}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="mathematics">Math</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
                <TabsTrigger value="chinese">Chinese</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        
        {!hiddenFilters.includes('type') && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Content Type</h3>
            <Tabs defaultValue="all" onValueChange={onTypeChange}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="past_paper">Past Papers</TabsTrigger>
                <TabsTrigger value="all">All Types</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};
