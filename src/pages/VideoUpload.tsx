
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { VideoFileManager } from "@/components/VideoUpload/VideoFileManager";
import VideoAuthStatus from "@/components/VideoUpload/VideoAuthStatus";
import ConnectionStatusCard from "@/components/VideoUpload/ConnectionStatusCard";
import AuthRequiredCard from "@/components/VideoUpload/AuthRequiredCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const VideoUpload = () => {
  const { user, session, isLoading, refreshSession } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [checkCount, setCheckCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasShownLoginToast, setHasShownLoginToast] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("检查认证状态：", { user, session, isLoading });
      
      try {
        const { data } = await supabase.auth.getSession();
        setSessionData(data);
        console.log("Supabase会话状态：", data);
        
        if (data.session && !hasShownLoginToast) {
          toast.success(`用户 ${data.session.user.email} 已登录`);
          setHasShownLoginToast(true);
        } else if (!data.session && checkCount < 3) {
          toast.error("获取不到用户会话，请尝试重新登录");
        }
      } catch (err) {
        console.error("检查认证状态出错:", err);
        if (!hasShownLoginToast) {
          toast.error("检查认证状态失败");
        }
      } finally {
        setAuthChecked(true);
        setCheckCount(prev => prev + 1);
      }
    };
    
    if (!hasShownLoginToast && (!authChecked || checkCount === 0)) {
      checkAuth();
    }
    
    const timeoutId = setTimeout(() => {
      if (!authChecked && isLoading) {
        checkAuth();
      }
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, [user, session, isLoading, authChecked, checkCount, hasShownLoginToast]);

  const handleRefreshSession = async () => {
    setIsRefreshing(true);
    try {
      const newSession = await refreshSession();
      if (newSession) {
        setSessionData({ session: newSession });
        toast.success("会话已刷新");
      } else {
        toast.error("刷新会话失败，请重新登录");
      }
    } catch (err) {
      console.error("刷新会话出错:", err);
      toast.error("刷新会话失败");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRelogin = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (isLoading && !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>正在验证身份</CardTitle>
            <CardDescription>请稍候，正在与服务器建立连接...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground mb-4">
              如果长时间未响应，可能需要重新登录或检查网络连接
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleRefreshSession}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    刷新中...
                  </>
                ) : (
                  <>
                    <Loader className="mr-2 h-4 w-4" />
                    刷新会话
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setAuthChecked(true)}
              >
                跳过验证
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authChecked && !user && !sessionData?.session) {
    toast.error("需要登录，请先登录后再访问此页面");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">上传课程视频</h1>
          <VideoAuthStatus
            user={user}
            sessionData={sessionData}
            isRefreshing={isRefreshing}
            onRelogin={handleRelogin}
            onRefreshSession={handleRefreshSession}
          />
        </div>
        
        <ConnectionStatusCard />
        
        {(user || sessionData?.session?.user) ? (
          <>
            <VideoFileManager courseId="test-course" />
            <Card>
              <CardHeader>
                <CardTitle>视频上传</CardTitle>
                <CardDescription>上传课程视频文件</CardDescription>
              </CardHeader>
              <CardContent>
                <VideoUploadStatus courseId="test-course" />
              </CardContent>
            </Card>
          </>
        ) : (
          <AuthRequiredCard />
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
