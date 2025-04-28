
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExamFilters from "@/components/MockExam/ExamFilters";
import ExamTable from "@/components/MockExam/ExamTable";
import ExamCards from "@/components/MockExam/ExamCards";
import ExamPagination from "@/components/MockExam/ExamPagination";
import EmptyState from "@/components/MockExam/EmptyState";
import { mockExamPapers, schools, years, paperTypes } from "@/data/mockExamPapers";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "sonner";

const MockExam = () => {
  const { t, language } = useI18n();
  const translations = t.MOCK_EXAM || {};
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get("grade") || "all");
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get("subject") || "all");
  const [selectedSchool, setSelectedSchool] = useState<string>(searchParams.get("schoolId") || "all");
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get("paperYear") || "all");
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("paperType") || "all");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [examData, setExamData] = useState(mockExamPapers);
  const [dataError, setDataError] = useState<boolean>(false);
  
  const itemsPerPage = 10;

  useEffect(() => {
    // 模拟数据获取，实际中可替换为 Supabase 查询
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        setDataError(false);
        console.log(`Fetching mock exams... Language: ${language}`);
        
        // 在这里可以添加真实的 API 调用
        // 目前使用模拟数据
        setTimeout(() => {
          setExamData(mockExamPapers);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching mock exams:", error);
        setDataError(true);
        toast.error(language === 'zh' ? "加载模拟考试失败。" : "Failed to load mock exams.");
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [language]);

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

  // 确保所有需要翻译的字符串都有默认值
  const getTranslation = (key) => {
    return translations[key] || key;
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">{getTranslation('TITLE')}</h1>
          <p className="text-gray-600">{getTranslation('SUBTITLE')}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-learnscape-blue"></div>
          </div>
        ) : dataError ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-500 mb-4">{language === 'zh' ? '加载模拟考试数据时出错' : 'Error loading mock exam data'}</p>
            <button 
              className="px-4 py-2 bg-learnscape-blue text-white rounded hover:bg-blue-600 transition-colors"
              onClick={handleRetry}
            >
              {language === 'zh' ? '重试' : 'Retry'}
            </button>
          </div>
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
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-learnscape-darkBlue">
                    {getTranslation('EXAMS')}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredPapers.length} {getTranslation('RESULTS')})
                    </span>
                  </h2>
                </div>
              </div>

              {filteredPapers.length > 0 ? (
                <div>
                  <ExamTable papers={currentItems} handleTakeExam={handleTakeExam} />
                  <ExamCards papers={currentItems} handleTakeExam={handleTakeExam} />
                  <ExamPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              ) : (
                <EmptyState resetFilters={resetFilters} />
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MockExam;
