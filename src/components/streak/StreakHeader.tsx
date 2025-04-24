
import { useI18n } from "@/contexts/I18nContext";

const StreakHeader = () => {
  const { t } = useI18n();
  
  return (
    <div className="text-center mb-4">
      <h1 className="text-3xl font-bold" style={{ color: "#2F5530", letterSpacing: "0.03em" }}>
        {t.STREAK.TITLE}
      </h1>
    </div>
  );
};

export default StreakHeader;
