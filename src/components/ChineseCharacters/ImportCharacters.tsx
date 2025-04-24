
import React, { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';

const ImportCharacters = ({ onImportComplete }: { onImportComplete: () => void }) => {
  const [importing, setImporting] = useState(false);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await readExcelFile(file);
      await importCharacters(data);
      toast({
        title: "导入成功",
        description: `已成功导入 ${data.length} 个汉字`,
      });
      onImportComplete();
    } catch (error) {
      console.error('Import error:', error);
      toast({
        variant: "destructive",
        title: "导入失败",
        description: "导入数据时发生错误，请检查文件格式是否正确",
      });
    } finally {
      setImporting(false);
    }
  };

  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const importCharacters = async (data: any[]) => {
    const characters = data.map(row => ({
      character: row.character || row['汉字'],
      grade: parseInt(row.grade || row['年级']),
      lesson_number: parseInt(row.lesson_number || row['课次']),
      can_read: row.can_read !== false && row['识读'] !== false,
      can_write: row.can_write !== false && row['识写'] !== false,
    }));

    const { error } = await supabase
      .from('chinese_characters')
      .insert(characters);

    if (error) throw error;
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
        id="excel-upload"
        disabled={importing}
      />
      <label htmlFor="excel-upload">
        <Button variant="outline" disabled={importing} asChild>
          <span>{importing ? '导入中...' : '导入 Excel'}</span>
        </Button>
      </label>
    </div>
  );
};

export default ImportCharacters;
