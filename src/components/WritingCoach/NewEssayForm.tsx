import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NewEssayForm = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/ai-tutor/writing-coach/practice");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">让我们一起写作文！</h1>
          <p className="text-gray-600">填写以下信息，AI助教将指导你完成作文。</p>
        </div>
        <img 
          src="/lovable-uploads/3be2a2dc-3175-4068-b3ac-fd1eeeedc4fe.png" 
          alt="Writing illustration" 
          className="w-32 h-32 object-contain"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">作文标题</Label>
          <Input 
            id="title"
            placeholder="未命名作文"
            className="mt-1"
          />
        </div>

        <div>
          <Label>上传作文图片</Label>
          <div className="mt-2 space-y-4">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="image-upload" className="w-full cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-6 ${imagePreview ? 'border-gray-300' : 'border-gray-400'} hover:border-primary transition-colors`}>
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-[200px] object-contain"
                      />
                      <p className="text-sm text-gray-500 text-center mt-2">点击更换图片</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">点击或拖拽图片至此处上传</p>
                        <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG 格式</p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <Label>选择作文类型</Label>
          <RadioGroup defaultValue="full" className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-start space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="full" id="full" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="full" className="font-medium">
                  完整写作过程
                </Label>
                <p className="text-sm text-gray-500">
                  AI助教将引导你完成理解、构思、写作和修改的完整过程。
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="feedback" id="feedback" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="feedback" className="font-medium">
                  修改与反馈
                </Label>
                <p className="text-sm text-gray-500">
                  AI助教将对已完成的作文提供修改建议和评分要点。
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>年级</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="选择年级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p3">小学三年级</SelectItem>
                <SelectItem value="p4">小学四年级</SelectItem>
                <SelectItem value="p5">小学五年级</SelectItem>
                <SelectItem value="p6">小学六年级</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>作文体裁</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="选择体裁" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="picture">看图写作</SelectItem>
                <SelectItem value="narrative">记叙文</SelectItem>
                <SelectItem value="descriptive">说明文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>字数要求（选填）</Label>
          <Input 
            type="number"
            placeholder="建议字数（最多1750字）"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">不填写则按照年级标准设定字数范围</p>
        </div>

        <div>
          <Label>作文要求/题目说明</Label>
          <Textarea 
            placeholder="输入作文题目和具体要求..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            开始写作
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewEssayForm;
