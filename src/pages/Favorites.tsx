
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Question } from '@/types/question';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Define an interface for the details structure to help TypeScript understand it
interface QuestionActivityDetails {
  question_id: string;
  is_favorite: boolean;
  [key: string]: any; // Allow for other properties
}

const Favorites = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data: activities, error } = await supabase
          .from('user_activities_tracking')
          .select('details')
          .eq('user_id', user.id)
          .eq('activity_type', 'question_practice')
          .eq('details->is_favorite', true);

        if (error) throw error;

        // Extract unique question IDs with proper type casting
        const questionIds = activities
          ?.map(activity => {
            // Safely cast Json to our expected structure
            const details = activity.details as unknown as QuestionActivityDetails;
            return details?.question_id;
          })
          .filter(Boolean);

        const uniqueQuestionIds = [...new Set(questionIds)];

        if (uniqueQuestionIds.length > 0) {
          const { data: questionsData, error: questionsError } = await supabase
            .from('questions')
            .select('*')
            .in('id', uniqueQuestionIds);

          if (questionsError) throw questionsError;
          
          // Transform the data to match our Question interface
          const transformedQuestions: Question[] = questionsData?.map(q => {
            // Safely parse the content field
            const content = q.content as unknown as { question?: string; answer?: string } | null;
            
            return {
              id: q.id,
              title: q.title || '',
              content: {
                question: content?.question || '',
                answer: content?.answer
              },
              subject: q.subject || undefined,
              level: q.level || undefined,
              term: q.term || undefined
            };
          }) || [];
          
          setFavorites(transformedQuestions);
        } else {
          setFavorites([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load favorite questions. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate, toast]);

  const handleRemoveFromFavorites = async (id: string) => {
    try {
      // Update the activity in the database
      const { data, error } = await supabase
        .from('user_activities_tracking')
        .select('id, details')
        .eq('user_id', user?.id)
        .eq('activity_type', 'question_practice')
        .eq('details->question_id', id)
        .eq('details->is_favorite', true);

      if (error) throw error;

      if (data && data.length > 0) {
        // For each matching activity, update it
        for (const activity of data) {
          const activityDetails = activity.details as unknown as QuestionActivityDetails;
          
          // Create a new details object instead of trying to spread the original
          const updatedDetails = {
            ...Object.fromEntries(
              Object.entries(activityDetails as object)
            ),
            is_favorite: false
          };
          
          const { error: updateError } = await supabase
            .from('user_activities_tracking')
            .update({ details: updatedDetails })
            .eq('id', activity.id);

          if (updateError) throw updateError;
        }
      }

      // Update local state
      setFavorites(favorites.filter(fav => fav.id !== id));
      
      toast({
        title: "Success",
        description: "Question removed from favorites",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">收藏夹 (Favorites)</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((question) => (
                <Card key={question.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-amber-50 flex flex-row items-start justify-between">
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleRemoveFromFavorites(question.id)}
                    >
                      <Star className="h-4 w-4 text-amber-500" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Subject: {question.subject}</p>
                      <p className="text-sm text-gray-500">Level: {question.level}</p>
                    </div>
                    <p className="font-medium mb-2">{question.content.question}</p>
                    {question.content.answer && (
                      <div className="border-t pt-2 mt-4">
                        <p className="text-sm font-medium text-gray-900">Answer:</p>
                        <p className="text-sm text-gray-700">{question.content.answer}</p>
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => navigate(`/question-bank?id=${question.id}`)}
                      >
                        Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No favorite questions yet</h3>
              <p className="text-gray-600 mb-6">
                Save questions to your favorites to review them later.
              </p>
              <Button onClick={() => navigate('/question-bank')}>Browse Questions</Button>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
