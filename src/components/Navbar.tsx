
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, Languages } from "lucide-react";
import LearnScapeLogo from "./LearnScapeLogo";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isPremium } = useSubscription();
  const { t, lang, toggleLang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <LearnScapeLogo />
        </Link>
        <nav className="items-center space-x-6 hidden md:flex">
          <Link to="/video-tutorials" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
            {t.NAV.VIDEO_LESSONS}
          </Link>
          <Link to="/ai-tutor" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
            {t.NAV.AI_TUTOR}
          </Link>
          <Link to="/zoom-courses" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
            {t.NAV.ONLINE_CLASSROOM}
          </Link>
          <Link to="/question-bank" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
            {t.NAV.QUESTION_BANK}
          </Link>
          <Link to="/mock-exam" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
            {t.NAV.MOCK_EXAM}
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleLang} className="gap-2">
            <Languages className="h-4 w-4" />
            {lang === 'en' ? '中文' : 'English'}
          </Button>
          {user ? (
            <>
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-learnscape-darkBlue transition-colors"
              >
                <User className="h-4 w-4" />
                {lang === 'zh' ? '我的账户' : 'My Account'}
              </Link>
              <Button size="sm" variant="outline" onClick={() => signOut()}>
                {t.NAV.LOGOUT}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.LOGIN}
              </Link>
              <Button size="sm" onClick={() => navigate("/register")}>
                {lang === 'zh' ? '开始使用' : 'Get Started'}
              </Button>
            </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>{lang === 'zh' ? '菜单' : 'Menu'}</SheetTitle>
              <SheetDescription>
                {lang === 'zh' ? '浏览我们的功能' : 'Browse our features'}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/video-tutorials" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.VIDEO_LESSONS}
              </Link>
              <Link to="/ai-tutor" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.AI_TUTOR}
              </Link>
              <Link to="/zoom-courses" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.ONLINE_CLASSROOM}
              </Link>
              <Link to="/question-bank" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.QUESTION_BANK}
              </Link>
              <Link to="/mock-exam" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAV.MOCK_EXAM}
              </Link>
              <Button variant="ghost" size="sm" onClick={toggleLang} className="gap-2 justify-start">
                <Languages className="h-4 w-4" />
                {lang === 'en' ? '中文' : 'English'}
              </Button>
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-learnscape-darkBlue transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {lang === 'zh' ? '我的账户' : 'My Account'}
                  </Link>
                  <Button size="sm" variant="outline" onClick={() => signOut()}>
                    {t.NAV.LOGOUT}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                    {t.NAV.LOGIN}
                  </Link>
                  <Button size="sm" onClick={() => navigate("/register")}>
                    {lang === 'zh' ? '开始使用' : 'Get Started'}
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
