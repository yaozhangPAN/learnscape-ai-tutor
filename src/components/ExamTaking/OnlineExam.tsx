import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import ExamQuestion from "./ExamQuestion";
import ExamTimer from "./ExamTimer";
import { ExamPaper, Question, QuestionType, UserAnswer } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { mockQuestions } from "./mockData";

const OnlineExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentExam, setCurrentExam] = useState<ExamPaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(6000); // 1 hour 40 minutes by default
  const [score, setScore] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        
        if (examId === "1") { // For Primary 6 Chinese exam
          console.log("Fetching Primary 6 Chinese exam questions");
          
          // First attempt to get questions from Supabase
          const { data: questionData, error: questionError } = await supabase
            .from('questions')
            .select('*')
            .eq('level', 'Primary 6');
          
          if (questionError) {
            console.error("Error fetching questions:", questionError);
            throw new Error("Failed to load questions");
          }
          
          console.log("Fetched questions:", questionData);
          
          // If no questions found in database or an error occurs, use mock data as fallback
          let examQuestions = [];
          if (questionData && questionData.length > 0) {
            examQuestions = organizeQuestions(questionData);
          } else {
            console.log("No questions found in database, using mock data");
            examQuestions = mockQuestions;
          }
          
          console.log("Final exam questions:", examQuestions);
          
          // Make sure we have questions before proceeding
          if (examQuestions.length === 0) {
            throw new Error("No questions available for this exam");
          }
          
          const exam: ExamPaper = {
            id: examId,
            title: "Chinese Paper 2",
            school: "Primary Schools",
            subject: "chinese",
            level: "p6",
            year: "2024",
            type: "Practice Paper",
            durationMinutes: 100, // 1 hour 40 minutes
            totalMarks: calculateTotalMarks(examQuestions),
            questions: examQuestions,
          };
          
          setCurrentExam(exam);
          setTimeRemaining(exam.durationMinutes * 60);
          
          const initialAnswers = exam.questions.map(q => ({
            questionId: q.id,
            answer: "",
            isCorrect: false,
            isAnswered: false,
            marksAwarded: 0
          }));
          
          setUserAnswers(initialAnswers);
        } else {
          toast({
            title: "Error",
            description: "Exam not found.",
            variant: "destructive"
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam:", error);
        toast({
          title: "Error",
          description: "Failed to load exam paper. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    fetchExam();
  }, [examId, toast]);

  const organizeQuestions = (questionsData: any[]): Question[] => {
    try {
      console.log("Organizing questions, data:", questionsData);
      
      // Define section order
      const sectionOrder = [
        "语文应用",
        "短文填空",
        "阅读理解一",
        "完成对话",
        "阅读理解二"
      ];
      
      const organizedQuestions: Question[] = [];
      
      // First filter to have only questions with titles that match our sections
      const validQuestions = questionsData.filter(q => 
        q.title && sectionOrder.some(section => q.title.includes(section))
      );
      
      console.log("Valid questions after filtering:", validQuestions);
      
      // Then organize them by section
      sectionOrder.forEach(sectionTitle => {
        const sectionQuestions = validQuestions.filter(q => 
          q.title && q.title.includes(sectionTitle)
        );
        
        console.log(`Questions for section ${sectionTitle}:`, sectionQuestions);
        
        sectionQuestions.forEach(q => {
          if (q.content) {
            try {
              // Make sure content is an object
              const content = typeof q.content === 'string' 
                ? JSON.parse(q.content) 
                : q.content;
              
              // Create a valid question object with defaults for missing properties
              const question: Question = {
                id: q.id || `q-${Math.random().toString(36).substr(2, 9)}`,
                text: content.questionText || q.title || "No question text provided",
                type: determineQuestionType(content),
                marks: content.marks || 2, // Default to 2 marks if not specified
              };
              
              if (question.type === "MCQ" && content.options) {
                question.options = content.options.map((opt: any, index: number) => ({
                  value: String.fromCharCode(65 + index), // A, B, C, D...
                  label: `${String.fromCharCode(65 + index)}. ${opt}`
                }));
                question.correctAnswer = content.correctAnswer || "A";
              }
              
              if (question.type === "ShortAnswer" && content.correctAnswer) {
                question.correctAnswer = content.correctAnswer;
              }
              
              organizedQuestions.push(question);
            } catch (error) {
              console.error("Error processing question:", error, q);
            }
          }
        });
      });
      
      console.log("Final organized questions:", organizedQuestions);
      
      // If we have no questions from the database, use mock data
      if (organizedQuestions.length === 0) {
        console.log("No questions could be processed, returning mock data");
        return mockQuestions;
      }
      
      return organizedQuestions;
    } catch (error) {
      console.error("Error organizing questions:", error);
      // Fallback to mock data if there's an error in processing
      return mockQuestions;
    }
  };

  const determineQuestionType = (content: any): QuestionType => {
    if (!content) return "ShortAnswer"; // Default if content is missing
    
    if (content.type) {
      if (content.type.toLowerCase().includes('mcq') || 
          content.type.toLowerCase().includes('multiple choice')) {
        return "MCQ";
      } else if (content.type.toLowerCase().includes('essay')) {
        return "Essay";
      }
    }
    
    if (content.options && Array.isArray(content.options) && content.options.length > 0) {
      return "MCQ";
    }
    
    return "ShortAnswer";
  };

  const calculateTotalMarks = (questions: Question[]): number => {
    if (!questions || questions.length === 0) return 0;
    return questions.reduce((total, q) => total + (q.marks || 0), 0);
  };

  const startExam = () => {
    setExamStarted(true);
    toast({
      title: "考试开始",
      description: `你有 ${currentExam?.durationMinutes} 分钟完成这次考试。`,
    });
  };

  const submitExam = () => {
    if (userAnswers.some(answer => !answer.isAnswered)) {
      const confirmation = window.confirm("你还有未回答的问题。确定要提交吗？");
      if (!confirmation) return;
    }
    
    if (currentExam) {
      let totalScore = 0;
      const scoredAnswers = userAnswers.map((answer, index) => {
        const question = currentExam.questions[index];
        let isCorrect = false;
        let marksAwarded = 0;
        
        if (question.type === "MCQ") {
          isCorrect = answer.answer === question.correctAnswer;
          marksAwarded = isCorrect ? question.marks : 0;
        } else {
          if (answer.answer.length > 0) {
            marksAwarded = Math.floor(question.marks * 0.7);
          }
        }
        
        totalScore += marksAwarded;
        
        return {
          ...answer,
          isCorrect,
          marksAwarded
        };
      });
      
      setUserAnswers(scoredAnswers);
      setScore(totalScore);
      setExamCompleted(true);
      
      toast({
        title: "考试已提交",
        description: `你的分数: ${totalScore}/${currentExam.totalMarks}`,
      });
    }
  };

  const handleTimeExpired = () => {
    toast({
      title: "时间到！",
      description: "考试时间已结束。你的答案已自动提交。",
      variant: "destructive"
    });
    submitExam();
  };

  const saveAnswer = (value: string) => {
    setUserAnswers(prev => prev.map((a, i) => 
      i === currentQuestionIndex 
        ? { ...a, answer: value, isAnswered: true } 
        : a
    ));
  };

  const nextQuestion = () => {
    if (currentExam && currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-learnscape-blue mx-auto"></div>
          <p className="mt-4 text-lg">Loading exam paper...</p>
        </div>
      </div>
    );
  }

  if (!currentExam || !currentExam.questions || currentExam.questions.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">试卷不可用</h2>
        <p className="mb-6">很抱歉，找不到该试卷或试卷中没有问题。</p>
        <Button onClick={() => navigate("/mock-exam")}>
          返回考试列表
        </Button>
      </div>
    );
  }

  if (examCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-500" />
              考试结束
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">{currentExam.title}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <p className="text-gray-600">学校: {currentExam.school}</p>
                <p className="text-gray-600">级别: {currentExam.level.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">类型: {currentExam.type}</p>
                <p className="text-gray-600">年份: {currentExam.year}</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-2">你的成绩</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-xl text-gray-500">/ {currentExam.totalMarks}</div>
                <div className="text-xl ml-auto">
                  {score !== null && `${Math.round((score / currentExam.totalMarks) * 100)}%`}
                </div>
              </div>
              <Progress 
                value={score !== null ? (score / currentExam.totalMarks) * 100 : 0} 
                className="h-3 mb-2"
              />
            </div>
            
            <h3 className="text-lg font-bold mb-4">题目概览</h3>
            <div className="space-y-4">
              {currentExam.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">问题 {index + 1}</h4>
                    <div className={`px-2 py-1 rounded text-sm font-medium ${
                      userAnswers[index].isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userAnswers[index].isCorrect ? '正确' : '不正确'}
                    </div>
                  </div>
                  <p className="mb-2 text-sm">{question.text.substring(0, 100)}...</p>
                  <div className="flex justify-between text-sm">
                    <span>你的答案: {userAnswers[index].answer || '(没有答案)'}</span>
                    <span>得分: {userAnswers[index].marksAwarded}/{question.marks}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/mock-exam")}>
              返回考试列表
            </Button>
            <Button onClick={() => {
              setExamStarted(false);
              setExamCompleted(false);
              setCurrentQuestionIndex(0);
              setScore(null);
              if (currentExam) {
                const resetAnswers = currentExam.questions.map(q => ({
                  questionId: q.id,
                  answer: "",
                  isCorrect: false,
                  isAnswered: false,
                  marksAwarded: 0
                }));
                setUserAnswers(resetAnswers);
              }
            }}>
              重新考试
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-2xl">{currentExam.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <p className="text-gray-600">学校: {currentExam.school}</p>
                <p className="text-gray-600">科目: {currentExam.subject}</p>
                <p className="text-gray-600">级别: {currentExam.level.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">类型: {currentExam.type}</p>
                <p className="text-gray-600">年份: {currentExam.year}</p>
                <p className="text-gray-600">时长: {currentExam.durationMinutes} 分钟</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-2">考试说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>你有 {currentExam.durationMinutes} 分钟完成这次考试。</li>
                <li>考试包含 {currentExam.questions.length} 道题目，总分 {currentExam.totalMarks} 分。</li>
                <li>可以使用导航按钮在题目之间切换。</li>
                <li>你的进度会自动保存。</li>
                <li>可以随时点击"提交考试"按钮提交。</li>
                <li>提交后，不能重新开始考试。</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/mock-exam")}>
              返回考试列表
            </Button>
            <Button onClick={startExam}>
              开始考试
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{currentExam.title}</h1>
        <ExamTimer 
          initialTime={currentExam.durationMinutes * 60} 
          onTimeExpired={handleTimeExpired}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <Card className="mb-6">
            <CardHeader className="border-b">
              <CardTitle className="flex justify-between">
                <span>问题 {currentQuestionIndex + 1} / {currentExam.questions.length}</span>
                <span className="text-gray-500">{currentQuestion.marks} {currentQuestion.marks === 1 ? '分' : '分'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ExamQuestion 
                question={currentQuestion}
                userAnswer={currentAnswer.answer}
                onAnswerChange={saveAnswer}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                上一题
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={currentQuestionIndex === currentExam.questions.length - 1}
              >
                下一题
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>题目导航</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-5 gap-2">
                {userAnswers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={currentQuestionIndex === index ? "default" : (answer.isAnswered ? "outline" : "ghost")}
                    className={`h-10 w-10 p-0 ${
                      answer.isAnswered ? "border-green-500 border-2" : "border"
                    } ${currentQuestionIndex === index ? "bg-learnscape-blue text-white" : ""}`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-learnscape-blue rounded-full mr-2"></div>
                  <span className="text-sm">当前题目</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">已回答</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  已回答: {userAnswers.filter(a => a.isAnswered).length} / {currentExam.questions.length}
                </p>
                <Progress 
                  value={(userAnswers.filter(a => a.isAnswered).length / currentExam.questions.length) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant="destructive"
                onClick={submitExam}
              >
                提交考试
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnlineExam;
