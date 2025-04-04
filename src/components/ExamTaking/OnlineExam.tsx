
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
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes by default
  const [score, setScore] = useState<number | null>(null);
  
  // Fetch the exam paper based on examId
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        // In a real app, this would be a fetch from Supabase
        // For now, we'll use mock data
        setTimeout(() => {
          // Mock data for demonstration
          const exam: ExamPaper = {
            id: examId || "1",
            title: "Mathematics Paper 1",
            school: "Nanyang Primary",
            subject: "mathematics",
            level: "p6",
            year: "2023",
            type: "SA2",
            durationMinutes: 60,
            totalMarks: 100,
            questions: mockQuestions,
          };
          
          setCurrentExam(exam);
          setTimeRemaining(exam.durationMinutes * 60);
          
          // Initialize user answers
          const initialAnswers = exam.questions.map(q => ({
            questionId: q.id,
            answer: "",
            isCorrect: false,
            isAnswered: false,
            marksAwarded: 0
          }));
          
          setUserAnswers(initialAnswers);
          setLoading(false);
        }, 1000);
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

  // Start the exam
  const startExam = () => {
    setExamStarted(true);
    toast({
      title: "Exam Started",
      description: `You have ${currentExam?.durationMinutes} minutes to complete this exam.`,
    });
  };

  // Submit the exam
  const submitExam = () => {
    if (userAnswers.some(answer => !answer.isAnswered)) {
      const confirmation = window.confirm("You have unanswered questions. Are you sure you want to submit?");
      if (!confirmation) return;
    }
    
    // Calculate score
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
          // For other question types like open-ended, we'd need manual grading
          // For demo purposes, let's award partial marks
          if (answer.answer.length > 0) {
            marksAwarded = Math.floor(question.marks * 0.7); // 70% for attempting
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
        title: "Exam Submitted",
        description: `Your score: ${totalScore}/${currentExam.totalMarks}`,
      });
    }
  };

  // Handle time expired
  const handleTimeExpired = () => {
    toast({
      title: "Time's Up!",
      description: "Your exam time has expired. Your answers have been automatically submitted.",
      variant: "destructive"
    });
    submitExam();
  };

  // Save answer for current question
  const saveAnswer = (value: string) => {
    setUserAnswers(prev => prev.map((a, i) => 
      i === currentQuestionIndex 
        ? { ...a, answer: value, isAnswered: true } 
        : a
    ));
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentExam && currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Navigate to previous question
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

  if (!currentExam) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Exam Not Found</h2>
        <p className="mb-6">The exam paper you're looking for could not be found.</p>
        <Button onClick={() => navigate("/mock-exam")}>
          Return to Mock Exams
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
              Exam Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">{currentExam.title}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <p className="text-gray-600">School: {currentExam.school}</p>
                <p className="text-gray-600">Level: {currentExam.level.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Type: {currentExam.type}</p>
                <p className="text-gray-600">Year: {currentExam.year}</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-2">Your Result</h3>
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
            
            <h3 className="text-lg font-bold mb-4">Question Summary</h3>
            <div className="space-y-4">
              {currentExam.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <div className={`px-2 py-1 rounded text-sm font-medium ${
                      userAnswers[index].isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userAnswers[index].isCorrect ? 'Correct' : 'Incorrect'}
                    </div>
                  </div>
                  <p className="mb-2 text-sm">{question.text.substring(0, 100)}...</p>
                  <div className="flex justify-between text-sm">
                    <span>Your answer: {userAnswers[index].answer || '(No answer)'}</span>
                    <span>Marks: {userAnswers[index].marksAwarded}/{question.marks}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/mock-exam")}>
              Back to Exam List
            </Button>
            <Button onClick={() => {
              setExamStarted(false);
              setExamCompleted(false);
              setCurrentQuestionIndex(0);
              setScore(null);
              // Reset answers
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
              Retry Exam
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
                <p className="text-gray-600">School: {currentExam.school}</p>
                <p className="text-gray-600">Subject: {currentExam.subject}</p>
                <p className="text-gray-600">Level: {currentExam.level.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Type: {currentExam.type}</p>
                <p className="text-gray-600">Year: {currentExam.year}</p>
                <p className="text-gray-600">Duration: {currentExam.durationMinutes} minutes</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-2">Exam Instructions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You have {currentExam.durationMinutes} minutes to complete this exam.</li>
                <li>The exam consists of {currentExam.questions.length} questions worth a total of {currentExam.totalMarks} marks.</li>
                <li>You can navigate between questions using the navigation buttons.</li>
                <li>Your progress is saved automatically.</li>
                <li>You can submit the exam at any time by clicking the "Submit" button.</li>
                <li>Once submitted, you cannot retake the exam without starting over.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/mock-exam")}>
              Back to Exam List
            </Button>
            <Button onClick={startExam}>
              Start Exam
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
                <span>Question {currentQuestionIndex + 1} of {currentExam.questions.length}</span>
                <span className="text-gray-500">{currentQuestion.marks} {currentQuestion.marks === 1 ? 'mark' : 'marks'}</span>
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
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={currentQuestionIndex === currentExam.questions.length - 1}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Question Navigator</CardTitle>
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
                  <span className="text-sm">Current Question</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Answered</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Questions Answered: {userAnswers.filter(a => a.isAnswered).length} of {currentExam.questions.length}
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
                Submit Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnlineExam;
