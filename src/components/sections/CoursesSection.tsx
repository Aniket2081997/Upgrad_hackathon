import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Users, Award, CheckCircle, Play, Trophy, Target, ShoppingCart } from "lucide-react";
import { UserData } from "../Dashboard";

interface CoursesSectionProps {
  userData: UserData | null;
}

const CoursesSection = ({ userData }: CoursesSectionProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  // Mock course data
  const recommendedCourses = [
    {
      id: "data-science",
      name: "Advanced Data Science Program",
      partner: "IIIT Bangalore",
      partnerLogo: "🎓",
      duration: "11 Months",
      effort: "10-12 hrs/week",
      rating: 4.8,
      students: "15,000+",
      careerFit: 92,
      highlights: [
        "Industry-relevant curriculum",
        "1:1 Mentoring",
        "Job guarantee",
        "Live projects"
      ],
      skills: ["Python", "Machine Learning", "Deep Learning", "SQL", "Tableau"],
      price: "₹1,99,000",
      discount: "30% OFF",
      whyRightForYou: [
        "Matches your interest in Data Science & Analytics",
        "Builds on your existing technical foundation", 
        "Aligns with your career goal of transitioning to tech",
        "High placement rate in your target salary range"
      ]
    },
    {
      id: "full-stack",
      name: "Full Stack Development Program",
      partner: "IIIT Bangalore", 
      partnerLogo: "🎓",
      duration: "10 Months",
      effort: "8-10 hrs/week",
      rating: 4.7,
      students: "12,000+",
      careerFit: 85,
      highlights: [
        "MERN Stack specialization",
        "Industry projects",
        "Placement support",
        "Portfolio development"
      ],
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "AWS"],
      price: "₹1,79,000",
      discount: "25% OFF",
      whyRightForYou: [
        "Perfect for transitioning to development roles",
        "Comprehensive curriculum covering front-end and back-end",
        "Strong job market demand",
        "Good starting point for tech career"
      ]
    },
    {
      id: "product-management",
      name: "Product Management Program",
      partner: "Duke CE",
      partnerLogo: "🏛️",
      duration: "9 Months", 
      effort: "6-8 hrs/week",
      rating: 4.9,
      students: "8,000+",
      careerFit: 78,
      highlights: [
        "Duke University curriculum",
        "Product strategy focus",
        "Case study methodology",
        "Industry networking"
      ],
      skills: ["Product Strategy", "Analytics", "User Research", "Roadmapping"],
      price: "₹2,49,000",
      discount: "20% OFF",
      whyRightForYou: [
        "Leverages your analytical thinking skills",
        "Great for business-minded individuals",
        "High growth potential",
        "Leadership development"
      ]
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What interests you most about technology?",
      options: [
        "Building applications and websites",
        "Analyzing data to find insights", 
        "Managing products and strategy",
        "Designing user experiences"
      ]
    },
    {
      id: 2,
      question: "Which work environment appeals to you?",
      options: [
        "Collaborative team projects",
        "Independent analytical work",
        "Cross-functional leadership",
        "Creative design thinking"
      ]
    }
  ];

  const challengeData = {
    title: "Weekly Data Science Challenge",
    description: "Predict customer churn using machine learning",
    difficulty: "Intermediate",
    participants: 450,
    timeLeft: "3 days",
    prize: "₹10,000 + Certificate"
  };

  return (
    <section className="min-h-screen px-6 py-20 ml-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Recommended Programs for You
          </h2>
          <p className="text-xl text-muted-foreground">
            Curated based on your profile and career goals
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {recommendedCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className={`p-6 card-elevated hover:shadow-glow transition-all cursor-pointer ${
                index === 0 ? 'ring-2 ring-primary ring-opacity-50' : ''
              }`}
              onClick={() => setSelectedCourse(course.id)}
            >
              {index === 0 && (
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  Best Match
                </Badge>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{course.partnerLogo}</div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.partner}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Career Fit</span>
                  <span className="font-semibold text-primary">{course.careerFit}%</span>
                </div>
                <Progress value={course.careerFit} className="h-2" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span>{course.effort}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm">Key Highlights</h4>
                <div className="space-y-1">
                  {course.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm">Skills You'll Learn</h4>
                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {course.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground line-through">
                      ₹{(parseInt(course.price.replace(/[₹,]/g, '')) * 1.3).toLocaleString()}
                    </div>
                    <div className="text-lg font-bold">{course.price}</div>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {course.discount}
                  </Badge>
                </div>
                
                <Button className="w-full btn-hero">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Why This is Right for You */}
        {selectedCourse && (
          <Card className="p-8 card-elevated mb-12 animate-fade-in">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Why {recommendedCourses.find(c => c.id === selectedCourse)?.name} is Right for You
              </h3>
              <p className="text-muted-foreground">AI-generated personalized explanation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {recommendedCourses.find(c => c.id === selectedCourse)?.whyRightForYou.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm">{reason}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gradient-primary text-primary-foreground rounded-lg">
                <h4 className="font-semibold mb-4">Your Success Prediction</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Completion Probability</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Placement Likelihood</span>
                    <span className="font-bold">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salary Increase</span>
                    <span className="font-bold">60-80%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Engagement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Take a Quiz */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold">Take a Quiz!</h3>
                  <p className="text-sm text-muted-foreground">Discover your ideal career path</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="question1" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="question1">Question 1</TabsTrigger>
                <TabsTrigger value="question2">Question 2</TabsTrigger>
              </TabsList>
              
              {quizQuestions.map((q, index) => (
                <TabsContent key={q.id} value={`question${q.id}`} className="space-y-4">
                  <h4 className="font-semibold">{q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => {}}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 pt-4 border-t">
              <Button className="w-full btn-hero">
                Complete Quiz & Get Results
              </Button>
            </div>
          </Card>

          {/* Weekly Challenge */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold">Weekly Challenge</h3>
                  <p className="text-sm text-muted-foreground">Test your skills & win prizes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">{challengeData.title}</h4>
                <p className="text-muted-foreground mb-3">{challengeData.description}</p>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <Badge variant="secondary">{challengeData.difficulty}</Badge>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{challengeData.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{challengeData.timeLeft} left</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Prize Pool</span>
                </div>
                <div className="text-2xl font-bold text-primary">{challengeData.prize}</div>
              </div>

              <Button className="w-full btn-hero">
                Join Challenge
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;