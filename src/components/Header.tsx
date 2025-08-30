import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf, User, MapPin, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Leaf },
    { name: 'Dashboard', href: '/dashboard', icon: Trophy },
    { name: 'Reports', href: '/reports', icon: MapPin },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-mangrove rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">PrakritiRakshak</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.href)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate('/signup')}>
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-smooth ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <div className="pt-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="hero" size="sm" className="w-full" onClick={() => navigate('/signup')}>
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;