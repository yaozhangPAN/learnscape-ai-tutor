
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

export const useVocabularyGameAssets = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('vocabulary-game')
          .list();

        if (error) {
          setError(error.message);
          return;
        }

        if (data) {
          const publicUrls = data.map(file => 
            supabase.storage.from('vocabulary-game').getPublicUrl(file.name).data.publicUrl
          );
          setAssets(publicUrls);
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return { assets, isLoading, error };
};
