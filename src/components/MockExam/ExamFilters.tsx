
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid, List } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface ExamFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedSchool: string;
  setSelectedSchool: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  resetFilters: () => void;
  schools: string[];
  years: string[];
  paperTypes: string[];
  viewMode: "table" | "cards";
  setViewMode: (mode: "table" | "cards") => void;
}

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
  resetFilters,
  schools,
  years,
  paperTypes,
  viewMode,
  setViewMode
}) => {
  const { t } = useI18n();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t.MOCK_EXAM.SEARCH_PLACEHOLDER}
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder={t.MOCK_EXAM.FILTER_SUBJECTS} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder={t.MOCK_EXAM.FILTER_LEVELS} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="p1">Primary 1</SelectItem>
                  <SelectItem value="p2">Primary 2</SelectItem>
                  <SelectItem value="p3">Primary 3</SelectItem>
                  <SelectItem value="p4">Primary 4</SelectItem>
                  <SelectItem value="p5">Primary 5</SelectItem>
                  <SelectItem value="p6">Primary 6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger>
                <SelectValue placeholder={t.MOCK_EXAM.FILTER_SCHOOLS} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Schools</SelectItem>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder={t.MOCK_EXAM.FILTER_YEARS} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder={t.MOCK_EXAM.FILTER_TYPES} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Types</SelectItem>
                  {paperTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={resetFilters}
            >
              {t.MOCK_EXAM.CLEAR_FILTERS}
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">视图:</span>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("cards")}
                className="w-8 h-8"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
                className="w-8 h-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamFilters;
