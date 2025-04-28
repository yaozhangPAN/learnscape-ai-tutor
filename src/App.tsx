
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionProvider";
import { useState, useEffect } from "react";
import { trackUserBehavior } from "@/utils/behaviorTracker";
import Index from "./pages/Index";
import Login from "./pages/Login";
import OnlineExam from "./components/ExamTaking/OnlineExam";
import Courses from "./pages/Courses";
import Worksheets from "./pages/Worksheets";
import Referral from "./pages/Referral";
import AITutor from "./pages/AITutor";
import WritingCoach from "./pages/WritingCoach";
import OralExamPractice from "./pages/OralExamPractice";
import DictationPractice from "./pages/DictationPractice";
import TutorMe from "./pages/TutorMe";
import ErrorAnalysis from "./pages/ErrorAnalysis";
import SnapAndSolve from "./pages/SnapAndSolve";
import ZoomCourses from "./pages/ZoomCourses";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import PaymentVerification from "./pages/PaymentVerification";
import VocabularyBuilder from "./pages/VocabularyBuilder";
import LanguageArtsRedirect from "./components/LanguageArtsRedirect";
import ReadingCoachRedirect from "./components/ReadingCoachRedirect";
import CourseDetails from "./pages/CourseDetails";
import OralExamRedirect from "./components/AITutor/OralExamRedirect";
import { I18nProvider } from "@/contexts/I18nContext";
import Account from "./pages/Account";
import VideoUpload from "./pages/VideoUpload";
import CourseSeries from "./pages/CourseSeries";

const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackUserBehavior('page_view', {
      pageUrl: location.pathname,
      actionDetails: {
        path: location.pathname,
        search: location.search,
        hash: location.hash
      }
    });
  }, [location]);
  
  return null;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <BrowserRouter>
            <AuthProvider>
              <SubscriptionProvider>
                <Toaster />
                <Sonner />
                <RouteTracker />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Login />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-canceled" element={<PaymentCanceled />} />
                  <Route path="/payment-verification" element={<PaymentVerification />} />
                  
                  <Route path="/video-tutorials" element={<Courses />} />
                  <Route path="/take-exam/:examId" element={<OnlineExam />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/series/:seriesId" element={<CourseSeries />} />
                  <Route path="/courses/:courseId" element={<CourseDetails />} />
                  <Route path="/worksheets" element={<Worksheets />} />
                  <Route path="/referral" element={<Referral />} />
                  <Route path="/ai-tutor" element={<AITutor />} />
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
                  
                  <Route path="/video-upload" element={<VideoUpload />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SubscriptionProvider>
            </AuthProvider>
          </BrowserRouter>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
