
import React from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface ExamErrorStateProps {
  onRetry: () => void;
}

const ExamErrorState: React.FC<ExamErrorStateProps> = ({ onRetry }) => {
  const { t } = useI18n();
  const translations = t.MOCK_EXAM || {};

  return (
    <div className="text-center py-12">
      <p className="text-lg text-red-500 mb-4">{translations.ERROR_LOADING}</p>
      <Button onClick={onRetry}>{translations.RETRY}</Button>
    </div>
  );
};

export default ExamErrorState;
