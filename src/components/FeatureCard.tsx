import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient = "bg-gradient-mangrove" }: FeatureCardProps) => {
  return (
    <Card className="p-6 hover:shadow-medium transition-smooth group cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 ${gradient} rounded-lg mb-4 group-hover:shadow-glow transition-bounce mx-auto`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
};

export default FeatureCard;