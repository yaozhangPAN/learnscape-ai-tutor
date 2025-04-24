
import React, { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ImportCharacters = ({ onImportComplete }: { onImportComplete: () => void }) => {
  const [importing, setImporting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setValidationError(null);
    
    try {
      const data = await readExcelFile(file);
      
      // Validate data before importing
      const { validData, invalidRows } = validateCharacterData(data);
      
      if (invalidRows > 0) {
        setValidationError(`Excel 文件中有 ${invalidRows} 行数据无效。已跳过这些行。`);
      }
      
      if (validData.length === 0) {
        throw new Error("没有有效的数据可导入");
      }
      
      await importCharacters(validData);
      
      toast({
        title: "导入成功",
        description: `已成功导入 ${validData.length} 个汉字`,
        variant: "success"
      });
      
      onImportComplete();
    } catch (error) {
      console.error('Import error:', error);
      toast({
        variant: "destructive",
        title: "导入失败",
        description: error instanceof Error ? error.message : "导入数据时发生错误，请检查文件格式是否正确",
      });
    } finally {
      setImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const validateCharacterData = (data: any[]) => {
    const validData: any[] = [];
    let invalidRows = 0;

    data.forEach(row => {
      const character = row.character || row['汉字'];
      const grade = parseInt(row.grade || row['年级']);
      const lessonNumber = parseInt(row.lesson_number || row['课次']);
      
      // Check if required fields are present and valid
      if (character && !isNaN(grade) && !isNaN(lessonNumber)) {
        validData.push({
          character: character,
          grade: grade,
          lesson_number: lessonNumber,
          can_read: row.can_read !== false && row['识读'] !== false,
          can_write: row.can_write !== false && row['识写'] !== false,
        });
      } else {
        invalidRows++;
      }
    });

    return { validData, invalidRows };
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

  const importCharacters = async (characters: any[]) => {
    if (characters.length === 0) return;

    const { error } = await supabase
      .from('chinese_characters')
      .insert(characters);

    if (error) throw error;
  };

  return (
    <div className="space-y-4">
      {validationError && (
        <Alert variant="destructive">
          <AlertTitle>导入警告</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      
      <div>
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
        <p className="mt-2 text-sm text-gray-500">
          请确保Excel文件包含以下列: 汉字, 年级, 课次, 识读(可选), 识写(可选)
        </p>
      </div>
    </div>
  );
};

export default ImportCharacters;
