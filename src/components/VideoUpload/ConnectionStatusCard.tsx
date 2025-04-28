
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SupabaseConnectionChecker from "@/components/SupabaseConnectionChecker";

const ConnectionStatusCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>数据库连接状态</CardTitle>
        <CardDescription>检查与Supabase数据库的连接状态</CardDescription>
      </CardHeader>
      <CardContent>
        <SupabaseConnectionChecker className="mb-4" />
      </CardContent>
    </Card>
  );
};

export default ConnectionStatusCard;
