
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

  const chatMessages = [
    {
      role: "ai",
      content: "📝 Hi，我是你的写作教练，先来理解这道题目。",
    },
    {
      role: "ai",
      content: "请观察图片，然后回答："图片中有哪些主要人物或场景？"",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <span className="font-medium">My Essays</span>
            <nav className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="text-blue-600 font-semibold">Understanding</span>
              <span>—</span>
              <span>Outlining</span>
              <span>—</span>
              <span>Drafting</span>
              <span>—</span>
              <span>Revising</span>
            </nav>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Next: Start Outlining
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <section className="col-span-8 bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <Link 
              to="/ai-tutor" 
              className="inline-flex items-center text-learnscape-blue hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to AI Tutor
            </Link>
          </div>
          
          <h2 className="text-xl font-bold mb-4">看图写作</h2>
          <div className="space-y-4 text-gray-800">
            <div>
              <span className="font-semibold">Grade level</span>: 小学三年级
            </div>
            <div>
              <span className="font-semibold">Essay type</span>: 看图写作
            </div>
            <div>
              <span className="font-semibold">Prompt / Instructions</span>:
              <ul className="list-disc list-inside ml-4">
                <li>根据图片写一篇 120-150 字短文。</li>
                <li>内容完整，情节合理，结尾点题。</li>
              </ul>
            </div>
          </div>
        </section>

        <aside className="col-span-4 bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            {chatMessages.map((message, index) => (
              <div key={index} className="text-sm">
                <strong>{message.role === "ai" ? "AI:" : "You:"}</strong>{" "}
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask away..."
              className="flex-1"
            />
            <Button 
              variant="outline"
              onClick={() => setUserInput("")}
              disabled={!userInput}
            >
              Send
            </Button>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
