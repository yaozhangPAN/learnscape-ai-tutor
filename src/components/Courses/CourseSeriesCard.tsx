
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Eye, Clock, Video, Crown, BookOpen } from "lucide-react";
import { CourseSeries } from '@/types/course';
import { useI18n } from '@/contexts/I18nContext';

interface CourseSeriesCardProps {
  series: CourseSeries;
}

export const CourseSeriesCard = ({ series }: CourseSeriesCardProps) => {
  const { t, lang } = useI18n();

  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={series.image} 
          alt={lang === 'zh' ? series.titleZh || series.title : series.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {series.isPremium && (
          <div className="absolute top-2 right-2 bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </div>
        )}
        <div className="absolute top-2 left-2 bg-learnscape-blue text-white text-xs font-semibold px-2.5 py-1 rounded">
          {series.level.toUpperCase()} {series.subject}
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {lang === 'zh' ? series.titleZh || series.title : series.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lang === 'zh' ? series.descriptionZh || series.description : series.description}
        </p>
        <div className="flex flex-wrap gap-y-2 text-xs text-gray-500">
          <div className="flex items-center mr-4">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{lang === 'zh' ? series.durationZh || series.duration : series.duration}</span>
          </div>
          <div className="flex items-center mr-4">
            <Video className="h-3.5 w-3.5 mr-1" />
            <span>{series.courses?.length || 0} {t.VIDEO_TUTORIALS.COURSES}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-3.5 w-3.5 mr-1" />
            <span>{series.views} {t.VIDEO_TUTORIALS.VIEWS}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
        <div className="font-semibold text-learnscape-blue">
          {lang === 'zh' ? series.priceZh || series.price : series.price}
        </div>
      </CardFooter>
    </Card>
  );
};
