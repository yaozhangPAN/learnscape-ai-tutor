
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MockExam from "./pages/MockExam";
import OnlineExam from "./components/ExamTaking/OnlineExam";
import Courses from "./pages/Courses";
import QuestionBank from "./pages/QuestionBank";
import Leaderboard from "./pages/Leaderboard";
import Worksheets from "./pages/Worksheets";
import Referral from "./pages/Referral";
import AITutor from "./pages/AITutor";
import WritingCoach from "./pages/WritingCoach";
import OralExamPractice from "./pages/OralExamPractice";
import DictationPractice from "./pages/DictationPractice";
import TutorMe from "./pages/TutorMe";
import ErrorAnalysis from "./pages/ErrorAnalysis";
import SnapAndSolve from "./pages/SnapAndSolve";
import DailyPlan from "./pages/DailyPlan";
import ZoomCourses from "./pages/ZoomCourses";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import VocabularyBuilder from "./pages/VocabularyBuilder";
import LanguageArtsRedirect from "./components/LanguageArtsRedirect";
import ReadingCoachRedirect from "./components/ReadingCoachRedirect";
import CourseDetails from "./pages/CourseDetails";
import OralExamRedirect from "./components/AITutor/OralExamRedirect";
import { I18nProvider } from "@/contexts/I18nContext";
import Account from "./pages/Account";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Login />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-canceled" element={<PaymentCanceled />} />
                  
                  <Route path="/video-tutorials" element={<Courses />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mock-exam" element={<MockExam />} />
                  <Route path="/take-exam/:examId" element={<OnlineExam />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:courseId" element={<CourseDetails />} />
                  <Route path="/worksheets" element={<Worksheets />} />
                  <Route path="/question-bank" element={<QuestionBank />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/referral" element={<Referral />} />
                  <Route path="/ai-tutor" element={<AITutor />} />
                  <Route path="/daily-plan" element={<DailyPlan />} />
                  <Route path="/zoom-courses" element={<ZoomCourses />} />
                  
                  <Route path="/ai-tutor/writing-coach" element={<WritingCoach />} />
                  <Route path="/ai-tutor/oral-exam" element={<OralExamRedirect />} />
                  <Route path="/ai-tutor/dictation-practice" element={<DictationPractice />} />
                  <Route path="/ai-tutor/tutor-me" element={<TutorMe />} />
                  <Route path="/ai-tutor/error-analysis" element={<ErrorAnalysis />} />
                  <Route path="/ai-tutor/snap-and-solve" element={<SnapAndSolve />} />
                  <Route path="/ai-tutor/vocabulary" element={<VocabularyBuilder />} />
                  <Route path="/ai-tutor/language-arts" element={<LanguageArtsRedirect />} />
                  <Route path="/ai-tutor/reading-coach" element={<ReadingCoachRedirect />} />
                  
                  <Route path="/about" element={<Navigate to="/" replace />} />
                  <Route path="/account" element={<Account />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SubscriptionProvider>
          </AuthProvider>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
