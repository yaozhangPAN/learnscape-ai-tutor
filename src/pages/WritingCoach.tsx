
import { useRequirePremium } from "@/hooks/useRequirePremium";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const WritingCoach = () => {
  useRequirePremium();
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "理解", status: "current" },
    { label: "构思", status: "upcoming" },
    { label: "写作", status: "upcoming" },
    { label: "修改", status: "upcoming" }
  ];

  const chatMessages = [
    {
      role: "ai",
      content: "📝 你好！让我们一起写作文吧！",
    },
    {
      role: "ai",
      content: "第一步：审题立意。先让我们明确题目要求和关键词。请仔细阅读作文题目，圈出关键词。",
    }
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setUserInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Link to="/ai-tutor" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Link>
            <nav className="flex items-center space-x-4 text-sm text-gray-600">
              {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                  {index > 0 && <span className="text-gray-300">—</span>}
                  <span className={currentStep === index + 1 ? "text-blue-600 font-semibold" : ""}>
                    {step.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
          <Button 
            variant="default"
            onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))}
            disabled={currentStep === steps.length}
          >
            下一步：{currentStep < steps.length ? steps[currentStep].label : "完成"}
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <section className="col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">看图写作</h2>
            <div className="space-y-4 text-gray-800">
              <div>
                <span className="font-semibold">年级</span>: 小学三年级
              </div>
              <div>
                <span className="font-semibold">类型</span>: 看图写作
              </div>
              <div>
                <span className="font-semibold">题目要求</span>:
                <ul className="list-disc list-inside ml-4">
                  <li>根据图片写一篇 120-150 字短文。</li>
                  <li>内容完整，情节合理，结尾点题。</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">写作步骤</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">当前：预备阶段</h4>
                <ul className="mt-2 space-y-2 text-sm text-blue-700">
                  <li>• 明确题目要求，圈出关键词</li>
                  <li>• 确定中心思想（主题）与写作角度</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-4 bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            {chatMessages.map((message, index) => (
              <div key={index} className="text-sm">
                <strong>{message.role === "ai" ? "AI:" : "你:"}</strong>{" "}
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="在这里输入..."
              className="flex-1"
            />
            <Button 
              variant="outline"
              onClick={handleSendMessage}
              disabled={!userInput.trim()}
            >
              发送
            </Button>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
