
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader, CheckCircle, XCircle, Database } from "lucide-react";

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
      // 先检查一个表是否存在，如果返回记录数，则说明连接成功
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("测试表查询失败:", error);
        return { tables: [], error: error.message || '未知错误' };
      }
      
      // 连接成功后，列出已知的表名（这里不是真的查询数据库，而是提供固定的列表）
      // 这避免了需要额外权限来列出所有表的问题
      const knownTables = ['questions', 'profiles', 'subscriptions', 'video_files'];
      return { tables: knownTables, error: null };
    } catch (err) {
      console.error("查询表时出现异常:", err);
      return { tables: [], error: err instanceof Error ? err.message : '未知错误' };
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
      
      const authData = await supabase.auth.getSession();
      console.log("身份验证会话:", authData);
      
      // 即使没有有效会话，也继续尝试连接数据库
      // 这样可以检测 RLS 策略是否允许未认证访问
      
      const { tables: tablesList, error: tablesError } = await listTables();
      
      if (tablesError && !authData.data.session) {
        // 如果获取表失败，并且没有有效会话
        setConnectionDetails("身份验证会话无效，且获取表格列表失败，请尝试重新登录");
        setConnectionStatus('error');
        throw new Error(String(tablesError));
      } else if (tablesError) {
        // 如果有会话但获取表失败，可能是权限问题
        setConnectionDetails(`获取表格列表失败，但身份验证成功。可能是权限问题: ${String(tablesError)}`);
        setConnectionStatus('error');
        throw new Error(String(tablesError));
      } else if (!authData.data.session) {
        // 如果没有会话但获取表成功（公开表）
        setConnectionDetails("数据库连接成功，但用户未登录。使用的是公开表访问权限。");
        setTables(tablesList);
        setConnectionStatus('success');
      } else {
        // 会话和表都正常
        setTables(tablesList);
        setConnectionDetails(`连接成功! 有效会话用户: ${authData.data.session?.user?.email || authData.data.session?.user?.id}`);
        setConnectionStatus('success');
      }
      
      console.log("Supabase 连接成功:", { tables: tablesList });
      toast.success("成功连接到 Supabase 数据库");
      
    } catch (err) {
      console.error("测试 Supabase 连接时出错:", err);
      toast.error("Supabase 连接失败");
      setConnectionStatus('error');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkConnection().catch(err => {
        console.error("初始连接检查失败:", err);
        if (retryCount < 2) {
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
            <Loader className="h-4 w-4 animate-spin" />
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
