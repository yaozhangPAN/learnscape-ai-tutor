
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Loader } from "lucide-react";

interface VideoAuthStatusProps {
  user: any;
  sessionData: any;
  isRefreshing: boolean;
  onRelogin: () => void;
  onRefreshSession: () => void;
}

const VideoAuthStatus = ({
  user,
  sessionData,
  isRefreshing,
  onRelogin,
  onRefreshSession
}: VideoAuthStatusProps) => {
  return (
    <div className="flex items-center space-x-2">
      {(user || sessionData?.session?.user) ? (
        <div className="text-sm text-green-600">
          已登录: {user?.email || sessionData?.session?.user?.email}
        </div>
      ) : (
        <div className="text-sm text-red-600">
          未检测到登录
        </div>
      )}
      <Button variant="outline" size="sm" onClick={onRelogin} className="flex items-center gap-1">
        <LogIn className="h-4 w-4" />
        重新登录
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefreshSession}
        disabled={isRefreshing}
        className="flex items-center gap-1"
      >
        {isRefreshing ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Loader className="h-4 w-4" />
        )}
        刷新会话
      </Button>
    </div>
  );
};

export default VideoAuthStatus;
