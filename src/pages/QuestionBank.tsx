import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import QuestionViewer from "@/components/QuestionBank/QuestionViewer";
import QuestionBankDataFetcher from "@/components/QuestionBank/QuestionBankDataFetcher";
import { useI18n } from "@/contexts/I18nContext";

const QUESTIONS_PER_PAGE = 10;
const EXCLUDED_TITLES = ["巧练题（一）", "巧练题（二）", "巧练题（三）", "看图作文题"];

const defaultQuestionData = [
  { id: 1, title: "Grade 6 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 6", term: "CA1", date: "2025-03-01" },
  { id: 2, title: "Grade 6 - Grammar Practice - 1", subject: "English", type: "Grammar", level: "Primary 6", term: "CA1", date: "2025-03-05" },
  { id: 3, title: "Grade 5 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 5", term: "SA1", date: "2025-03-08" },
  { id: 4, title: "Grade 6 - Essay Writing - 1", subject: "English", type: "Writing", level: "Primary 6", term: "CA2", date: "2025-03-10" },
  { id: 5, title: "Grade 6 - Vocabulary Practice - 1", subject: "English", type: "Vocabulary", level: "Primary 6", term: "CA2", date: "2025-03-12" },
  { id: 6, title: "Grade 5 - Listening Practice - 1", subject: "English", type: "Listening", level: "Primary 5", term: "SA2", date: "2025-03-15" },
  { id: 7, title: "Grade 4 - Reading Comprehension - 1", subject: "English", type: "Reading", level: "Primary 4", term: "CA1", date: "2025-03-18" },
  { id: 8, title: "Grade 6 - Comprehensive Test - 1", subject: "English", type: "Comprehensive", level: "Primary 6", term: "SA1", date: "2025-03-20" },
  { id: 9, title: "Grade 5 - Grammar Practice - 1", subject: "English", type: "Grammar", level: "Primary 5", term: "CA1", date: "2025-03-22" },
  { id: 10, title: "Grade 6 - Reading Comprehension - 2", subject: "English", type: "Reading", level: "Primary 6", term: "SA2", date: "2025-03-25" },
  { id: 11, title: "Grade 4 - Vocabulary Practice - 1", subject: "English", type: "Vocabulary", level: "Primary 4", term: "CA2", date: "2025-03-28" },
  { id: 12, title: "Grade 6 - Reading Comprehension - 3", subject: "English", type: "Reading", level: "Primary 6", term: "SA1", date: "2025-04-01" },
  { id: 13, title: "Grade 3 - Addition and Subtraction", subject: "Math", type: "Arithmetic", level: "Primary 3", term: "CA1", date: "2025-03-02" },
  { id: 14, title: "Grade 4 - Multiplication and Division", subject: "Math", type: "Arithmetic", level: "Primary 4", term: "SA1", date: "2025-03-06" },
  { id: 15, title: "Grade 5 - Fractions", subject: "Math", type: "Fractions", level: "Primary 5", term: "CA2", date: "2025-03-11" },
  { id: 16, title: "Grade 6 - Geometry", subject: "Math", type: "Geometry", level: "Primary 6", term: "SA2", date: "2025-03-16" },
  { id: 17, title: "Grade 2 - Basic Characters", subject: "Chinese", type: "Characters", level: "Primary 2", term: "CA1", date: "2025-03-03" },
  { id: 18, title: "Grade 3 - Reading Practice", subject: "Chinese", type: "Reading", level: "Primary 3", term: "SA1", date: "2025-03-09" },
  { id: 19, title: "Grade 4 - Composition", subject: "Chinese", type: "Writing", level: "Primary 4", term: "CA2", date: "2025-03-14" },
  { id: 20, title: "Grade 6 - Comprehensive Test", subject: "Chinese", type: "Comprehensive", level: "Primary 6", term: "SA2", date: "2025-03-19" },
  { id: 21, title: "Grade 3 - Plants and Animals", subject: "Science", type: "Biology", level: "Primary 3", term: "CA1", date: "2025-03-04" },
  { id: 22, title: "Grade 4 - Energy and Forces", subject: "Science", type: "Physics", level: "Primary 4", term: "SA1", date: "2025-03-13" },
  { id: 23, title: "Grade 5 - Materials and Matter", subject: "Science", type: "Chemistry", level: "Primary 5", term: "CA2", date: "2025-03-17" },
  { id: 24, title: "Grade 6 - Earth and Space", subject: "Science", type: "Earth Science", level: "Primary 6", term: "SA2", date: "2025-03-21" }
].filter(question => !EXCLUDED_TITLES.includes(question.title));

