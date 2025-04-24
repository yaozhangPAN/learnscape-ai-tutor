
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DictationFiltersProps {
  grade: string;
  lessonNumber: string;
  canRead: boolean;
  canWrite: boolean;
  onGradeChange: (value: string) => void;
  onLessonChange: (value: string) => void;
  onReadChange: (value: string) => void;
  onWriteChange: (value: string) => void;
}

// Using exact values from database
const gradeOptions = ["一", "二", "三", "四", "五", "六"];
const yesNoOptions = [
  { value: "true", label: "是" },
  { value: "false", label: "否" },
];

export const DictationFilters = ({
  grade,
  lessonNumber,
  canRead,
  canWrite,
  onGradeChange,
  onLessonChange,
  onReadChange,
  onWriteChange,
}: DictationFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium mb-1 block">年级</label>
        <Select value={grade} onValueChange={onGradeChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择年级" />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}年级
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">课次</label>
        <Select value={lessonNumber} onValueChange={onLessonChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择课次" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10)].map((_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                第{i + 1}课
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">识读</label>
        <Select value={String(canRead)} onValueChange={onReadChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择识读状态" />
          </SelectTrigger>
          <SelectContent>
            {yesNoOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">识写</label>
        <Select value={String(canWrite)} onValueChange={onWriteChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择识写状态" />
          </SelectTrigger>
          <SelectContent>
            {yesNoOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
