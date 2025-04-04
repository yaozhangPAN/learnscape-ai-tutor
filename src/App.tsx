
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MockExam from "./pages/MockExam";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import QuestionBank from "./pages/QuestionBank";
import Leaderboard from "./pages/Leaderboard";
import Worksheets from "./pages/Worksheets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mock-exam" element={<MockExam />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/worksheets" element={<Worksheets />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
