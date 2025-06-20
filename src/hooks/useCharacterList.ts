
import { useEffect, useState } from 'react';
import { useSupabase } from './useSupabase';

interface Character {
  id: string;
  character: string;
  grade: string;
  lesson_number: string;
  can_read: boolean;
  can_write: boolean;
}

export const useCharacterList = (
  grade: string,
  lessonNumber: string,
  canRead: boolean,
  canWrite: boolean
) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      console.log('Fetching with filters:', { grade, lessonNumber, canRead, canWrite });
      
      let query = supabase.from('chinese_characters').select('*');

      if (grade) {
        query = query.eq('grade', grade);
      }
      
      if (lessonNumber) {
        query = query.eq('lesson_number', lessonNumber);
      }
      
      // Only apply boolean filters when they have true/false values
      if (canRead === true || canRead === false) {
        query = query.eq('can_read', canRead);
      }
      
      if (canWrite === true || canWrite === false) {
        query = query.eq('can_write', canWrite);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
      } else {
        console.log('Fetched characters:', data);
        setCharacters(data || []);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [grade, lessonNumber, canRead, canWrite, supabase]);

  return { characters, loading };
};
