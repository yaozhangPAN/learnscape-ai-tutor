
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SupabaseConnectionCheckerProps {
  className?: string;
}

const SupabaseConnectionChecker: React.FC<SupabaseConnectionCheckerProps> = ({ className }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'error'>('unknown');
  
  const listTables = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching tables:", error);
        return [];
      }
      
      return ['questions', 'profiles', 'subscriptions']; // List known tables as fallback
    } catch (err) {
      console.error("Exception when fetching tables:", err);
      return [];
    }
  };

  const checkConnection = async () => {
    try {
      setIsChecking(true);
      setConnectionStatus('unknown');
      console.log("测试 Supabase 连接...");
      console.log("Supabase 客户端对象:", !!supabase);
      
      // 测试身份验证连接
      const authData = await supabase.auth.getSession();
      console.log("身份验证会话:", authData);
      
      // 获取可用表格列表
      const tablesList = await listTables();
      setTables(tablesList);
      console.log("可用的数据表:", tablesList);
      
      // 测试是否可以对questions表进行简单查询
      const { data, error } = await supabase.from('questions').select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Supabase 连接测试失败:", error);
        toast.error("连接到 Supabase 数据库失败");
        setConnectionStatus('error');
        return;
      }
      
      console.log("Supabase 连接成功:", data);
      toast.success("成功连接到 Supabase 数据库");
      setConnectionStatus('success');
      
    } catch (err) {
      console.error("测试 Supabase 连接时出错:", err);
      toast.error("测试 Supabase 连接时出错");
      setConnectionStatus('error');
    } finally {
      setIsChecking(false);
    }
  };

  // 组件加载时自动检查一次连接
  useEffect(() => {
    // 设置一个延迟，以确保应用其他部分已经加载
    const timer = setTimeout(() => {
      checkConnection();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      {connectionStatus === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            数据库连接失败，请检查网络连接或稍后再试。
          </AlertDescription>
        </Alert>
      )}
      
      {connectionStatus === 'success' && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>
            数据库连接成功！可用表格: {tables.join(', ')}
          </AlertDescription>
        </Alert>
      )}
      
      <Button
        variant="outline"
        onClick={checkConnection}
        disabled={isChecking}
        className={`flex items-center gap-2 ${connectionStatus === 'error' ? 'border-red-300 hover:border-red-400' : ''}`}
      >
        {isChecking ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>测试中...</span>
          </>
        ) : (
          "测试数据库连接"
        )}
      </Button>
    </div>
  );
};

export default SupabaseConnectionChecker;
