
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ZoomCourseFiltersProps {
  selectedLevel: string;
  selectedSubject: string;
  onLevelChange: (level: string) => void;
  onSubjectChange: (subject: string) => void;
}

const ZoomCourseFilters = ({
  selectedLevel,
  selectedSubject,
  onLevelChange,
  onSubjectChange,
}: ZoomCourseFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Primary Level</h3>
          <Tabs defaultValue={selectedLevel} onValueChange={onLevelChange}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="p6">Primary 6</TabsTrigger>
              <TabsTrigger value="p5">Primary 5</TabsTrigger>
              <TabsTrigger value="all">All Levels</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Subject</h3>
          <Tabs defaultValue={selectedSubject} onValueChange={onSubjectChange}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="mathematics">Math</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="chinese">Chinese</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ZoomCourseFilters;

