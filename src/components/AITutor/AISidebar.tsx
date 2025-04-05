
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
} from "@/components/ui/sidebar";

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
};

export default AISidebar;
