import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, ShoppingCart } from "lucide-react";
import NavigationSidebar from "./NavigationSidebar";
import ChatAssistant from "./ChatAssistant";
import WelcomeSection from "./sections/WelcomeSection";
import CareerFitSection from "./sections/CareerFitSection";
import ROISection from "./sections/ROISection";
import CoursesSection from "./sections/CoursesSection";

export interface UserData {
  name: string;
  qualification: string;
  academicPercentage: string;
  careerInterests: string[];
  currentSkills: string[];
  careerGoals: string;
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chatCompleted, setChatCompleted] = useState(false);
  
  const welcomeRef = useRef<HTMLDivElement>(null);
  const careerFitRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    welcome: welcomeRef,
    careerfit: careerFitRef,
    roi: roiRef,
    courses: coursesRef,
  };

  // Auto-scroll to section when chat completes
  useEffect(() => {
    if (chatCompleted && careerFitRef.current) {
      setTimeout(() => {
        careerFitRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setActiveSection("careerfit");
      }, 1000);
    }
  }, [chatCompleted]);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(key);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return { key, observer };
    });

    return () => {
      observers.forEach(({ observer }) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionKey: string) => {
    const ref = sectionRefs[sectionKey as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleChatComplete = (data: UserData) => {
    setUserData(data);
    setChatCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Persistent CTA Header */}
        <div className="fixed top-4 right-6 z-50 flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-card/90 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            Call Us
          </Button>
          <Button 
            size="sm"
            className="btn-hero animate-pulse-glow"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Self-Checkout
          </Button>
        </div>

        {/* Sections */}
        <div className="space-y-0">
          <div ref={welcomeRef} id="welcome">
            <WelcomeSection 
              onChatComplete={handleChatComplete}
              userData={userData}
            />
          </div>
          
          <div ref={careerFitRef} id="careerfit">
            <CareerFitSection userData={userData} />
          </div>
          
          <div ref={roiRef} id="roi">
            <ROISection />
          </div>
          
          <div ref={coursesRef} id="courses">
            <CoursesSection userData={userData} />
          </div>
        </div>

        {/* Sticky Chat Assistant */}
        <ChatAssistant userData={userData} />
      </div>
    </div>
  );
};

export default Dashboard;