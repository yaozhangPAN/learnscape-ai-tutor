
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface TutorOptionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  path: string;
  onClick?: () => void;
  emoji: string;
}

const TutorOptionCard: React.FC<TutorOptionProps> = ({
  title,
  subtitle,
  icon,
  color,
  description,
  path,
  onClick,
  emoji
}) => {
  const { t } = useI18n();
  const CardWrapper = path === "#" ? "div" : Link;
  const wrapperProps = path === "#" ? { onClick } : { to: path };

  return (
    <CardWrapper {...wrapperProps} className="no-underline cursor-pointer">
      <Card
        className="rounded-3xl shadow-xl h-full overflow-hidden border-0 card-hover transition-transform"
        style={{
          background: color,
          boxShadow: "0 3px 16px 0 rgba(47,85,48,0.07)",
          border: "2px solid #E6DFBA",
        }}
      >
        <CardHeader className="flex flex-col items-center text-center pb-2 relative bg-transparent">
          <div className="mb-2">
            <img
              src={icon}
              alt={title}
              className="w-20 h-20 rounded-full shadow-md border-4 border-white object-cover drop-shadow-xl bg-white"
              draggable="false"
            />
          </div>
          <CardTitle
            className="text-xl md:text-2xl font-bold flex items-center group-hover:tracking-wide"
            style={{ color: "#2F5530" }}
          >
            {title}
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce-slow">
              {emoji}
            </span>
          </CardTitle>
          <div
            className="text-xs font-medium tracking-widest mt-1 mb-0.5"
            style={{ color: "#8D6663" }}
          >
            {subtitle}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription
            className="text-center text-base font-medium min-h-[62px]"
            style={{
              color: "#4E342E",
              background: "rgba(255,255,255,0.07)",
              borderRadius: 16,
              lineHeight: 1.5
            }}
          >
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center mt-2">
          <Button
            variant="ghost"
            className="rounded-lg shadow px-6 py-2 font-semibold"
            style={{
              background: "#2F5530",
              color: "#fff",
              fontWeight: 700
            }}
          >
            {t.AI_TUTOR.GO} {title}
          </Button>
        </CardFooter>
      </Card>
    </CardWrapper>
  );
};

export default TutorOptionCard;
