
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { Question } from '@/types/question';
import { supabase } from '@/integrations/supabase/client';

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
        // For now, let's use mock data to illustrate the functionality
        const mockFavorites: Question[] = [
          {
            id: "1",
            title: "Chinese Comprehension",
            content: {
              question: "阅读下面的段落，然后回答问题：中国是世界上历史最悠久的国家之一...",
              answer: "中国有着悠久的历史和丰富的文化。"
            },
            subject: "Chinese",
            level: "Primary 6"
          },
          {
            id: "2",
            title: "Science Experiment",
            content: {
              question: "What happens when you mix vinegar and baking soda?",
              answer: "A chemical reaction occurs producing carbon dioxide gas, making it bubble and fizz."
            },
            subject: "Science",
            level: "Primary 5"
          },
          {
            id: "3",
            title: "English Grammar",
            content: {
              question: "Identify the correct sentence:",
              answer: "She doesn't like coffee, nor does she like tea."
            },
            subject: "English",
            level: "Primary 6"
          }
        ];
        
        setFavorites(mockFavorites);
        setLoading(false);

        // In a real app, we would fetch data from the database
        // const { data, error } = await supabase
        //  .from('favorite_questions')
        //  .select('*')
        //  .eq('user_id', user.id);
        //
        // if (error) throw error;
        // setFavorites(data);
        // setLoading(false);
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

  const handleRemoveFromFavorites = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast({
      title: "Question removed",
      description: "Question removed from favorites",
    });
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
                    <div className="border-t pt-2 mt-4">
                      <p className="text-sm font-medium text-gray-900">Answer:</p>
                      <p className="text-sm text-gray-700">{question.content.answer}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">Practice</Button>
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
