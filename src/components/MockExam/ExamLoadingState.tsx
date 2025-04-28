
import React from "react";
import { useI18n } from "@/contexts/I18nContext";

const ExamLoadingState = () => {
  const { t } = useI18n();
  // Use optional chaining to safely access translations
  const translations = t?.MOCK_EXAM ?? {};

  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-learnscape-blue mx-auto"></div>
        <p className="mt-4 text-lg">{translations.LOADING || "Loading..."}</p>
      </div>
    </div>
  );
};

export default ExamLoadingState;
