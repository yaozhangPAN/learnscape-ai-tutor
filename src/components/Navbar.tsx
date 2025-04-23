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
import { Menu, User } from "lucide-react";
import LearnScapeLogo from "./LearnScapeLogo";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isPremium } = useSubscription();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <LearnScapeLogo />
        </Link>
        <nav className="items-center space-x-6 hidden md:flex">
          <Link to="/video-tutorials" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
            {t.NAVBAR.COURSES}
          </Link>
          <Link to="/ai-tutor" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
            {t.NAVBAR.AI_TUTOR}
          </Link>
          <Link to="/daily-plan" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
            {t.NAVBAR.DAILY_PLAN}
          </Link>
          {user ? (
            <>
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-learnscape-blue transition-colors"
              >
                <User className="h-4 w-4" />
                {lang === 'zh' ? '我的账户' : 'My Account'}
              </Link>
              <Button size="sm" variant="outline" onClick={() => signOut()}>
                {t.NAVBAR.SIGN_OUT}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
                {t.NAVBAR.SIGN_IN}
              </Link>
              <Button size="sm" onClick={() => navigate("/register")}>
                {t.NAVBAR.GET_STARTED}
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
              <SheetTitle>{t.NAVBAR.MENU}</SheetTitle>
              <SheetDescription>
                {t.NAVBAR.MOBILE_NAV_DESC}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/video-tutorials" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
                {t.NAVBAR.COURSES}
              </Link>
              <Link to="/ai-tutor" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
                {t.NAVBAR.AI_TUTOR}
              </Link>
              <Link to="/daily-plan" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
                {t.NAVBAR.DAILY_PLAN}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-learnscape-blue transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {lang === 'zh' ? '我的账户' : 'My Account'}
                  </Link>
                  <Button size="sm" variant="outline" onClick={() => signOut()}>
                    {t.NAVBAR.SIGN_OUT}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium transition-colors hover:text-learnscape-blue">
                    {t.NAVBAR.SIGN_IN}
                  </Link>
                  <Button size="sm" onClick={() => navigate("/register")}>
                    {t.NAVBAR.GET_STARTED}
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
