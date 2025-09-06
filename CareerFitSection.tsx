import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import { UserData } from "../Dashboard";

interface CareerFitSectionProps {
  userData: UserData | null;
}

const CareerFitSection = ({ userData }: CareerFitSectionProps) => {
  // Mock data for radar chart
  const skillsData = [
    { skill: 'Programming', current: 65, required: 90 },
    { skill: 'Analytics', current: 40, required: 85 },
    { skill: 'Communication', current: 80, required: 70 },
    { skill: 'Problem Solving', current: 75, required: 95 },
    { skill: 'Domain Knowledge', current: 50, required: 80 },
    { skill: 'Tools & Tech', current: 60, required: 85 },
  ];

  // Mock career fit data
  const careerFitData = [
    { role: "Data Scientist", fit: 85, growth: "+40%", salary: "₹12-18L" },
    { role: "Full Stack Developer", fit: 78, growth: "+35%", salary: "₹8-15L" },
    { role: "Product Analyst", fit: 72, growth: "+45%", salary: "₹10-16L" },
    { role: "Business Analyst", fit: 68, growth: "+30%", salary: "₹8-14L" },
  ];

  const timelineData = [
    { 
      period: "Now", 
      role: "Current Profile",
      skills: userData?.currentSkills.length || 0,
      status: "current"
    },
    { 
      period: "6 Months", 
      role: "Junior Data Analyst",
      skills: 8,
      status: "achievable"
    },
    { 
      period: "1 Year", 
      role: "Data Scientist",
      skills: 12,
      status: "target"
    },
    { 
      period: "3 Years", 
      role: "Senior Data Scientist",
      skills: 18,
      status: "aspirational"
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 ml-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Your Career Fit Analysis
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover where you stand and where you can go
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Radar Chart */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Skills Analysis</h3>
              <p className="text-muted-foreground">Current vs Required Skills</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Required"
                    dataKey="required"
                    stroke="hsl(var(--gray-400))"
                    fill="hsl(var(--gray-400))"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm">Current Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm">Required Skills</span>
              </div>
            </div>
          </Card>

          {/* Role Fit Cards */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Role Compatibility</h3>
              <p className="text-muted-foreground">Best matching career paths</p>
            </div>

            {careerFitData.map((role, index) => (
              <Card key={role.role} className="p-4 card-elevated hover:shadow-glow transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{role.role}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {role.growth} Growth
                      </span>
                      <span>{role.salary}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{role.fit}%</div>
                    <div className="text-sm text-muted-foreground">Match</div>
                  </div>
                </div>
                
                <Progress value={role.fit} className="h-2" />
                
                {index === 0 && (
                  <Badge className="mt-3" variant="default">
                    Best Match
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <Card className="p-8 card-elevated mb-8">
          <div className="mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-2">Career Path Timeline</h3>
            <p className="text-muted-foreground">Your projected career progression</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-primary transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-4 gap-4 relative z-10">
              {timelineData.map((item, index) => (
                <div key={item.period} className="text-center">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full border-4 flex items-center justify-center mb-4 transition-all
                    ${item.status === 'current' ? 'bg-primary border-primary text-primary-foreground' :
                      item.status === 'achievable' ? 'bg-card border-primary text-primary' :
                      item.status === 'target' ? 'bg-card border-accent text-accent' :
                      'bg-card border-gray-300 text-gray-500'}
                  `}>
                    {item.status === 'current' ? <CheckCircle className="w-6 h-6" /> :
                     item.status === 'achievable' ? <Clock className="w-6 h-6" /> :
                     item.status === 'target' ? <Target className="w-6 h-6" /> :
                     <TrendingUp className="w-6 h-6" />}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-bold text-primary">{item.period}</div>
                    <div className="font-semibold">{item.role}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.skills} Skills
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Suggestions */}
        <Card className="p-6 card-elevated">
          <div className="mb-6">
            <h3 className="text-2xl font-heading font-semibold mb-2">Skill Gap Analysis</h3>
            <p className="text-muted-foreground">Recommendations to reach your target role</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-subtle rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Python Fundamentals</h4>
                  <p className="text-sm text-muted-foreground">Close 25% skill gap</p>
                </div>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="p-4 bg-gradient-subtle rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Machine Learning</h4>
                  <p className="text-sm text-muted-foreground">Close 30% skill gap</p>
                </div>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="p-4 bg-gradient-subtle rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">SQL & Databases</h4>
                  <p className="text-sm text-muted-foreground">Close 20% skill gap</p>
                </div>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CareerFitSection;