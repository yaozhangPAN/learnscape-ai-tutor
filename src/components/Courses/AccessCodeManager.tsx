
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
import { Copy, Check, X } from "lucide-react";

interface AccessCode {
  id: string;
  code: string;
  course_id: string;
  created_at: string;
  is_active: boolean;
}

export const AccessCodeManager = ({ courseId }: { courseId: string }) => {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

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

  // Load access codes when component mounts or courseId changes
  useEffect(() => {
    if (courseId) {
      loadAccessCodes();
    }
  }, [courseId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">访问码管理</h2>
        <Button onClick={createAccessCode} disabled={loading || !user}>
          生成新访问码
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
        <h3 className="font-medium text-amber-800">使用方法</h3>
        <p className="text-sm text-amber-700 mt-1">
          1. 点击"生成新访问码"按钮创建访问码<br />
          2. 将访问码发给需要访问课程的用户<br />
          3. 用户在课程页面输入访问码后即可访问课程内容<br />
          4. 如需停用访问码，点击访问码旁边的停用按钮
        </p>
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
    </div>
  );
};
