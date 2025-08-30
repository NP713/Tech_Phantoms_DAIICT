import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Camera, 
  MapPin, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportData, setReportData] = useState({
    category: '',
    description: '',
    location: '',
    photo: null as File | null
  });

  const categories = [
    'Illegal Cutting',
    'Pollution/Dumping',
    'Land Reclamation',
    'Overfishing',
    'Coral Damage',
    'Other'
  ];

  const pastReports = [
    {
      id: 1,
      category: 'Illegal Cutting',
      description: 'Large-scale mangrove clearing observed in protected area',
      location: 'Sundarbans Delta, Bangladesh',
      date: '2024-08-25',
      status: 'Verified',
      confidence: 95,
      photo: '/api/placeholder/300/200'
    },
    {
      id: 2,
      category: 'Pollution',
      description: 'Plastic waste and chemical runoff affecting mangrove roots',
      location: 'Coastal Bay, Philippines',
      date: '2024-08-22',
      status: 'Under Review',
      confidence: 78,
      photo: '/api/placeholder/300/200'
    },
    {
      id: 3,
      category: 'Land Reclamation',
      description: 'Construction equipment destroying mangrove habitat',
      location: 'Mangrove Creek, Indonesia',
      date: '2024-08-20',
      status: 'Verified',
      confidence: 92,
      photo: '/api/placeholder/300/200'
    },
    {
      id: 4,
      category: 'Illegal Cutting',
      description: 'Small boat harvesting mangrove wood without permit',
      location: 'Coastal Reserve, Malaysia',
      date: '2024-08-18',
      status: 'Rejected',
      confidence: 45,
      photo: '/api/placeholder/300/200'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted successfully!",
        description: "Thank you for helping protect our mangroves. Your report is being reviewed.",
      });
      setReportData({ category: '', description: '', location: '', photo: null });
    }, 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportData({ ...reportData, photo: file });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Under Review': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Incident Reports</h1>
          <p className="text-muted-foreground">
            Help protect mangrove ecosystems by reporting incidents and tracking your contributions.
          </p>
        </div>

        <Tabs defaultValue="new-report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="new-report">New Report</TabsTrigger>
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="new-report" className="space-y-6">
            <Card className="p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
                <Camera className="w-5 h-5" />
                Submit New Incident Report
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Incident Category</Label>
                  <Select 
                    value={reportData.category} 
                    onValueChange={(value) => setReportData({ ...reportData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      type="text"
                      placeholder="Describe the location (GPS coordinates will be auto-captured)"
                      className="pl-10"
                      value={reportData.location}
                      onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your GPS location will be automatically recorded for accuracy
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of the incident, including time, people involved, and any other relevant information..."
                    rows={4}
                    value={reportData.description}
                    onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo Evidence</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      required
                    />
                    <label 
                      htmlFor="photo" 
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {reportData.photo ? (
                        <div className="flex items-center gap-2 text-primary">
                          <ImageIcon className="w-6 h-6" />
                          <span>{reportData.photo.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Click to upload photo evidence
                          </span>
                          <span className="text-xs text-muted-foreground">
                            JPG, PNG up to 10MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="my-reports" className="space-y-6">
            <div className="grid gap-6">
              {pastReports.map((report) => (
                <Card key={report.id} className="p-6 hover:shadow-medium transition-smooth">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Photo Evidence</span>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{report.category}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {report.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-foreground">{report.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Submitted on {new Date(report.date).toLocaleDateString()}
                        </span>
                        <Badge variant="secondary">
                          {report.confidence}% AI Confidence
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;