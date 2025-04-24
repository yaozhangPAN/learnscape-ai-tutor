
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIModelSelectorProps {
  isFireball: boolean;
  onModelChange: (value: string) => void;
}

export const AIModelSelector = ({ isFireball, onModelChange }: AIModelSelectorProps) => {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">AI 助手</label>
      <Select value={isFireball ? "fireball" : "default"} onValueChange={(v) => onModelChange(v)}>
        <SelectTrigger>
          <SelectValue placeholder="选择AI助手" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fireball">小火苗 - 苏格拉底式教学</SelectItem>
          <SelectItem value="default">通用AI导师</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
