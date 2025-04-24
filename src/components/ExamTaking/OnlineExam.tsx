import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExamQuestion from "./ExamQuestion";
import { ExamPaper, Question, UserAnswer } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { mockQuestions } from "./mockData";
import { mockExamPapers } from "@/data/mockExamPapers";
import { anwser } from "../QuestionBank/QuestionViewer";
import ExamHeader from "./components/ExamHeader";
import ExamProgress from "./components/ExamProgress";
import ExamResults from "./components/ExamResults";
import ExamStart from "./components/ExamStart";

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
  const [timeRemaining, setTimeRemaining] = useState(6000);
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
                
                const answerMap = new Map(anwser.map(a => [a.id, a]));
                
                const processedQuestions = contentObj.questionList.map((subQuestion: any, index: number): Question => {
                  console.log("Processing subQuestion:", subQuestion.question);
                  q_len = q_len + "_" + subQuestion.question;
                  const question: Question = {
                    id: `${q.id}-${subQuestion.id || index}`,
                    text: subQuestion.question || "",
                    type: "MCQ",
                    marks: 2,
                    topic: topic,
                  };

                  if (subQuestion.options && Array.isArray(subQuestion.options) && subQuestion.options.length > 0) {
                    question.options = subQuestion.options.map((opt: any, optIndex: number) => ({
                      value: opt.key ? String(opt.key) : String(optIndex + 1),
                      label: `${String.fromCharCode(65 + optIndex)}. ${opt.value}`
                    }));
                  } else {
                    question.type = "ShortAnswer"
                  }

                  const answerObj = answerMap.get(subQuestion.id);
                  question.correctAnswer = answerObj ? answerObj.value : "N/A";

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
            durationMinutes: 100,
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

  const handleQuestionSelect = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <ExamResults 
        exam={currentExam}
        score={score}
        userAnswers={userAnswers}
        onRetry={() => {
          setExamStarted(false);
          setExamCompleted(false);
          setCurrentQuestionIndex(0);
          setScore(null);
          const resetAnswers = currentExam.questions.map(q => ({
            questionId: q.id,
            answer: "",
            isCorrect: false,
            isAnswered: false,
            marksAwarded: 0
          }));
          setUserAnswers(resetAnswers);
        }}
        onReturn={() => navigate("/mock-exam")}
      />
    );
  }

  if (!examStarted) {
    return (
      <ExamStart
        exam={currentExam}
        onStart={startExam}
        onReturn={() => navigate("/mock-exam")}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <ExamHeader 
        exam={currentExam}
        onTimeExpired={handleTimeExpired}
      />
      
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
                      <div className="space-y-4 p-6">
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
                          examCompleted={examCompleted}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/4">
          <ExamProgress
            userAnswers={userAnswers}
            totalQuestions={currentExam.questions.length}
            onQuestionSelect={handleQuestionSelect}
            onSubmit={submitExam}
          />
        </div>
      </div>
    </div>
  );
};

export default OnlineExam;
