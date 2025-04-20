
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface CapyzenCommentProps {
  feedback: string;
  onForwardToChat?: () => void;
}

export const CapyzenComment: React.FC<CapyzenCommentProps> = ({ feedback, onForwardToChat }) => {
  return (
    <Card className="flex items-start p-4 gap-4 bg-blue-50 border-blue-200 mt-2 shadow-sm rounded-xl">
      <Avatar className="w-10 h-10 mt-1 flex-shrink-0">
        <AvatarImage src="/lovable-uploads/95142e5e-0a24-4687-a2d3-c0eb68cdb485.png" alt="Capyzen" />
      </Avatar>
      <CardContent className="p-0 flex-1">
        <div className="text-[15px] leading-relaxed text-gray-900 whitespace-pre-line">
          {feedback}
        </div>
        {onForwardToChat && (
          <button
            className="mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200"
            onClick={onForwardToChat}
            type="button"
          >
            转发到AI对话继续咨询
          </button>
        )}
      </CardContent>
    </Card>
  );
};
