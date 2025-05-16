
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Copy, Check, X, Mail, User, Tabs } from "lucide-react";
import { Tabs as UiTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccessCode {
  id: string;
  code: string;
  course_id: string;
  created_at: string;
  is_active: boolean;
}

interface PurchasedAccess {
  id: string;
  user_id: string;
  content_id: string;
  content_type: string;
  created_at: string;
  email?: string;
  name?: string;
}

export const AccessCodeManager = ({ courseId }: { courseId: string }) => {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [purchasedAccess, setPurchasedAccess] = useState<PurchasedAccess[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  // Function to generate random access code
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // Create an access code
  const createAccessCode = async () => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "错误",
          description: "您需要登录才能生成访问码",
        });
        return;
      }

      setLoading(true);
      const newCode = generateCode();

      const { data, error } = await supabase
        .from('access_codes')
        .insert([
          {
            code: newCode,
            course_id: courseId,
            created_by: user.id,
            is_active: true
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating access code:", error);
        throw error;
      }

      // Add the new code to the beginning of the list
      setCodes(prevCodes => [data, ...prevCodes]);
      toast({
        title: "访问码已生成",
        description: `新的访问码: ${newCode}`,
      });
    } catch (error: any) {
      console.error("Full error:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "生成访问码时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle code active status
  const toggleCodeStatus = async (id: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('access_codes')
        .update({ is_active: !currentStatus })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update the codes list
      setCodes(prevCodes => 
        prevCodes.map(code => 
          code.id === id 
            ? { ...code, is_active: !currentStatus } 
            : code
        )
      );
      
      toast({
        title: currentStatus ? "访问码已停用" : "访问码已启用",
        description: `访问码状态已更新`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "更新访问码状态出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Copy access code to clipboard
  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast({
      title: "已复制",
      description: "访问码已复制到剪贴板",
    });
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Load access codes
  const loadAccessCodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('access_codes')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error loading access codes:", error);
        throw error;
      }
      setCodes(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "加载访问码时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // New function to give direct access to a user by email
  const giveDirectAccess = async () => {
    try {
      if (!userEmail) {
        toast({
          variant: "destructive",
          title: "错误",
          description: "请输入用户邮箱",
        });
        return;
      }

      setLoading(true);

      // First, find the user ID from the email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('id', (await supabase.auth.admin.getUserByEmail(userEmail)).data.user?.id)
        .single();

      if (userError || !userData) {
        throw new Error(`找不到邮箱为 ${userEmail} 的用户`);
      }

      // Check if user already has access
      const { data: existingAccess } = await supabase
        .from('purchased_content')
        .select('*')
        .eq('user_id', userData.id)
        .eq('content_id', courseId)
        .eq('content_type', 'video_tutorial')
        .single();

      if (existingAccess) {
        toast({
          title: "用户已有访问权限",
          description: `用户 ${userEmail} 已拥有此课程的访问权限`,
        });
        setUserEmail("");
        return;
      }

      // Add record to purchased_content
      const { data, error } = await supabase
        .from('purchased_content')
        .insert([
          {
            user_id: userData.id,
            content_id: courseId, 
            content_type: 'video_tutorial',
            price: 0, // Indicating it's complimentary
            currency: 'SGD',
            payment_reference: `manual_grant_${Date.now()}`
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      loadPurchasedAccess(); // Refresh the list
      
      toast({
        title: "已授予访问权限",
        description: `用户 ${userEmail} 现在可以访问此课程`,
      });
      
      setUserEmail(""); // Clear the input
    } catch (error: any) {
      console.error("Error giving direct access:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "授予访问权限时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // New function to revoke direct access
  const revokeDirectAccess = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('purchased_content')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update the purchased access list
      setPurchasedAccess(prev => prev.filter(access => access.id !== id));
      
      toast({
        title: "已撤销访问权限",
        description: "用户访问权限已被撤销",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "撤销访问权限时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Load users with purchased access
  const loadPurchasedAccess = async () => {
    try {
      setLoading(true);
      
      // Join with profiles to get user email
      const { data, error } = await supabase
        .from('purchased_content')
        .select(`
          id,
          user_id,
          content_id,
          content_type,
          created_at,
          profiles:user_id (
            name,
            id
          )
        `)
        .eq('content_id', courseId)
        .eq('content_type', 'video_tutorial')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error loading purchased access:", error);
        throw error;
      }

      // Transform the data to include user email
      const formattedData = await Promise.all(
        data.map(async (item) => {
          // Get user email from auth
          let email = "";
          try {
            const { data: userData } = await supabase
              .from('auth')
              .select('email')
              .eq('id', item.user_id)
              .single();
              
            email = userData?.email || "";
          } catch (e) {
            console.error("Error fetching email:", e);
          }

          return {
            id: item.id,
            user_id: item.user_id,
            content_id: item.content_id,
            content_type: item.content_type,
            created_at: item.created_at,
            email: email,
            name: item.profiles?.name || "",
          };
        })
      );

      setPurchasedAccess(formattedData);
    } catch (error: any) {
      console.error("Error loading purchased access:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "加载用户访问权限时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Load both access codes and purchased access when component mounts
  useEffect(() => {
    if (courseId) {
      loadAccessCodes();
      loadPurchasedAccess();
    }
  }, [courseId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">课程访问管理</h2>
      </div>

      <UiTabs defaultValue="direct-access" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct-access">直接授权访问权限</TabsTrigger>
          <TabsTrigger value="access-codes">访问码管理</TabsTrigger>
        </TabsList>

        <TabsContent value="direct-access" className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-amber-800">直接授权访问权限说明</h3>
            <p className="text-sm text-amber-700 mt-1">
              1. 输入用户的电子邮箱<br />
              2. 点击"授予访问权限"按钮<br />
              3. 用户将能够立即访问此课程<br />
              4. 如需撤销访问权限，请在用户列表中点击撤销按钮
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <Input
                placeholder="输入用户邮箱"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
              />
            </div>
            <Button onClick={giveDirectAccess} disabled={loading || !userEmail || !user}>
              <Mail className="mr-2 h-4 w-4" />
              授予访问权限
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户</TableHead>
                <TableHead>授权日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchasedAccess.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                    暂无已授权用户
                  </TableCell>
                </TableRow>
              ) : (
                purchasedAccess.map((access) => (
                  <TableRow key={access.id}>
                    <TableCell>
                      <div className="font-medium">{access.name || "未知用户"}</div>
                      <div className="text-xs text-gray-500">{access.email}</div>
                    </TableCell>
                    <TableCell>
                      {new Date(access.created_at).toLocaleDateString('zh-CN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => revokeDirectAccess(access.id)}
                      >
                        <X className="h-4 w-4" />
                        撤销
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="access-codes">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-amber-800">使用方法</h3>
            <p className="text-sm text-amber-700 mt-1">
              1. 点击"生成新访问码"按钮创建访问码<br />
              2. 将访问码发给需要访问课程的用户<br />
              3. 用户在课程页面输入访问码后即可访问课程内容<br />
              4. 如需停用访问码，点击访问码旁边的停用按钮
            </p>
          </div>

          <div className="mb-4">
            <Button onClick={createAccessCode} disabled={loading || !user}>
              生成新访问码
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>访问码</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    暂无访问码
                  </TableCell>
                </TableRow>
              ) : (
                codes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono">{code.code}</TableCell>
                    <TableCell>
                      {new Date(code.created_at).toLocaleDateString('zh-CN')}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        code.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {code.is_active ? '有效' : '已停用'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => copyToClipboard(code.code, code.id)}
                        >
                          {copiedId === code.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant={code.is_active ? "destructive" : "outline"}
                          size="icon"
                          onClick={() => toggleCodeStatus(code.id, code.is_active)}
                        >
                          {code.is_active ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </UiTabs>
    </div>
  );
};
