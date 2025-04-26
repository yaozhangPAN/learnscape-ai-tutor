
import { useRequirePremium } from "@/hooks/useRequirePremium";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WritingCoach = () => {
  useRequirePremium();
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <span className="font-medium">
              {lang === 'en' ? 'My Essays' : '我的作文'}
            </span>
            <nav className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="text-blue-600 font-semibold">
                {lang === 'en' ? 'Understanding' : '理解'}
              </span>
              <span>—</span>
              <span>{lang === 'en' ? 'Outlining' : '大纲'}</span>
              <span>—</span>
              <span>{lang === 'en' ? 'Drafting' : '草稿'}</span>
              <span>—</span>
              <span>{lang === 'en' ? 'Revising' : '修改'}</span>
            </nav>
          </div>
          <Button>
            {lang === 'en' ? 'Next: Start Outlining' : '下一步：开始写大纲'}
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Left Content Section */}
        <section className="col-span-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {lang === 'en' ? 'Picture Composition' : '看图写作'}
          </h2>
          <div className="space-y-4 text-gray-800">
            <div>
              <span className="font-semibold">
                {lang === 'en' ? 'Grade level' : '年级'}
              </span>: {lang === 'en' ? 'Primary 3' : '小学三年级'}
            </div>
            <div>
              <span className="font-semibold">
                {lang === 'en' ? 'Essay type' : '作文类型'}
              </span>: {lang === 'en' ? 'Picture Composition' : '看图写作'}
            </div>
            <div>
              <span className="font-semibold">
                {lang === 'en' ? 'Prompt / Instructions' : '要求与说明'}
              </span>:
              <ul className="list-disc list-inside ml-4">
                <li>
                  {lang === 'en' 
                    ? 'Write a 120-150 word composition based on the picture.'
                    : '根据图片写一篇 120-150 字短文。'
                  }
                </li>
                <li>
                  {lang === 'en'
                    ? 'Ensure complete content, logical plot, and relevant conclusion.'
                    : '内容完整，情节合理，结尾点题。'
                  }
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right AI Chat Section */}
        <aside className="col-span-4 bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            <div className="text-sm">
              <strong>AI:</strong> 📝 {lang === 'en' 
                ? "Hi, I'm your writing coach. Let's understand this assignment."
                : "Hi，我是你的写作教练，先来理解这道题目。"
              }
            </div>
            <div className="text-sm">
              <strong>AI:</strong> {lang === 'en'
                ? "Please look at the picture and tell me: What main characters or scenes do you see?"
                : "请观察图片，然后回答："图片中有哪些主要人物或场景？""
              }
            </div>
          </div>
          <div>
            <Input
              placeholder={lang === 'en' ? "Ask away..." : "请输入..."}
              className="w-full"
            />
          </div>
        </aside>
      </main>

      <footer className="bg-white py-4">
        <div className="container mx-auto text-center text-xs text-gray-500">
          © 2025 {lang === 'en' ? 'AI Writing Coach' : '看图写作 AI 教练'}
        </div>
      </footer>
    </div>
  );
};

export default WritingCoach;
