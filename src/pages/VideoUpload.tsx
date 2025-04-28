import React, { useEffect, useState } from "react";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SupabaseConnectionChecker from "@/components/SupabaseConnectionChecker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, LogIn } from "lucide-react";

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

  const checkSupabaseConnection = () => {
    console.log("手动检查Supabase连接...");
    supabase.auth.getSession().then(({ data }) => {
      console.log("手动检查会话结果:", data);
      setSessionData(data);
      if (data.session) {
        toast.success("Supabase会话有效");
      } else {
        toast.error("未检测到有效的Supabase会话");
      }
    });
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

  const handleRelogin = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">上传课程视频</h1>
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
            <Button variant="outline" size="sm" onClick={handleRelogin} className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              重新登录
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshSession}
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
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>数据库连接状态</CardTitle>
            <CardDescription>检查与Supabase数据库的连接状态</CardDescription>
          </CardHeader>
          <CardContent>
            <SupabaseConnectionChecker className="mb-4" />
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm font-medium mb-2">会话信息:</p>
              <pre className="text-xs mt-2 overflow-auto max-h-40 p-2 bg-gray-100 rounded">
                {sessionData ? JSON.stringify(sessionData, null, 2) : "无会话数据"}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        {(user || sessionData?.session?.user) ? (
          <Card>
            <CardHeader>
              <CardTitle>视频上传</CardTitle>
              <CardDescription>上传课程视频文件</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoUploadStatus courseId="test-course" />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">无法加载上传功能</CardTitle>
              <CardDescription className="text-yellow-700">请确保您已成功登录系统</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => window.location.href = "/login"}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                前往登录
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
