import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExamFilters from "@/components/MockExam/ExamFilters";
import ExamTable from "@/components/MockExam/ExamTable";
import ExamCards from "@/components/MockExam/ExamCards";
import ExamPagination from "@/components/MockExam/ExamPagination";
import EmptyState from "@/components/MockExam/EmptyState";
import ExamPageHeader from "@/components/MockExam/ExamPageHeader";
import ExamLoadingState from "@/components/MockExam/ExamLoadingState";
import ExamErrorState from "@/components/MockExam/ExamErrorState";
import SupabaseConnectionChecker from "@/components/SupabaseConnectionChecker";
import { useExamData } from "@/hooks/useExamData";
import { schools, years, paperTypes } from "@/data/mockExamPapers";

const MockExam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, examData, dataError, fetchExams } = useExamData();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get("grade") || "all");
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get("subject") || "all");
  const [selectedSchool, setSelectedSchool] = useState<string>(searchParams.get("schoolId") || "all");
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get("paperYear") || "all");
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("paperType") || "all");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  
  const itemsPerPage = 10;

  const filteredPapers = examData.filter(paper => {
    const matchesLevel = selectedLevel === "all" || paper.level === selectedLevel;
    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject;
    const matchesSchool = selectedSchool === "all" || paper.school === selectedSchool;
    const matchesYear = selectedYear === "all" || paper.year === selectedYear;
    const matchesType = selectedType === "all" || paper.type === selectedType;
    const matchesSearch = searchQuery === "" || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      paper.school.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLevel && matchesSubject && matchesSchool && matchesYear && 
           matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPapers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const params: Record<string, string> = {
      grade: selectedLevel !== "all" ? selectedLevel : "",
      subject: selectedSubject !== "all" ? selectedSubject : "",
      schoolId: selectedSchool !== "all" ? selectedSchool : "",
      paperYear: selectedYear !== "all" ? selectedYear : "",
      paperType: selectedType !== "all" ? selectedType : "",
      page: currentPage.toString()
    };
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key];
      }
    });
    
    setSearchParams(params);
  }, [
    selectedLevel, selectedSubject, selectedSchool, 
    selectedYear, selectedType, currentPage, searchQuery
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedLevel, selectedSubject, selectedSchool, 
    selectedYear, selectedType, searchQuery
  ]);

  const resetFilters = () => {
    setSelectedLevel("all");
    setSelectedSubject("all");
    setSelectedSchool("all");
    setSelectedYear("all");
    setSelectedType("all");
    setSearchQuery("");
  };

  const handleTakeExam = (examId: string) => {
    navigate(`/take-exam/${examId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <ExamPageHeader />
          <SupabaseConnectionChecker />
        </div>

        {isLoading ? (
          <ExamLoadingState />
        ) : dataError ? (
          <ExamErrorState onRetry={fetchExams} />
        ) : (
          <>
            <ExamFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedSchool={selectedSchool}
              setSelectedSchool={setSelectedSchool}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              resetFilters={resetFilters}
              schools={schools}
              years={years}
              paperTypes={paperTypes}
            />

            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="p-4 border-b border-gray-200">
                {filteredPapers.length > 0 ? (
                  <>
                    <ExamTable papers={currentItems} handleTakeExam={handleTakeExam} />
                    <ExamCards papers={currentItems} handleTakeExam={handleTakeExam} />
                    <ExamPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                ) : (
                  <EmptyState resetFilters={resetFilters} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MockExam;
