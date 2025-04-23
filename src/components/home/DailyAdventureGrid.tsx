
import React from "react";
import DailyAdventure from "./DailyAdventure";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  to: string;
  className: string;
  style: string;
  desc: React.ReactNode;
  // 新增支持 xp, icon 等，兼容主页传值
  title?: string;
  xpText?: string;
  xpBg?: string;
  iconImg?: string;
}

const DailyAdventureGrid: React.FC<Props> = ({
  to,
  className,
  style,
  desc,
  title,
  xpText,
  xpBg,
  iconImg
}) => {
  const { t } = useI18n();
  return (
    <div className="max-w-7xl w-full mx-auto mb-4">
      <DailyAdventure
        to={to}
        className={className}
        style="bg-[#F7941D]"
        title={title || t.DAILY_PLAN.TITLE}
        desc={desc}
        xpText={xpText || t.DAILY_PLAN.XP}
        xpBg={xpBg}
        iconImg={iconImg}
      />
    </div>
  );
};

export default DailyAdventureGrid;

