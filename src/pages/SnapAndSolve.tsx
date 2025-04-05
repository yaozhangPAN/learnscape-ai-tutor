
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image, X, Upload, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const SnapAndSolve = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera access
  const openCamera = async () => {
    setIsCameraOpen(true);
    setIsUsingCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
      setIsUsingCamera(false);
      setIsCameraOpen(false);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setImageFile(file);
            setImagePreview(canvas.toDataURL('image/jpeg'));
            
            // Stop camera stream
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
            
            setIsCameraOpen(false);
            setIsUsingCamera(false);
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  // Close camera
  const closeCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsCameraOpen(false);
    setIsUsingCamera(false);
  };

  // Clear selected image
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setSolution(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit image for processing
  const analyzeImage = () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please take a photo or upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress for demo purposes
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate AI solution generation (would be replaced with actual API call)
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Sample solution based on math problem
      const sampleSolution = `
        <h3>Step 1: Identify the Problem</h3>
        <p>This appears to be a quadratic equation in the form <strong>ax² + bx + c = 0</strong>, where a = 2, b = -7, and c = 3.</p>
        
        <h3>Step 2: Apply the Quadratic Formula</h3>
        <p>We can use the quadratic formula: <strong>x = (-b ± √(b² - 4ac)) / 2a</strong></p>
        <p>Substituting our values:</p>
        <p>x = (7 ± √(49 - 24)) / 4</p>
        <p>x = (7 ± √25) / 4</p>
        <p>x = (7 ± 5) / 4</p>
        
        <h3>Step 3: Calculate the Two Solutions</h3>
        <p>x₁ = (7 + 5) / 4 = 12/4 = 3</p>
        <p>x₂ = (7 - 5) / 4 = 2/4 = 0.5</p>
        
        <h3>Step 4: Verify the Solutions</h3>
        <p>Let's check x = 3:</p>
        <p>2(3)² - 7(3) + 3 = 2(9) - 21 + 3 = 18 - 21 + 3 = 0 ✓</p>
        
        <p>Let's check x = 0.5:</p>
        <p>2(0.5)² - 7(0.5) + 3 = 2(0.25) - 3.5 + 3 = 0.5 - 3.5 + 3 = 0 ✓</p>
        
        <h3>Answer</h3>
        <p>The solutions to 2x² - 7x + 3 = 0 are <strong>x = 3</strong> and <strong>x = 0.5</strong>.</p>
      `;
      
      setSolution(sampleSolution);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Solution is ready for you to review",
        variant: "success",
      });
    }, 3000);
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
            <h1 className="text-3xl font-bold text-learnscape-darkBlue">Snap & Solve</h1>
            <p className="text-gray-600 mt-1">Take a photo of your question to get step by step guidance for reaching solutions!</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue">Snap & Solve</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearImage} disabled={!imagePreview || isLoading}>
                  Clear
                </Button>
                <Button onClick={analyzeImage} disabled={!imagePreview || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Get Solution"
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-sm mb-2">Instructions</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Take a clear photo of your question</li>
                    <li>Make sure the text is readable</li>
                    <li>Include any relevant diagrams</li>
                    <li>Best for Math, Science, and English questions</li>
                  </ul>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center min-h-[300px] bg-gray-50 relative">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={imagePreview} 
                        alt="Question preview" 
                        className="max-h-[300px] mx-auto object-contain" 
                      />
                      <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1"
                        aria-label="Clear image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-4">
                          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Upload
                          </Button>
                          <Button onClick={openCamera} variant="outline" className="flex items-center gap-2">
                            <Camera className="h-5 w-5" />
                            Take Photo
                          </Button>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        <p className="text-sm text-gray-500">
                          Upload an image or take a photo of your question
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing image...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>
              
              <div>
                {solution ? (
                  <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none h-full overflow-y-auto max-h-[500px]">
                    <h3 className="text-lg font-semibold mb-4">Step-by-Step Solution</h3>
                    <div dangerouslySetInnerHTML={{ __html: solution }} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full border rounded-md p-6 bg-gray-50">
                    <div className="text-center text-gray-500">
                      <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-1">No Solution Yet</h3>
                      <p className="text-sm">
                        {isLoading 
                          ? "Analyzing your problem..."
                          : "Upload or take a photo of your question to get a step-by-step solution"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Camera Dialog */}
      <Dialog open={isCameraOpen} onOpenChange={(open) => !open && closeCamera()}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Take a Photo</DialogTitle>
            <DialogDescription>
              Position your question in the frame and take a clear photo
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center">
            {isUsingCamera && (
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-md">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-auto"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
            
            <div className="flex justify-center gap-4 mt-4">
              <DialogClose asChild>
                <Button variant="outline" onClick={closeCamera}>Cancel</Button>
              </DialogClose>
              <Button onClick={captureImage}>Capture</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SnapAndSolve;