const grades = ["All Grades", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6", "小六"];
const subjects = ["All Subjects", "English", "Math", "Chinese", "Science", "华文"];
const terms = ["All Terms", "CA1", "SA1", "CA2", "SA2"];

const QuestionBank = () => {
  const { t, language } = useI18n();
  const translations = t.QUESTION_BANK_PAGE || {};
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [questionData, setQuestionData] = useState(defaultQuestionData);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleDataLoaded = (data) => {
    if (data && data.length > 0) {
      console.log('Data loaded successfully, processing...');
      const formattedData = data
        .filter(item => !EXCLUDED_TITLES.includes(item.title))
        .map(item => ({
          id: typeof item.id === 'number' ? item.id : parseInt(item.id) || Math.floor(Math.random() * 1000),
          title: item.title || 'Untitled',
          subject: item.subject || 'Unknown',
          type: typeof item.content === 'string' ? 'General' : 'Comprehensive',
          level: item.level || 'Unknown',
          term: item.term || 'Unknown',
          date: item.created_at || new Date().toISOString(),
          created_at: item.created_at,
          content: item.content
        }));
      setQuestionData(formattedData);
    } else {
      console.log('No data received or empty data array, using default data');
      setQuestionData(defaultQuestionData);
    }
  };

  const filteredQuestions = questionData.filter(question => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = selectedGrade === "All Grades" || question.level === selectedGrade;
    
    const matchesSubject = selectedSubject === "All Subjects" || question.subject === selectedSubject;
    
    const matchesTerm = selectedTerm === "All Terms" || question.term === selectedTerm;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesTerm;
  });

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentItems = filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString.slice(0, 10).replace(/-/g, '/');
      }
      return date.toISOString().slice(0, 10).replace(/-/g, '/');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setDialogOpen(true);
  };

  const getTranslation = (key) => {
    return translations[key] || key;
  };

  const handleRetry = () => {
    setIsLoading(true);
    setFetchError(false);
    window.location.reload();
  };

  const handleCheckSupabaseConnection = async () => {
    try {
      toast.loading(language === 'zh' ? "测试数据库连接中..." : "Testing database connection...");
      console.log("Testing Supabase connection...");
      const { data, error } = await supabase.from('questions').select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Supabase connection test failed:", error);
        toast.error(language === 'zh' ? "连接Supabase数据库失败" : "Failed to connect to Supabase");
        return;
      }
      
      console.log("Supabase connection successful:", data);
      toast.success(language === 'zh' ? "Supabase连接成功" : "Supabase connection successful");
      
    } catch (err) {
      console.error("Error testing Supabase connection:", err);
      toast.error(language === 'zh' ? "测试Supabase连接时出错" : "Error testing Supabase connection");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-learnscape-darkBlue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{getTranslation('TITLE')}</h1>
          <p className="text-lg max-w-3xl">{getTranslation('SUBTITLE')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-learnscape-darkBlue">{getTranslation('QUESTION_LIST')}</h2>
            <Button 
              variant="outline" 
              onClick={handleCheckSupabaseConnection}
              className="text-sm"
            >
              {getTranslation('TEST_CONNECTION')}
            </Button>
          </div>
          
          <QuestionBankDataFetcher 
            language={language}
            onDataLoaded={handleDataLoaded}
            onError={setFetchError}
            onLoadingChange={setIsLoading}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative flex items-center col-span-1 md:col-span-4">
              <Search className="absolute left-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={getTranslation('SEARCH_PLACEHOLDER')}
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>
            
            <div>
              <Select 
                value={selectedSubject} 
                onValueChange={(value) => {
                  setSelectedSubject(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={getTranslation('SELECT_SUBJECT')} />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select 
                value={selectedGrade} 
                onValueChange={(value) => {
                  setSelectedGrade(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={getTranslation('SELECT_GRADE')} />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select 
                value={selectedTerm} 
                onValueChange={(value) => {
                  setSelectedTerm(value);
                  handleFilterChange();
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={getTranslation('SELECT_TERM')} />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedSubject("All Subjects");
                  setSelectedGrade("All Grades");
                  setSelectedTerm("All Terms");
                  setSearchTerm("");
                  handleFilterChange();
                }}
              >
                {getTranslation('CLEAR_FILTERS')}
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-learnscape-blue"></div>
            </div>
          ) : fetchError ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-500 mb-4">{getTranslation('CONNECTION_ERROR')}</p>
              <p className="mb-4">{getTranslation('USING_SAMPLE_DATA')}</p>
              <Button 
                variant="default"
                className="bg-learnscape-blue text-white"
                onClick={handleRetry}
              >
                {getTranslation('RETRY')}
              </Button>
            </div>
          ) : (
            <>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{getTranslation('QUESTION_TITLE')}</TableHead>
                        <TableHead>{getTranslation('SUBJECT')}</TableHead>
                        <TableHead>{getTranslation('LEVEL')}</TableHead>
                        <TableHead>{getTranslation('TERM')}</TableHead>
                        <TableHead>{getTranslation('DATE')}</TableHead>
                        <TableHead className="text-right">{getTranslation('ACTION')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.length > 0 ? (
                        currentItems.map((question) => (
                          <TableRow key={question.id}>
                            <TableCell className="font-medium">{question.title}</TableCell>
                            <TableCell>{question.subject}</TableCell>
                            <TableCell>{question.level}</TableCell>
                            <TableCell>{question.term}</TableCell>
                            <TableCell>
                              {formatDate(question.date)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                className="bg-learnscape-blue text-white"
                                onClick={() => handleViewQuestion(question)}
                              >
                                {getTranslation('VIEW')}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            {getTranslation('NO_QUESTIONS')}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="mt-4 text-sm text-gray-500">
                {getTranslation('SHOWING_RESULTS')
                  .replace('{start}', String(startIndex + 1))
                  .replace('{end}', String(Math.min(startIndex + QUESTIONS_PER_PAGE, filteredQuestions.length)))
                  .replace('{total}', String(filteredQuestions.length))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <QuestionViewer
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        question={selectedQuestion}
      />
    </div>
  );
};

export default QuestionBank;
