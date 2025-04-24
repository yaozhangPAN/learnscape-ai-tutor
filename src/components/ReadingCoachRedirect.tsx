
import { BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ReadingCoachRedirect = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 text-2xl font-bold text-learnscape-darkBlue">
          <BookOpen className="h-8 w-8" />
          <h1>听写助手</h1>
        </div>
        <Card className="p-6">
          <div className="text-center text-gray-500">
            请开始听写练习...
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReadingCoachRedirect;
