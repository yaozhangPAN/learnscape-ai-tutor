
import React from "react";
import { useI18n } from "@/contexts/I18nContext";

const ExamPageHeader = () => {
  const { t } = useI18n();
  const translations = t.MOCK_EXAM || {};

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-learnscape-darkBlue mb-2">
        {translations.TITLE}
      </h1>
      <p className="text-gray-600">{translations.SUBTITLE}</p>
    </div>
  );
};

export default ExamPageHeader;
