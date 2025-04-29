
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { trackUserBehavior } from "@/utils/behaviorTracker";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  refreshSession: () => Promise<Session | null>;
  hasShownLoginToast: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingErrors, setLoadingErrors] = useState<string[]>([]);
  const [hasShownLoginToast, setHasShownLoginToast] = useState(false);

  // 刷新会话的函数，可以在应用中任何需要重新验证的地方调用
  const refreshSession = async (): Promise<Session | null> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      
      if (data && data.session) {
        setSession(data.session);
        setUser(data.session.user);
        return data.session;
      }
      
      return null;
    } catch (err) {
      console.error("刷新会话失败:", err);
      return null;
    }
  };

  // 检查用户是否为管理员
  const checkAdminRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'administrator')
        .single();
        
      setIsAdmin(!!data);
      return !!data;
    } catch (error) {
      console.error("Error checking admin role:", error);
      return false;
    }
  };

  useEffect(() => {
    console.log("AuthContext initializing...");
    let isInitialized = false;
    
    // 设置身份验证状态监听器
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, !!newSession);
        
        // 更新会话状态
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === "SIGNED_IN" && !hasShownLoginToast) {
          toast.success("登录成功");
          setHasShownLoginToast(true);
          
          // 检查管理员角色 - 使用setTimeout防止阻塞
          if (newSession?.user) {
            setTimeout(async () => {
              await checkAdminRole(newSession.user.id);
            }, 0);
          }
          
          // 跟踪登录事件 - 使用setTimeout防止阻塞
          setTimeout(() => {
            trackUserBehavior('login', {
              actionDetails: { 
                userId: newSession?.user.id,
                email: newSession?.user.email,
                authProvider: newSession?.user?.app_metadata?.provider || 'email'
              }
            });
          }, 0);
        }
        
        if (event === "SIGNED_OUT") {
          toast.info("已退出登录");
          setIsAdmin(false);
          setHasShownLoginToast(false); // 重置toast标记，以便下次登录时可以显示
        }
        
        // 设置加载状态为false，因为我们已经收到了状态变化
        if (isLoading) {
          setIsLoading(false);
        }
      }
    );

    // 然后检查现有会话 - 使用更短的超时
    const initializeAuth = async () => {
      try {
        console.log("正在检查现有会话...");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          setLoadingErrors(prev => [...prev, `获取会话错误: ${error.message}`]);
          console.error("获取初始会话时出错:", error);
        } else {
          console.log("初始会话检查:", !!currentSession);
          
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user && !hasShownLoginToast) {
            // 在初始化时显示登录提示（但只显示一次）
            setHasShownLoginToast(true);
            
            try {
              await checkAdminRole(currentSession.user.id);
            } catch (roleError) {
              console.error("检查管理员角色时出错:", roleError);
            }
            
            // 跟踪会话恢复事件
            setTimeout(() => {
              trackUserBehavior('page_view', {
                actionDetails: { 
                  eventType: 'session_restored',
                  userId: currentSession.user.id
                }
              });
            }, 0);
          }
        }
      } catch (e) {
        console.error("初始化身份验证时出现异常:", e);
        setLoadingErrors(prev => [...prev, `初始化异常: ${e instanceof Error ? e.message : String(e)}`]);
      } finally {
        isInitialized = true;
        setIsLoading(false);
      }
    };

    initializeAuth();

    // 添加一个安全超时，确保isLoading最终设置为false
    // 减少超时时间以避免长时间等待
    const safetyTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("安全超时触发: 强制isLoading为false");
        setIsLoading(false);
        setLoadingErrors(prev => [...prev, "身份验证加载超时"]);
        toast.warning("身份验证处理超时，请尝试刷新页面");
      }
    }, 5000); // 从10秒减少到5秒

    return () => {
      subscription.unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // 如果加载超过2秒，显示一个加载提示（从3秒减少到2秒）
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      timer = setTimeout(() => {
        if (isLoading) {
          toast.info("正在验证身份...");
        }
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  // 如果有加载错误，显示错误信息
  useEffect(() => {
    if (loadingErrors.length > 0) {
      console.error("身份验证加载错误:", loadingErrors);
    }
  }, [loadingErrors]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setHasShownLoginToast(false); // 退出登录后重置标记
      toast.success("已成功退出登录");
    } catch (error) {
      console.error("退出登录时出错:", error);
      toast.error("退出登录失败");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signOut, 
      isLoading, 
      isAdmin, 
      refreshSession, 
      hasShownLoginToast 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
