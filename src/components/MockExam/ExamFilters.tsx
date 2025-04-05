
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, Star } from "lucide-react";

type ExamFiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedSchool: string;
  setSelectedSchool: (school: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  topSchoolsOnly: boolean;
  setTopSchoolsOnly: (value: boolean) => void;
  resetFilters: () => void;
  schools: string[];
  years: string[];
  paperTypes: string[];
};

const ExamFilters: React.FC<ExamFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  selectedSubject,
  setSelectedSubject,
  selectedSchool,
  setSelectedSchool,
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
  topSchoolsOnly,
  setTopSchoolsOnly,
  resetFilters,
  schools,
  years,
  paperTypes,
}) => {
  return (
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
  );
};

export default ExamFilters;
