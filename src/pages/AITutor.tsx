
import { useState } from "react";
import { Pen, Mic, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WritingCoach from "@/components/AITutor/WritingCoach";
import OralExamPractice from "@/components/AITutor/OralExamPractice";
import TutorMe from "@/components/AITutor/TutorMe";

const AITutor = () => {
  const [activeTab, setActiveTab] = useState("writing-coach");
  
  const tutorOptions = [
    {
      id: "writing-coach",
      title: "Writing Coach",
      icon: <Pen className="h-8 w-8 text-learnscape-blue" />,
      description: "Improve your writing skills with personalized feedback and guidance.",
      component: <WritingCoach />
    },
    {
      id: "oral-exam",
      title: "Oral Exam Practice",
      icon: <Mic className="h-8 w-8 text-learnscape-purple" />,
      description: "Practice your speaking skills and prepare for oral examinations.",
      component: <OralExamPractice />
    },
    {
      id: "tutor-me",
      title: "Tutor Me",
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: "Get personalized help with any subject or concept you're struggling with.",
      component: <TutorMe />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-learnscape-darkBlue mb-4">
              AI Tutor
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get personalized help with your studies using our advanced AI tutoring system.
              Choose from one of our specialized tutoring options below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tutorOptions.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  activeTab === option.id ? 'border-learnscape-blue' : 'border-transparent'
                }`}
                onClick={() => setActiveTab(option.id)}
              >
                <CardHeader className="flex flex-col items-center text-center pb-2">
                  <div className="mb-2 p-3 rounded-full bg-gray-100">
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs defaultValue="writing-coach" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                {tutorOptions.map((option) => (
                  <TabsTrigger key={option.id} value={option.id}>
                    {option.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tutorOptions.map((option) => (
                <TabsContent key={option.id} value={option.id}>
                  {option.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITutor;
