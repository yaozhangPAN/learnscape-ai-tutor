
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon, CheckCircle, XCircle, Database } from "lucide-react";

interface SupabaseConnectionCheckerProps {
  className?: string;
}

const SupabaseConnectionChecker: React.FC<SupabaseConnectionCheckerProps> = ({ className }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'error'>('unknown');
  const [connectionDetails, setConnectionDetails] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  
  const listTables = async () => {
    try {
      // 尝试获取question表的计数，作为连接测试
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching tables:", error);
        return { tables: [], error };
      }
      
      // 列出已知的表
      const knownTables = ['questions', 'profiles', 'subscriptions', 'video_files'];
      
      return { tables: knownTables, error: null };
    } catch (err) {
      console.error("Exception when fetching tables:", err);
      return { tables: [], error: err };
    }
  };

  const checkConnection = async () => {
    try {
      setIsChecking(true);
      setConnectionStatus('unknown');
      console.log("测试 Supabase 连接...");
      
      if (!supabase) {
        throw new Error("Supabase 客户端未初始化");
      }
      
      // 测试身份验证连接
      const authData = await supabase.auth.getSession();
      console.log("身份验证会话:", authData);
      
      if (!authData.data.session) {
        setConnectionDetails("身份验证会话无效，请尝试重新登录");
        throw new Error("无效的身份验证会话");
      }
      
      // 获取可用表格列表
      const { tables: tablesList, error: tablesError } = await listTables();
      
      if (tablesError) {
        setConnectionDetails(`获取表格列表失败: ${tablesError.message || String(tablesError)}`);
        throw tablesError;
      }
      
      setTables(tablesList);
      console.log("可用的数据表:", tablesList);
      
      // 测试是否可以对questions表进行简单查询
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        setConnectionDetails(`查询questions表失败: ${error.message}`);
        throw error;
      }
      
      setConnectionDetails(`连接成功! 有效会话用户: ${authData.data.session?.user?.email}`);
      console.log("Supabase 连接成功:", data);
      toast.success("成功连接到 Supabase 数据库");
      setConnectionStatus('success');
      
    } catch (err) {
      console.error("测试 Supabase 连接时出错:", err);
      toast.error("Supabase 连接失败");
      setConnectionStatus('error');
    } finally {
      setIsChecking(false);
    }
  };

  // 组件加载时自动检查连接，如果失败会在5秒后重试一次
  useEffect(() => {
    // 设置一个延迟，以确保应用其他部分已经加载
    const timer = setTimeout(() => {
      checkConnection().catch(err => {
        console.error("初始连接检查失败:", err);
        if (retryCount < 2) {
          // 5秒后重试一次
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            checkConnection();
          }, 5000);
        }
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [retryCount]);

  return (
    <div className={className}>
      {connectionStatus === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <XCircle className="h-4 w-4" />
          <AlertTitle>数据库连接失败</AlertTitle>
          <AlertDescription>
            {connectionDetails || "无法连接到数据库，请检查网络连接或重新登录。"}
          </AlertDescription>
        </Alert>
      )}
      
      {connectionStatus === 'success' && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>数据库连接成功</AlertTitle>
          <AlertDescription>
            {connectionDetails || "成功连接到数据库"}
            <div className="mt-1 text-sm">
              可用表格: {tables.join(', ')}
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {connectionStatus === 'unknown' && !isChecking && (
        <Alert className="mb-4 bg-gray-50 border-gray-200">
          <Database className="h-4 w-4" />
          <AlertTitle>数据库连接状态未知</AlertTitle>
          <AlertDescription>
            点击下方按钮测试数据库连接
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
            <ReloadIcon className="h-4 w-4 animate-spin" />
            <span>测试中...</span>
          </>
        ) : (
          <>
            <Database className="h-4 w-4" />
            <span>测试数据库连接</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SupabaseConnectionChecker;
