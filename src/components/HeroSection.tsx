import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Camera, Award, Users } from 'lucide-react';
import heroImage from '@/assets/mangrove-hero.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Community Members', value: '4,552' },
    { icon: Camera, label: 'Reports Submitted', value: '2,356' },
    { icon: Shield, label: 'Mangroves Protected', value: '1247 km²' },
    { icon: Award, label: 'Conservation Rewards', value: '35' },
  ];

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt="Mangrove forest from aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Protect Mangroves
              <span className="block text-accent">Together</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              Join our community-powered monitoring system to protect vital mangrove ecosystems. 
              Report incidents, earn rewards, and make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="text-lg px-8 py-4"
              >
                Start Protecting Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/reports')}
                className="text-lg px-8 py-4 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-mangrove rounded-xl mb-4 group-hover:shadow-glow transition-bounce">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;