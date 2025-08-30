import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, MapPin, Camera, Users, Star, Medal, Shield } from 'lucide-react';
import Header from '@/components/Header';

const Dashboard = () => {
  const userPoints = 2340;
  const nextLevelPoints = 3000;
  const progress = (userPoints / nextLevelPoints) * 100;

  const leaderboard = [
    { rank: 1, name: 'Maria Santos', points: 4520, badge: 'Gold Guardian' },
    { rank: 2, name: 'Ahmed Hassan', points: 3890, badge: 'Silver Protector' },
    { rank: 3, name: 'Chen Wei', points: 3456, badge: 'Bronze Watcher' },
    { rank: 4, name: 'You', points: 2340, badge: 'Green Volunteer', isCurrentUser: true },
    { rank: 5, name: 'Rosa Martinez', points: 2180, badge: 'Eco Supporter' },
  ];

  const badges = [
    { icon: Camera, name: 'First Report', description: 'Submitted your first incident report', earned: true },
    { icon: Users, name: 'Community Hero', description: 'Helped verify 10 community reports', earned: true },
    { icon: MapPin, name: 'Location Scout', description: 'Reported from 5 different locations', earned: true },
    { icon: Shield, name: 'Mangrove Guardian', description: 'Prevented illegal cutting incident', earned: false },
    { icon: Star, name: 'Top Contributor', description: 'Ranked in top 10 this month', earned: false },
    { icon: Medal, name: 'Veteran Protector', description: 'Active for 6 months', earned: false },
  ];

  const recentReports = [
    { id: 1, type: 'Illegal Cutting', location: 'Sundarbans Delta', status: 'Verified', confidence: 95 },
    { id: 2, type: 'Pollution', location: 'Coastal Bay', status: 'Under Review', confidence: 78 },
    { id: 3, type: 'Land Reclamation', location: 'Mangrove Creek', status: 'Verified', confidence: 92 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-500';
      case 'Under Review': return 'bg-yellow-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Guardian!</h1>
          <p className="text-muted-foreground">Your conservation efforts are making a real difference.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Points & Badges */}
          <div className="lg:col-span-2 space-y-6">
            {/* Points Progress */}
            <Card className="p-6 bg-gradient-mangrove text-primary-foreground shadow-medium">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{userPoints.toLocaleString()} Points</h2>
                  <p className="opacity-90">Level 4: Green Volunteer</p>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm opacity-90">
                  <span>Progress to next level</span>
                  <span>{nextLevelPoints - userPoints} points to go</span>
                </div>
                <Progress value={progress} className="h-3 bg-primary-foreground/20" />
              </div>
            </Card>

            {/* Badges & Achievements */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Badges & Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-smooth ${
                        badge.earned 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/50 border-border opacity-60'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        badge.earned ? 'bg-gradient-mangrove' : 'bg-muted'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          badge.earned ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                      {badge.earned && (
                        <Badge variant="secondary" className="text-xs">Earned</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Recent Reports */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Your Recent Reports
              </h3>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {report.confidence}% confidence
                      </Badge>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`} />
                        <span className="text-sm">{report.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Reports
              </Button>
            </Card>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Community Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                      user.isCurrentUser 
                        ? 'bg-gradient-mangrove text-primary-foreground shadow-medium' 
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-white' :
                      user.rank === 2 ? 'bg-gray-400 text-white' :
                      user.rank === 3 ? 'bg-orange-500 text-white' :
                      user.isCurrentUser ? 'bg-primary-foreground/20' : 'bg-muted'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{user.name}</h4>
                      <p className={`text-xs ${user.isCurrentUser ? 'opacity-80' : 'text-muted-foreground'}`}>
                        {user.badge}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{user.points.toLocaleString()}</div>
                      <div className={`text-xs ${user.isCurrentUser ? 'opacity-80' : 'text-muted-foreground'}`}>
                        points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <span className="mr-2">View Full Leaderboard</span>
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="hero" className="w-full justify-start" size="lg">
                  <Camera className="w-4 h-4 mr-2" />
                  Report New Incident
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community Chat
                </Button>
              </div>
            </Card>

            {/* Rewards Section */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Rewards
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rewards Left</span>
                  <span className="text-xl font-bold text-primary">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Redeemed Rewards</span>
                  <span className="text-xl font-bold text-primary">7</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;