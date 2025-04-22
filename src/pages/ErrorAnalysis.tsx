import { useState } from "react";
import { useRequirePremium } from "@/hooks/useRequirePremium";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileSearch, AlertTriangle, ThumbsUp, CheckCircle2, ArrowLeft } from "lucide-react";
import QuestionModule from "@/components/QuestionModule";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const ErrorAnalysis = () => {
  useRequirePremium();

  const [fileContent, setFileContent] = useState("");
  const [subject, setSubject] = useState("math");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "english", label: "English" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" }
  ];

  const handleSubmit = () => {
    if (!fileContent.trim()) {
      toast({
        title: "Empty Input",
        description: "Please upload an image or enter your exam paper content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analyzing the exam paper
    setTimeout(() => {
      // Example analysis (in a real app, this would come from an AI API)
      const exampleAnalysis = `
        <h3>Error Analysis Summary</h3>
        <p>After reviewing your work, here are the key findings:</p>
        
        <div class="mt-4 mb-4">
          <h4 class="font-medium text-red-600">Common Errors Identified</h4>
          <ul class="list-disc pl-5 mt-2 space-y-2">
            <li>Confusion between area and perimeter formulas in questions 3 and 7</li>
            <li>Incorrect application of BODMAS rule in question 5</li>
            <li>Calculation errors in long division problems (questions 8 and 12)</li>
            <li>Misunderstanding of fraction addition concepts in question 10</li>
          </ul>
        </div>
        
        <div class="mt-4 mb-4">
          <h4 class="font-medium text-green-600">Strengths</h4>
          <ul class="list-disc pl-5 mt-2 space-y-2">
            <li>Strong understanding of multiplication concepts</li>
            <li>Good application of geometry principles in shape problems</li>
            <li>Clear working shown for most problems</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
          <h4 class="font-medium">Recommended Focus Areas</h4>
          <p class="mt-2">Based on your error patterns, we recommend focusing on:</p>
          <ol class="list-decimal pl-5 mt-2 space-y-1">
            <li>Area and perimeter formulas - Practice distinguishing when to use each</li>
            <li>Order of operations (BODMAS) - Review the correct sequence</li>
            <li>Long division technique - Practice the step-by-step process</li>
            <li>Fraction operations - Review addition with unlike denominators</li>
          </ol>
        </div>
        
        <div class="mt-4">
          <h4 class="font-medium">Practice Recommendations</h4>
          <p>We've prepared specialized practice exercises to address these areas.</p>
        </div>
      `;
      
      setAnalysisResult(exampleAnalysis);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, you would process the file
      // For now, just set a placeholder message
      setFileContent(`Uploaded file: ${file.name}`);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleClear = () => {
    setFileContent("");
    setAnalysisResult("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to AI Tutor
            </Link>
            <h1 className="text-3xl font-bold text-learnscape-darkBlue">Error Analysis</h1>
            <p className="text-gray-600 mt-1">Analyze your mistakes and learn how to avoid them in future examinations.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue flex items-center">
                <FileSearch className="mr-2 h-6 w-6 text-red-500" />
                Error Analysis
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClear}>Clear</Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze Errors"}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1 space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Upload Exam Paper</label>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image or scan of your exam paper
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <QuestionModule 
                    title="Common Errors" 
                    description="View your most frequent mistakes"
                    icon={<AlertTriangle className="h-4 w-4 text-white" />}
                    count={12}
                    color="bg-red-100 text-red-600"
                  />
                  
                  <QuestionModule 
                    title="Strengths" 
                    description="Areas where you excel"
                    icon={<ThumbsUp className="h-4 w-4 text-white" />}
                    count={8}
                    color="bg-green-100 text-green-600"
                  />
                </div>
              </div>
              
              <div className="md:col-span-3 space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Exam Paper Content</label>
                  <Textarea 
                    placeholder="Alternatively, you can paste the content of your exam paper here..."
                    className="min-h-[150px] resize-none"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                  />
                </div>
                
                {analysisResult && (
                  <div>
                    <label className="text-sm font-medium block mb-1">Error Analysis Results</label>
                    <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: analysisResult }} />
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="mr-2">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Generate Practice Exercises
                      </Button>
                      <Button variant="outline">
                        Save Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorAnalysis;
