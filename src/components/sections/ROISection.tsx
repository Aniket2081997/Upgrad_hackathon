import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, MapPin, Gift, Phone, Mail } from "lucide-react";

const ROISection = () => {
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Mock data for charts
  const costVsSalaryData = [
    { category: "Program Cost", amount: 150000 },
    { category: "Current Salary", amount: 600000 },
    { category: "Expected Salary", amount: 1200000 },
    { category: "Salary Uplift", amount: 600000 },
  ];

  const salaryBenchmarkData = [
    { experience: "0-2 Years", current: 400000, afterProgram: 800000 },
    { experience: "2-5 Years", current: 700000, afterProgram: 1400000 },
    { experience: "5-8 Years", current: 1200000, afterProgram: 2000000 },
    { experience: "8+ Years", current: 1800000, afterProgram: 2800000 },
  ];

  const placementData = [
    { name: "Placed", value: 92, color: "hsl(var(--primary))" },
    { name: "In Process", value: 6, color: "hsl(var(--accent))" },
    { name: "Other", value: 2, color: "hsl(var(--gray-300))" },
  ];

  const marketTrendsData = [
    { month: "Jan", demand: 120 },
    { month: "Feb", demand: 135 },
    { month: "Mar", demand: 150 },
    { month: "Apr", demand: 165 },
    { month: "May", demand: 180 },
    { month: "Jun", demand: 195 },
  ];

  const handleDiscountClaim = () => {
    console.log("Lead form data:", leadFormData);
    setIsDiscountDialogOpen(false);
    // Here you would typically send this data to your backend
  };

  return (
    <section className="min-h-screen px-6 py-20 ml-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Career Investment & Returns
          </h2>
          <p className="text-xl text-muted-foreground">
            See the tangible impact on your career and finances
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Program Cost vs Salary Uplift */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Investment vs Returns</h3>
              <p className="text-muted-foreground">Your potential ROI breakdown</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costVsSalaryData}>
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${(value as number).toLocaleString()}`, ""]}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-gradient-subtle rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">ROI in 12 months:</span>
                <Badge className="text-lg px-3 py-1">400%</Badge>
              </div>
            </div>
          </Card>

          {/* Alumni Salary Benchmarking */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Alumni Salary Growth</h3>
              <p className="text-muted-foreground">Real outcomes from our learners</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryBenchmarkData}>
                  <XAxis dataKey="experience" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${(value as number / 100000).toFixed(0)}L`, ""]}
                  />
                  <Bar 
                    dataKey="current" 
                    fill="hsl(var(--gray-400))" 
                    name="Before upGrad"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="afterProgram" 
                    fill="hsl(var(--primary))" 
                    name="After upGrad"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm">Before upGrad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm">After upGrad</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Placement Probability */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Placement Success Rate</h3>
              <p className="text-muted-foreground">Our track record speaks for itself</p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {placementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              {placementData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-3xl font-bold text-primary">92%</div>
              <div className="text-sm text-muted-foreground">Students placed within 6 months</div>
            </div>
          </Card>

          {/* Market Trends */}
          <Card className="p-6 card-elevated">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold mb-2">Market Demand Trends</h3>
              <p className="text-muted-foreground">Growing opportunities in your field</p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrendsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Growth"]} />
                  <Line 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-lg font-bold">95%</div>
                <div className="text-xs text-muted-foreground">Job Growth</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="text-lg font-bold">50K+</div>
                <div className="text-xs text-muted-foreground">Open Roles</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-lg font-bold">15+</div>
                <div className="text-xs text-muted-foreground">Cities</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Discount Banner */}
        <Card className="p-8 bg-gradient-primary text-primary-foreground card-elevated animate-pulse-glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">
                  🎁 Limited Time Offer!
                </h3>
                <p className="text-lg opacity-90">
                  Get up to 30% discount on your program enrollment
                </p>
                <p className="text-sm opacity-75">
                  Valid for next 48 hours only • Save up to ₹45,000
                </p>
              </div>
            </div>
            
            <Dialog open={isDiscountDialogOpen} onOpenChange={setIsDiscountDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3 animate-bounce"
                >
                  Redeem Your Discount
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Claim Your Discount
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={leadFormData.name}
                      onChange={(e) => setLeadFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={leadFormData.email}
                      onChange={(e) => setLeadFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={leadFormData.phone}
                      onChange={(e) => setLeadFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleDiscountClaim}
                      disabled={!leadFormData.name || !leadFormData.email || !leadFormData.phone}
                      className="btn-hero flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Book a Call
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={handleDiscountClaim}
                      disabled={!leadFormData.name || !leadFormData.email}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Details
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ROISection;