
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BookOpen, FileText, ListCheck, Search } from "lucide-react";
import QuestionModule from "@/components/QuestionModule";

const QUESTIONS_PER_PAGE = 10;

const questionData = [
  { id: 1, title: "小学六年级 - 阅读理解练习 - 1", type: "阅读理解", level: "小学六年级", date: "2025-03-01" },
  { id: 2, title: "小学六年级 - 语法练习 - 1", type: "语法", level: "小学六年级", date: "2025-03-05" },
  { id: 3, title: "小学五年级 - 阅读理解练习 - 1", type: "阅读理解", level: "小学五年级", date: "2025-03-08" },
  { id: 4, title: "小学六年级 - 作文练习 - 1", type: "作文", level: "小学六年级", date: "2025-03-10" },
  { id: 5, title: "小学六年级 - 词汇练习 - 1", type: "词汇", level: "小学六年级", date: "2025-03-12" },
  { id: 6, title: "小学五年级 - 听力练习 - 1", type: "听力", level: "小学五年级", date: "2025-03-15" },
  { id: 7, title: "小学四年级 - 阅读理解练习 - 1", type: "阅读理解", level: "小学四年级", date: "2025-03-18" },
  { id: 8, title: "小学六年级 - 综合练习 - 1", type: "综合", level: "小学六年级", date: "2025-03-20" },
  { id: 9, title: "小学五年级 - 语法练习 - 1", type: "语法", level: "小学五年级", date: "2025-03-22" },
  { id: 10, title: "小学六年级 - 阅读理解练习 - 2", type: "阅读理解", level: "小学六年级", date: "2025-03-25" },
  { id: 11, title: "小学四年级 - 词汇练习 - 1", type: "词汇", level: "小学四年级", date: "2025-03-28" },
  { id: 12, title: "小学六年级 - 阅读理解练习 - 3", type: "阅读理解", level: "小学六年级", date: "2025-04-01" },
];

const questionModules = [
  {
    title: "阅读理解",
    description: "提高学生的阅读理解能力和分析能力",
    icon: <BookOpen className="h-6 w-6 text-white" />,
    count: 24,
    color: "bg-learnscape-blue text-white"
  },
  {
    title: "语法与词汇",
    description: "巩固语法知识和扩充词汇量",
    icon: <FileText className="h-6 w-6 text-white" />,
    count: 18,
    color: "bg-learnscape-purple text-white"
  },
  {
    title: "综合练习",
    description: "全面检测学生的语言应用能力",
    icon: <ListCheck className="h-6 w-6 text-white" />,
    count: 12,
    color: "bg-green-500 text-white"
  }
];

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQuestions = questionData.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-learnscape-darkBlue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">题库资源</h1>
          <p className="text-lg max-w-3xl">
            我们精心设计的题库资源涵盖各个级别的中文学习，从基础词汇到高级阅读理解，帮助学生全面提升中文能力。
          </p>
        </div>
      </div>

      {/* Question Modules */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-8">题目类型</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questionModules.map((module, index) => (
            <QuestionModule
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              count={module.count}
              color={module.color}
            />
          ))}
        </div>
      </div>

      {/* Search and Question List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-6">题目列表</h2>
          
          {/* Search */}
          <div className="relative flex items-center mb-6">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索题目..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Questions Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>题目名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>级别</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{question.title}</TableCell>
                      <TableCell>{question.type}</TableCell>
                      <TableCell>{question.level}</TableCell>
                      <TableCell>{question.date}</TableCell>
                      <TableCell className="text-right">
                        <Button className="bg-learnscape-blue text-white">查看</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
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
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
