
import React, { useEffect, useState } from "react";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SupabaseConnectionChecker from "@/components/SupabaseConnectionChecker";

const VideoUpload = () => {
  const { user, session, isLoading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    // 检查当前的认证状态并记录
    const checkAuth = async () => {
      console.log("检查认证状态：", { user, session, isLoading });
      
      // 获取当前会话状态
      const { data } = await supabase.auth.getSession();
      setSessionData(data);
      console.log("Supabase会话状态：", data);
      
      if (data.session) {
        toast.success(`用户 ${data.session.user.email} 已登录`);
      } else if (checkCount < 3) {
        // 如果多次检查后仍无会话，显示错误通知
        toast.error("获取不到用户会话，请尝试重新登录");
      }
      
      setAuthChecked(true);
      setCheckCount(prev => prev + 1);
    };
    
    // 如果身份验证加载超过5秒，强制检查一次
    const timeoutId = setTimeout(() => {
      if (!authChecked && isLoading) {
        checkAuth();
      }
    }, 5000);
    
    if (!isLoading || checkCount === 0) {
      checkAuth();
    }
    
    return () => clearTimeout(timeoutId);
  }, [user, session, isLoading, authChecked, checkCount]);

  // 检查Supabase连接状态
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

  // 显示加载状态
  if (isLoading && !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">正在验证身份...</p>
          <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setAuthChecked(true)}
          >
            跳过验证
          </Button>
        </div>
      </div>
    );
  }

  // 认证检查完成但无用户，重定向到登录
  if (authChecked && !user && !sessionData?.session) {
    toast.error("需要登录，请先登录后再访问此页面");
    return <Navigate to="/login" replace />;
  }

  // 重新登录按钮
  const handleRelogin = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
            <Button variant="outline" size="sm" onClick={handleRelogin}>
              重新登录
            </Button>
            <Button variant="outline" size="sm" onClick={checkSupabaseConnection}>
              检查连接
            </Button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">数据库连接状态</h2>
          <SupabaseConnectionChecker className="mb-2" />
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">会话信息:</p>
            <pre className="text-xs mt-2 overflow-auto max-h-40">
              {sessionData ? JSON.stringify(sessionData, null, 2) : "无会话数据"}
            </pre>
          </div>
        </div>
        
        {(user || sessionData?.session?.user) ? (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <VideoUploadStatus courseId="test-course" />
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-600">无法加载上传功能，请确保您已登录</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.href = "/login"}
            >
              前往登录
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
