import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Camera, Brain, Award, Leaf, Users, Shield, MapPin, Zap } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Community Reporting",
      description: "Submit geotagged photos and detailed incident reports directly from your device. Help build a comprehensive database of mangrove threats.",
      gradient: "bg-gradient-mangrove"
    },
    {
      icon: Brain,
      title: "AI-Powered Validation",
      description: "Advanced machine learning algorithms analyze reports and satellite data to verify incidents with high accuracy and confidence scores.",
      gradient: "bg-gradient-ocean"
    },
    {
      icon: Award,
      title: "Rewards",
      description: "Earn points, unlock vouchers, and compete on leaderboards. Redeem rewards from sponsors and partners.",
      gradient: "bg-gradient-mangrove"
    },
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Verified reports are immediately shared with authorities and conservation organizations for rapid response and enforcement action.",
      gradient: "bg-gradient-ocean"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with coastal communities, researchers, and conservationists. Share knowledge and collaborate on protection efforts.",
      gradient: "bg-gradient-mangrove"
    },
    {
      icon: Zap,
      title: "Instant Impact",
      description: "See the immediate effect of your contributions through impact dashboards showing mangroves protected and CO₂ offset achieved.",
      gradient: "bg-gradient-ocean"
    }
  ];

  const impactStats = [
    { icon: Leaf, label: "Mangrove Areas Monitored", value: "1,247 km²", color: "text-green-600" },
    { icon: Shield, label: "Illegal Activities Prevented", value: "400", color: "text-blue-600" },
    { icon: Users, label: "Active Community Members", value: "4,552", color: "text-purple-600" },
    { icon: MapPin, label: "Reports This Month", value: "902", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How PrakritiRakshak Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our community-powered platform combines technology with local knowledge 
                to protect and restore mangroves more effectively than ever before.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Collective Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                Together, we're making a measurable difference in mangrove conservation worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-mangrove rounded-2xl mb-6 group-hover:shadow-glow transition-bounce">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-3">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Protect Our Planet?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Join thousands of guardians already making a difference. 
              Your first report could save an entire ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-12 py-4"
              >
                Join the Movement
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-12 py-4 font-semibold"
              >
                Explore Dashboard
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">PrakritiRakshak</span>
            </div>
            <div className="text-center text-primary-foreground/80">
              <p className="mb-4">
                Empowering communities to protect mangrove ecosystems through technology and collaboration.
              </p>
              <p className="text-sm">
                Built by Tech Phantoms for DAAICT Hackout'25 under theme: blue carbon ecosystem
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
