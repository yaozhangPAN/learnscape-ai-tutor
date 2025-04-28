
import React from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface ExamErrorStateProps {
  onRetry: () => void;
}

const ExamErrorState: React.FC<ExamErrorStateProps> = ({ onRetry }) => {
  const { t } = useI18n();
  // Use optional chaining to safely access translations
  const translations = t?.MOCK_EXAM ?? {};

  return (
    <div className="text-center py-12">
      <p className="text-lg text-red-500 mb-4">
        {(typeof translations === 'object' && 'ERROR_LOADING' in translations 
          ? translations.ERROR_LOADING as React.ReactNode
          : "Error loading exams")}
      </p>
      <Button onClick={onRetry}>
        {(typeof translations === 'object' && 'RETRY' in translations 
          ? translations.RETRY as React.ReactNode
          : "Retry")}
      </Button>
    </div>
  );
};

export default ExamErrorState;
