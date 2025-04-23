
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t.NOT_FOUND.MESSAGE}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t.NOT_FOUND.BACK_HOME}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
