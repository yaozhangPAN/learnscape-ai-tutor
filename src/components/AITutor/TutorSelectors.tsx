
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TutorSelectorsProps {
  subject: string;
  level: string;
  onSubjectChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

const subjects = [
  { value: "math", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "chinese", label: "Chinese" },
  { value: "science", label: "Science" }
];

const levels = [
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "primary-4", label: "Primary 4" },
  { value: "primary-5", label: "Primary 5" },
  { value: "primary-6", label: "Primary 6" }
];

export const TutorSelectors = ({
  subject,
  level,
  onSubjectChange,
  onLevelChange
}: TutorSelectorsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium block mb-1">Subject</label>
        <Select value={subject} onValueChange={onSubjectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium block mb-1">Level</label>
        <Select value={level} onValueChange={onLevelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
