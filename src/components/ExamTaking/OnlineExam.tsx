import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import ExamQuestion from "./ExamQuestion";
import ExamTimer from "./ExamTimer";
import { ExamPaper, Question, QuestionType, UserAnswer } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { mockQuestions } from "./mockData";
import { mockExamPapers } from "@/data/mockExamPapers";
import answer from "../QuestionBank/QuestionViewer"

const formatText = (text: string | object | undefined) => {
  if (!text) return null;
  
  let textContent: string;
  if (typeof text === 'object') {
    const values = Object.values(text);
    textContent = values.length > 0 && typeof values[0] === 'string' ? values[0] : '';
  } else {
    textContent = String(text);
  }
  
  const withLineBreaks = textContent.replace(/\n/g, "<br />");
  return (
    <div
      className="text-base mb-2"
      dangerouslySetInnerHTML={{ __html: withLineBreaks }}
    />
  );
};

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
  const [questionLength, setQuestionLength] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        
        if (examId === "1") { 
          console.log("Fetching Primary 6 Chinese exam questions");
          
          const { data: questionData, error: questionError } = await supabase
            .from('questions')
            .select('*')
            .eq('level', 'Primary 6');
          
          if (questionError) {
            console.error("Error fetching questions:", questionError);
            throw new Error("Failed to load questions");
          }
          
          console.log("Raw questionData:", questionData);
          
          let examQuestions: Question[] = [];
          let q_len = "";
          if (questionData && questionData.length > 0) {
            examQuestions = questionData.reduce((acc: Question[], q) => {
              try {
                console.log("Processing question:", q);
                
                if (!q.content) {
                  console.warn("Skipping question without content:", q);
                  return acc;
                }
                
                const contentObj = typeof q.content === 'string' 
                  ? JSON.parse(q.content) 
                  : q.content;
                
                console.log("Parsed content object:", contentObj);
                
                if (!contentObj.questionList || !Array.isArray(contentObj.questionList)) {
                  console.warn("Invalid question list:", contentObj);
                  return acc;
                }
                
                const topic = contentObj.topic || "其他";
                console.log("Topic for questions:", topic);

                const answers = contentObj.answerList || [];
                const processedQuestions = contentObj.questionList.map((subQuestion: any, index: number): Question => {
                  // Find the corresponding answer in the answerList
                  const answer = answers.find((a: any) => a.id === subQuestion.id);
                  
                  const question: Question = {
                    id: `${q.id}-${subQuestion.id || index}`,
                    text: subQuestion.question || "",
                    type: "MCQ",
                    marks: 2,
                    topic: topic,
                    correctAnswer: answer ? String(answer.correctAnswer) : "1" // Use answer from answerList if found
                  };

                  if (subQuestion.options && Array.isArray(subQuestion.options) && subQuestion.options.length > 0) {
                    question.options = subQuestion.options.map((opt: any, optIndex: number) => ({
                      value: opt.key ? String(opt.key) : String(optIndex + 1),
                      label: `${String.fromCharCode(65 + optIndex)}. ${opt.value}`
                    }));
                  } else {
                    question.type = "ShortAnswer"
                  }
                  
                  return question;
                });

                return [...acc, ...processedQuestions];
              } catch (error) {
                console.error("Error processing individual question:", error);
                return acc;
              }
            }, []);
            
            console.log("Final processed questions:", examQuestions);
          }
          
          if (examQuestions.length === 0) {
            console.log("Using mock questions as fallback");
            examQuestions = mockQuestions;
          }
          
          console.log("Final processed questions:", examQuestions);
          setQuestionLength(q_len.toString());
          
          const examPaper = mockExamPapers.find(paper => paper.id === examId);
          const exam: ExamPaper = {
            id: examId,
            title: examPaper ? examPaper.title : "小六华文试卷",
            school: examPaper ? examPaper.school : "Nanyang Primary",
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
            description: "试卷不存在。",
            variant: "destructive"
          });
          navigate("/mock-exam");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Full error in fetchExam:", error);
        toast({
          title: "Error",
          description: "无法加载试卷。请重试。",
          variant: "destructive"
        });
        setLoading(false);
        navigate("/mock-exam");
      }
    };
    
    fetchExam();
  }, [examId, toast, navigate]);

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

  const getGroupedQuestions = () => {
    if (!currentExam) return [];
    
    const groupedQuestions = currentExam.questions.reduce((acc, question) => {
      const topic = question.topic || "其他";
      
      if (!acc[topic]) {
        acc[topic] = [];
      }
      
      acc[topic].push(question);
      return acc;
    }, {} as Record<string, Question[]>);

    return Object.entries(groupedQuestions);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-learnscape-blue mx-auto"></div>
          <p className="mt-4 text-lg">正在加载试卷...</p>
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
                <p className="text-gray-600">级���: {currentExam.level.toUpperCase()}</p>
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

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{currentExam?.title}</h1>
        <ExamTimer 
          initialTime={currentExam?.durationMinutes * 60} 
          onTimeExpired={handleTimeExpired}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <div className="space-y-6">
            {getGroupedQuestions().map(([topic, questions], topicIndex) => (
              <div key={topicIndex} className="mb-8">
                {topic !== '其他' && (
                  <h2 className="text-xl font-bold mb-4 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    {formatText({topic})}
                  </h2>
                )}
                {questions.map((question, index) => {
                  const globalIndex = currentExam?.questions.findIndex(q => q.id === question.id) ?? 0;
                  return (
                    <Card key={question.id} className="mb-6" id={`question-${globalIndex}`}>
                      <CardHeader className="border-b">
                        <CardTitle className="flex justify-between">
                          <span>问题 {globalIndex + 1} / {currentExam?.questions.length}</span>
                          <span className="text-gray-500">{question.marks} {question.marks === 1 ? '分' : '分'}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ExamQuestion 
                          question={question}
                          userAnswer={userAnswers[globalIndex]?.answer || ''}
                          onAnswerChange={(value) => {
                            setUserAnswers(prev => prev.map((a, i) => 
                              i === globalIndex 
                                ? { ...a, answer: value, isAnswered: true } 
                                : a
                            ));
                          }}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/4">
          <Card className="sticky top-4">
            <CardHeader className="border-b">
              <CardTitle>作答进度</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-5 gap-2">
                {userAnswers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={answer.isAnswered ? "outline" : "ghost"}
                    className={`h-10 w-10 p-0 ${
                      answer.isAnswered ? "border-green-500 border-2" : "border"
                    }`}
                    onClick={() => {
                      const element = document.getElementById(`question-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">已回答</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  已回答: {userAnswers.filter(a => a.isAnswered).length} / {currentExam?.questions.length}
                </p>
                <Progress 
                  value={(userAnswers.filter(a => a.isAnswered).length / currentExam?.questions.length) * 100} 
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
