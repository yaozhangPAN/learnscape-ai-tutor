
import React from "react";
import { useI18n } from "@/contexts/I18nContext";

const ExamPageHeader = () => {
  const { t } = useI18n();
  // Set a default empty object with optional chaining to handle potential missing translations
  const translations = t.MOCK_EXAM || {};

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">
        {translations.TITLE || "Mock Exams"}
      </h1>
      <p className="text-gray-600">{translations.SUBTITLE || "Practice with real past papers and get instant feedback"}</p>
    </div>
  );
};

export default ExamPageHeader;
