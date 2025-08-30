import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Edit2, 
  Camera, 
  Award, 
  MapPin,
  Shield,
  Star,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    joinedDate: '2024-03-15',
    points: 2340,
    level: 'Green Volunteer',
    reportsSubmitted: 12,
    reportsVerified: 8,
    location: 'Coastal Bay, Philippines'
  });

  const achievements = [
    { 
      icon: Camera, 
      name: 'First Report', 
      description: 'Submitted your first incident report',
      date: '2024-03-16',
      points: 100
    },
    { 
      icon: Shield, 
      name: 'Community Hero', 
      description: 'Helped verify 10 community reports',
      date: '2024-06-22',
      points: 250
    },
    { 
      icon: MapPin, 
      name: 'Location Scout', 
      description: 'Reported from 5 different locations',
      date: '2024-07-10',
      points: 300
    },
    { 
      icon: Star, 
      name: 'Consistency Champion', 
      description: 'Submitted reports for 30 consecutive days',
      date: '2024-08-15',
      points: 500
    }
  ];

  const rewardHistory = [
    { 
      type: 'voucher', 
      name: 'Eco Store Voucher', 
      value: '$25', 
      date: '2024-08-20',
      status: 'redeemed'
    },
    { 
      type: 'badge', 
      name: 'Digital Conservation Certificate', 
      value: 'Certificate', 
      date: '2024-07-15',
      status: 'earned'
    },
    { 
      type: 'voucher', 
      name: 'Local Restaurant Discount', 
      value: '20% off', 
      date: '2024-06-30',
      status: 'redeemed'
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and track your conservation impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="bg-gradient-mangrove text-primary-foreground text-xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.level}</p>
                    <Badge variant="secondary" className="mt-1">
                      {profileData.points.toLocaleString()} points
                    </Badge>
                  </div>
                </div>
                
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{profileData.reportsSubmitted}</div>
                  <div className="text-sm text-muted-foreground">Reports Submitted</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{profileData.reportsVerified}</div>
                  <div className="text-sm text-muted-foreground">Reports Verified</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="text-foreground">
                    {new Date(profileData.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{profileData.location}</span>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-mangrove rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">+{achievement.points} pts</Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Impact Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mangroves Protected</span>
                  <span className="font-semibold">2.3 km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CO₂ Offset</span>
                  <span className="font-semibold">45 tons</span>
                </div>
              </div>
            </Card>

            {/* Reward History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Rewards
              </h3>
              <div className="space-y-3">
                {rewardHistory.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {reward.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(reward.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{reward.value}</div>
                      <Badge 
                        variant="secondary" 
                        className={reward.status === 'redeemed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {reward.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Rewards
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  Rewards Claimed
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Rewards Unredeemed
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;