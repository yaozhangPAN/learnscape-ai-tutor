
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthRequiredCard = () => {
  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="text-yellow-800">无法加载上传功能</CardTitle>
        <CardDescription className="text-yellow-700">请确保您已成功登录系统</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button 
          onClick={() => window.location.href = "/login"}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          前往登录
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthRequiredCard;
