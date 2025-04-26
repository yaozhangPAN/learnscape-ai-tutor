
import React, { useEffect, useState } from "react";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VideoUpload = () => {
  const { user, session, isLoading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // 检查当前的认证状态并记录
    const checkAuth = async () => {
      console.log("检查认证状态：", { user, session, isLoading });
      
      // 获取当前会话状态
      const { data } = await supabase.auth.getSession();
      console.log("Supabase会话状态：", data);
      
      if (data.session) {
        toast({
          title: "已认证",
          description: `用户 ${data.session.user.email} 已登录`,
        });
      }
      
      setAuthChecked(true);
    };
    
    checkAuth();
  }, [user, session, isLoading]);

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">正在验证身份...</p>
          <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // 认证检查完成但无用户，重定向到登录
  if (authChecked && !user) {
    toast({
      title: "需要登录",
      description: "请先登录后再访问此页面",
      variant: "destructive",
    });
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
            {user ? (
              <div className="text-sm text-green-600">
                已登录: {user.email}
              </div>
            ) : (
              <div className="text-sm text-red-600">
                未检测到登录
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleRelogin}>
              重新登录
            </Button>
          </div>
        </div>
        
        {user ? (
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
