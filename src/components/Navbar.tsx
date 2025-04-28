
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
import { trackUserBehavior } from "@/utils/behaviorTracker";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isPremium } = useSubscription();
  const { t, lang, toggleLang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    trackUserBehavior('logout', {
      actionDetails: { userId: user?.id }
    });
    await signOut();
  };

  const handleNavigation = (destination: string, label: string) => {
    trackUserBehavior('click', {
      componentId: 'navigation',
      actionDetails: { destination, label }
    });
  };

  const handleLanguageToggle = () => {
    trackUserBehavior('click', {
      componentId: 'language-toggle',
      actionDetails: { from: lang, to: lang === 'en' ? 'zh' : 'en' }
    });
    toggleLang();
  };

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => handleNavigation("/", "home")}>
          <LearnScapeLogo />
        </Link>
        <nav className="items-center space-x-6 hidden md:flex">
          <Link 
            to="/video-tutorials" 
            className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue"
            onClick={() => handleNavigation("/video-tutorials", t.NAVBAR.VIDEO_TUTORIALS)}
          >
            {t.NAVBAR.VIDEO_TUTORIALS}
          </Link>
          <Link 
            to="/ai-tutor" 
            className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue"
            onClick={() => handleNavigation("/ai-tutor", t.NAVBAR.AI_TUTOR)}
          >
            {t.NAVBAR.AI_TUTOR}
          </Link>
          <Link 
            to="/zoom-courses" 
            className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue"
            onClick={() => handleNavigation("/zoom-courses", "online-classroom")}
          >
            {lang === 'zh' ? '线上课堂' : 'Online Classroom'}
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="gap-2">
            <Languages className="h-4 w-4" />
            {lang === 'en' ? '中文' : 'English'}
          </Button>
          {user ? (
            <>
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-learnscape-darkBlue transition-colors"
                onClick={() => handleNavigation("/account", "my-account")}
              >
                <User className="h-4 w-4" />
                {lang === 'zh' ? '我的账户' : 'My Account'}
              </Link>
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                {t.NAVBAR.LOGOUT}
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue"
                onClick={() => handleNavigation("/login", t.NAVBAR.LOGIN)}
              >
                {t.NAVBAR.LOGIN}
              </Link>
              <Button 
                size="sm" 
                onClick={() => {
                  handleNavigation("/register", "get-started");
                  navigate("/register");
                }}
              >
                {lang === 'zh' ? '开始使用' : 'Get Started'}
              </Button>
            </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => trackUserBehavior('click', {
                componentId: 'mobile-menu-open',
                actionDetails: { action: 'open' }
              })}
            >
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
                {t.NAVBAR.VIDEO_TUTORIALS}
              </Link>
              <Link to="/ai-tutor" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {t.NAVBAR.AI_TUTOR}
              </Link>
              <Link to="/zoom-courses" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                {lang === 'zh' ? '线上课堂' : 'Online Classroom'}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="gap-2 justify-start">
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
                  <Button size="sm" variant="outline" onClick={handleSignOut}>
                    {t.NAVBAR.LOGOUT}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium transition-colors hover:text-learnscape-darkBlue">
                    {t.NAVBAR.LOGIN}
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
