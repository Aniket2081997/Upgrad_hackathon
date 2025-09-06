import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { UserData } from "../Dashboard";
import aiAvatar from "@/assets/ai-avatar.jpg";

interface WelcomeSectionProps {
  onChatComplete: (data: UserData) => void;
  userData: UserData | null;
}

const WelcomeSection = ({ onChatComplete, userData }: WelcomeSectionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const chatSteps = [
    {
      question: "Hi there! 👋 I'm your AI Career Counsellor. What's your name?",
      field: "name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      question: "Great to meet you! What's your highest qualification?",
      field: "qualification",
      type: "text",
      placeholder: "e.g., B.Tech, MBA, B.Com",
    },
    {
      question: "What was your academic percentage/CGPA?",
      field: "academicPercentage",
      type: "text",
      placeholder: "e.g., 75% or 7.5 CGPA",
    },
    {
      question: "Which career areas interest you most? (Select multiple)",
      field: "careerInterests",
      type: "multiselect",
      options: [
        "Data Science & Analytics",
        "Software Development",
        "Digital Marketing",
        "Product Management",
        "UI/UX Design",
        "Business Analytics",
        "Artificial Intelligence",
        "Cloud Computing",
      ],
    },
    {
      question: "What are your current technical skills?",
      field: "currentSkills",
      type: "multiselect",
      options: [
        "Python",
        "JavaScript",
        "React",
        "SQL",
        "Excel",
        "Tableau",
        "Java",
        "HTML/CSS",
        "Machine Learning",
        "AWS",
        "Node.js",
        "PowerBI",
      ],
    },
    {
      question: "What's your primary career goal?",
      field: "careerGoals",
      type: "text",
      placeholder: "e.g., Transition to Data Science, Get promotion, Start tech career",
    },
  ];

  const currentQuestion = chatSteps[currentStep];

  const handleInputChange = (value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < chatSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the chat
      const completeData: UserData = {
        name: formData.name || "",
        qualification: formData.qualification || "",
        academicPercentage: formData.academicPercentage || "",
        careerInterests: formData.careerInterests || [],
        currentSkills: formData.currentSkills || [],
        careerGoals: formData.careerGoals || "",
      };
      onChatComplete(completeData);
      setIsCompleted(true);
    }
  };

  const isCurrentStepValid = () => {
    const value = formData[currentQuestion.field as keyof UserData];
    if (currentQuestion.type === "multiselect") {
      return Array.isArray(value) && value.length > 0;
    }
    return value && (value as string).trim().length > 0;
  };

  if (isCompleted && userData) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-20 ml-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <img 
              src={aiAvatar} 
              alt="AI Career Counsellor"
              className="w-24 h-24 rounded-full mx-auto mb-6 shadow-elevated animate-float"
            />
            
            <h1 className="text-5xl font-heading font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Perfect! Let's Analyze Your Profile
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Based on our conversation, here's your personalized skills preview:
            </p>

            {/* Skills Analysis Preview */}
            <Card className="p-8 mb-8 card-elevated">
              <h3 className="text-2xl font-heading font-semibold mb-6">Skills Analysis Preview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-left">Current Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.currentSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-left">Career Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.careerInterests.map((interest, index) => (
                      <Badge key={index} className="text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Progress Bars */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Technical Skills</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.min(userData.currentSkills.length * 15, 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full" 
                      style={{ width: `${Math.min(userData.currentSkills.length * 15, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Career Clarity</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="progress-bar h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Auto-scrolling to your Career Fit analysis...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 ml-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <img 
            src={aiAvatar} 
            alt="AI Career Counsellor"
            className="w-20 h-20 rounded-full mx-auto mb-6 shadow-elevated animate-float"
          />
          
          <h1 className="text-4xl font-heading font-bold mb-4">
            Welcome to Your Career Journey! 🚀
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Let's discover your perfect career path together
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="p-8 card-elevated">
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {chatSteps.length}
              </span>
              <div className="flex gap-1">
                {chatSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentStep ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="flex items-start gap-4 mb-6">
              <img 
                src={aiAvatar} 
                alt="AI"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-card border rounded-lg p-4 flex-1">
                <p className="text-lg">{currentQuestion.question}</p>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-4">
              {currentQuestion.type === "text" && (
                <div>
                  <Input
                    value={(formData[currentQuestion.field as keyof UserData] as string) || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="text-lg p-4"
                  />
                </div>
              )}

              {currentQuestion.type === "multiselect" && currentQuestion.options && (
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    {currentQuestion.options.map((option) => {
                      const selected = (formData[currentQuestion.field as keyof UserData] as string[] || []).includes(option);
                      return (
                        <Button
                          key={option}
                          variant={selected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const current = (formData[currentQuestion.field as keyof UserData] as string[]) || [];
                            const updated = selected
                              ? current.filter(item => item !== option)
                              : [...current, option];
                            handleInputChange(updated);
                          }}
                          className="text-left justify-start p-3 h-auto"
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className="btn-hero"
                >
                  {currentStep === chatSteps.length - 1 ? "Complete Analysis" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WelcomeSection;