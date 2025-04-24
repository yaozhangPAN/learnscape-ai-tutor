
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import QuestionViewer from "@/components/QuestionBank/QuestionViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionDetails {
  question_id: string;
  is_favorite: boolean;
}

const Favorites = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      
      try {
        const { data: activities, error } = await supabase
          .from('user_activities_tracking')
          .select('details')
          .eq('user_id', user.id)
          .eq('activity_type', 'question_practice')
          .eq('details->is_favorite', true);

        if (error) throw error;

        const questionIds = activities
          ?.map(activity => {
            // Ensure we're properly handling the details
            const details = activity.details as unknown as QuestionDetails;
            return details?.question_id;
          })
          .filter(Boolean);

        if (questionIds && questionIds.length > 0) {
          const { data: questionsData, error: questionsError } = await supabase
            .from('questions')
            .select('*')
            .in('id', questionIds);

          if (questionsError) throw questionsError;
          setQuestions(questionsData || []);
        }
      } catch (error) {
        console.error('Error fetching favorite questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-learnscape-darkBlue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Favorite Questions</h1>
          <p className="text-lg">Review your saved questions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-learnscape-blue"></div>
            </div>
          ) : questions.length > 0 ? (
            <div className="grid gap-4">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                        <div className="space-x-2">
                          <span className="inline-block px-2 py-1 text-sm bg-gray-100 rounded">
                            {question.subject}
                          </span>
                          <span className="inline-block px-2 py-1 text-sm bg-gray-100 rounded">
                            {question.level}
                          </span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedQuestion(question);
                          setDialogOpen(true);
                        }}
                        className="bg-learnscape-blue text-white"
                      >
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No favorite questions yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Questions you mark as favorite will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      <QuestionViewer
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        question={selectedQuestion}
      />
    </div>
  );
};

export default Favorites;
