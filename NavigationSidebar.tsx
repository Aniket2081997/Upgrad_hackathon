import { Home, Target, TrendingUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSidebarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const NavigationSidebar = ({ activeSection, onSectionClick }: NavigationSidebarProps) => {
  const navItems = [
    {
      id: "welcome",
      label: "Welcome",
      icon: Home,
    },
    {
      id: "careerfit",
      label: "Career Fit",
      icon: Target,
    },
    {
      id: "roi",
      label: "ROI",
      icon: TrendingUp,
    },
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-card shadow-elevated z-40 flex flex-col items-center py-8">
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-heading font-bold text-lg">U</span>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                "group relative",
                isActive ? "nav-icon-active" : "nav-icon-inactive"
              )}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Progress indicator */}
      <div className="mt-auto mb-8">
        <div className="w-1 h-32 bg-gray-200 rounded-full relative">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-primary rounded-full transition-all duration-700"
            style={{
              height: `${
                activeSection === "welcome" ? "25%" :
                activeSection === "careerfit" ? "50%" :
                activeSection === "roi" ? "75%" :
                "100%"
              }`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;