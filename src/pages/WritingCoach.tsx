
import { useRequirePremium } from "@/hooks/useRequirePremium";
import { useI18n } from "@/contexts/I18nContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Pen, MessageSquare, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WritingCoach = () => {
  useRequirePremium();
  const { lang } = useI18n();

  const features = [
    {
      title: lang === 'en' ? 'Image Analysis' : '图像智能分析',
      description: lang === 'en' ? 'Automatically analyze image elements for writing inspiration.' : '自动识别图片要素，提供作文灵感。',
      icon: <Pen className="w-6 h-6 mb-4 text-green-600" />
    },
    {
      title: lang === 'en' ? 'Interactive Guidance' : '对话式辅导',
      description: lang === 'en' ? 'Step-by-step guidance while you write.' : '分阶段引导，边写边学。',
      icon: <MessageSquare className="w-6 h-6 mb-4 text-green-600" />
    },
    {
      title: lang === 'en' ? 'Real-time Feedback' : '实时反馈',
      description: lang === 'en' ? 'Corrections, advanced expressions, and structure optimization.' : '错别字、高级表达、结构优化。',
      icon: <Book className="w-6 h-6 mb-4 text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/ai-tutor" className="inline-flex items-center text-learnscape-blue hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {lang === 'en' ? 'Back to AI Tutor' : '返回 AI 导师'}
            </Link>
          </div>

          <div className="text-center bg-gradient-to-br from-green-50 to-green-100 py-16 rounded-2xl mb-12">
            <h1 className="text-4xl font-extrabold text-learnscape-darkBlue mb-4">
              {lang === 'en' ? 'AI Writing Coach' : '看图写作 AI 教练'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {lang === 'en' ? 'Step-by-step Guidance · Real-time Feedback · Continuous Improvement' : '分步引导 · 实时反馈 · 持续进步'}
            </p>
            <Button className="bg-learnscape-blue hover:bg-green-700">
              {lang === 'en' ? 'Start Writing' : '马上体验'}
            </Button>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center text-learnscape-darkBlue mb-12">
              {lang === 'en' ? 'Key Features' : '功能亮点'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-learnscape-darkBlue">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          <div className="text-center text-gray-500">
            {lang === 'en' ? 'Writing practice features coming soon...' : '写作练习功能即将推出...'}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WritingCoach;
