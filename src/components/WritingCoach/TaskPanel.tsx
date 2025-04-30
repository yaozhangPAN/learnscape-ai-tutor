
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/I18nContext";

interface TaskPanelProps {
  title?: string;
  prompt?: string;
  gradeLevel?: string;
  genre?: string;
  wordLimit?: number;
  imageUrl?: string;
}

const TaskPanel = ({ title, prompt, gradeLevel, genre, wordLimit, imageUrl }: TaskPanelProps) => {
  const { t, lang } = useI18n();

  // Convert grade level to display text
  const getGradeLevel = (grade?: string) => {
    switch(grade) {
      case 'grade_3': return lang === 'zh' ? '小学三年级' : 'Grade 3';
      case 'grade_4': return lang === 'zh' ? '小学四年级' : 'Grade 4';
      case 'grade_5': return lang === 'zh' ? '小学五年级' : 'Grade 5';
      case 'grade_6': return lang === 'zh' ? '小学六年级' : 'Grade 6';
      default: return '';
    }
  };

  // Convert genre to display text
  const getGenreText = (genre?: string) => {
    switch(genre) {
      case 'picture_composition': return lang === 'zh' ? '看图写作' : 'Picture Composition';
      case 'narrative': return lang === 'zh' ? '记叙文' : 'Narrative';
      case 'descriptive': return lang === 'zh' ? '说明文' : 'Descriptive';
      default: return '';
    }
  };

  return (
    <div className="h-full p-5 bg-white rounded-lg shadow border border-gray-100 overflow-y-auto">
      <Card className="mb-4 border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl text-gray-800">
            {lang === 'zh' ? '📋 作文题目' : '📋 Assignment'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 space-y-4">
          {title && (
            <div>
              <h3 className="font-medium text-gray-800">
                {lang === 'zh' ? '标题:' : 'Title:'}
              </h3>
              <p className="mt-1 text-gray-600">{title}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            {gradeLevel && (
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {lang === 'zh' ? '年级:' : 'Grade:'}
                </h3>
                <p className="text-gray-800">{getGradeLevel(gradeLevel)}</p>
              </div>
            )}
            
            {genre && (
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {lang === 'zh' ? '类型:' : 'Type:'}
                </h3>
                <p className="text-gray-800">{getGenreText(genre)}</p>
              </div>
            )}
          </div>
          
          {wordLimit && (
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                {lang === 'zh' ? '字数要求:' : 'Word Count:'}
              </h3>
              <p className="text-gray-800">{lang === 'zh' ? `约 ${wordLimit} 字` : `About ${wordLimit} words`}</p>
            </div>
          )}
          
          {prompt && (
            <div>
              <h3 className="font-medium text-gray-800">
                {lang === 'zh' ? '题目要求:' : 'Requirements:'}
              </h3>
              <p className="mt-1 text-gray-600 whitespace-pre-line">{prompt}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {imageUrl && (
        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-lg text-gray-800">
              {lang === 'zh' ? '📷 作文图片' : '📷 Assignment Image'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <img 
                src={imageUrl} 
                alt={lang === 'zh' ? '作文题目图片' : 'Assignment image'}
                className="w-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskPanel;
