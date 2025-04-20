
import { useState } from "react";
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
  const { toast } = useToast();

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const createAccessCode = async () => {
    try {
      setLoading(true);
      const newCode = generateCode();
      
      const { data, error } = await supabase
        .from('access_codes')
        .insert({
          code: newCode,
          course_id: courseId,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select('*')
        .single();

      if (error) throw error;

      setCodes([...codes, data]);
      toast({
        title: "访问码已生成",
        description: `新的访问码: ${newCode}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "生成访问码时出错：" + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAccessCodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('access_codes')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (error) throw error;
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

  // Load access codes when component mounts
  useState(() => {
    loadAccessCodes();
  }, [courseId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">访问码管理</h2>
        <Button onClick={createAccessCode} disabled={loading}>
          生成新访问码
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>访问码</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => (
            <TableRow key={code.id}>
              <TableCell className="font-mono">{code.code}</TableCell>
              <TableCell>
                {new Date(code.created_at).toLocaleDateString('zh-CN')}
              </TableCell>
              <TableCell>
                {code.is_active ? '有效' : '已停用'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
