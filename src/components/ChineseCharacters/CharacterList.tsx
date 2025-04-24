import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ImportCharacters from './ImportCharacters';

interface ChineseCharacter {
  id: string;
  character: string;
  grade: number;
  lesson_number: number;
  can_read: boolean;
  can_write: boolean;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<ChineseCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const { data, error } = await supabase
        .from('chinese_characters')
        .select('*')
        .order('grade', { ascending: true })
        .order('lesson_number', { ascending: true });

      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>汉字列表</CardTitle>
      </CardHeader>
      <CardContent>
        <ImportCharacters onImportComplete={fetchCharacters} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>汉字</TableHead>
              <TableHead>年级</TableHead>
              <TableHead>课次</TableHead>
              <TableHead>识读</TableHead>
              <TableHead>识写</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters.map((char) => (
              <TableRow key={char.id}>
                <TableCell className="font-medium">{char.character}</TableCell>
                <TableCell>{char.grade}</TableCell>
                <TableCell>{char.lesson_number}</TableCell>
                <TableCell>{char.can_read ? '是' : '否'}</TableCell>
                <TableCell>{char.can_write ? '是' : '否'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CharacterList;
