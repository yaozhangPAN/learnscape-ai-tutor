
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Subject {
  name: string;
  progress: number;
}

interface LearningProgressProps {
  subjects: Subject[];
}

const progressColors = {
  high: "bg-[#4ABA79]",
  mid: "bg-[#f6c244]",
  low: "bg-[#e47069]"
};

const LearningProgress = ({ subjects }: LearningProgressProps) => {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-3xl">
      <CardHeader className="rounded-t-3xl bg-[#e5deff] p-6 border-b border-[#ededfa]">
        <CardTitle className="text-lg font-bold text-[#1E5B3A]">Learning Progress</CardTitle>
        <CardDescription className="text-[#4ABA79] font-medium">
          Your Performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 py-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-[#4ABA79]">
                <span>{subject.name}</span>
                <span>{subject.progress}%</span>
              </div>
              <div className="h-3 bg-[#fbed96] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    subject.progress > 65 
                      ? progressColors.high
                      : subject.progress > 40 
                        ? progressColors.mid
                        : progressColors.low
                  }`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
