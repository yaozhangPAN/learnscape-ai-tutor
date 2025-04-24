
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/question';
import { supabase } from '@/integrations/supabase/client';

const WrongQuestions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWrongQuestions = async () => {
      try {
        // For now, let's use mock data to illustrate the functionality
        const mockQuestions: Question[] = [
          {
            id: "1",
            title: "Chinese Grammar Question",
            content: {
              question: "以下哪个句子的语法结构正确？",
              answer: "我每天都去学校。"
            },
            subject: "Chinese",
            level: "Primary 5"
          },
          {
            id: "2",
            title: "Math Problem",
            content: {
              question: "If John has 5 apples and Mary has 3 more apples than John, how many apples do they have altogether?",
              answer: "13 apples"
            },
            subject: "Math",
            level: "Primary 4"
          },
          {
            id: "3",
            title: "English Vocabulary",
            content: {
              question: "What does 'ephemeral' mean?",
              answer: "Lasting for a very short time."
            },
            subject: "English",
            level: "Primary 6"
          }
        ];
        
        setQuestions(mockQuestions);
        setLoading(false);

        // In a real app, we would fetch data from the database
        // const { data, error } = await supabase
        //  .from('wrong_questions')
        //  .select('*')
        //  .eq('user_id', user.id);
        //
        // if (error) throw error;
        // setQuestions(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching wrong questions:", error);
        toast({
          title: "Error",
          description: "Failed to load wrong questions. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchWrongQuestions();
  }, [user, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">错题本 (Wrong Questions)</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : questions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {questions.map((question) => (
                <Card key={question.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-rose-50">
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Subject: {question.subject}</p>
                      <p className="text-sm text-gray-500">Level: {question.level}</p>
                    </div>
                    <p className="font-medium mb-2">{question.content.question}</p>
                    <div className="border-t pt-2 mt-4">
                      <p className="text-sm font-medium text-gray-900">Answer:</p>
                      <p className="text-sm text-gray-700">{question.content.answer}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No wrong questions yet</h3>
              <p className="text-gray-600 mb-6">
                Questions that you answer incorrectly will appear here for you to review later.
              </p>
              <Button onClick={() => navigate('/question-bank')}>Practice Questions</Button>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WrongQuestions;
