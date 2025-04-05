
import { Pen, Mic, Brain, FileSearch, Camera, Headphones } from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

type SidebarOption = {
  id: string;
  title: string;
  icon: React.ReactNode;
  emoji: string;
};

type AISidebarProps = {
  options: SidebarOption[];
  activeTab: string;
  onTabChange: (id: string) => void;
};

const AISidebar = ({ options, activeTab, onTabChange }: AISidebarProps) => {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileView = windowWidth < 768;

  // This renders for desktop
  if (!isMobileView) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-learnscape-darkBlue">
              AI Learning Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {options.map((option) => (
                  <SidebarMenuItem key={option.id}>
                    <SidebarMenuButton 
                      isActive={activeTab === option.id}
                      onClick={() => onTabChange(option.id)}
                      className="flex items-center gap-3 hover:bg-blue-50"
                      tooltip={option.title}
                    >
                      <div className={`flex items-center justify-center ${
                        activeTab === option.id ? "text-learnscape-blue" : "text-gray-600"
                      }`}>
                        {option.icon}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{option.title}</span>
                        <span className="text-sm opacity-80">{option.emoji}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  // This renders for mobile
  return (
    <div className="block md:hidden mb-4">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Menu className="h-5 w-5" />
            <span>{options.find(opt => opt.id === activeTab)?.title || "Select Tool"}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh]">
          <div className="px-4 py-6">
            <h3 className="text-lg font-semibold mb-4 text-learnscape-darkBlue">
              AI Learning Tools
            </h3>
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onTabChange(option.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md transition-colors",
                    activeTab === option.id 
                      ? "bg-blue-50 text-learnscape-blue" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center",
                    activeTab === option.id ? "text-learnscape-blue" : "text-gray-600"
                  )}>
                    {option.icon}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{option.title}</span>
                    <span className="text-sm opacity-80">{option.emoji}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AISidebar;
