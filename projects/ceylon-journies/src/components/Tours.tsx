import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Star } from 'lucide-react';

const tours = [
  {
    id: 1,
    name: 'Cultural Heritage Tour',
    duration: '7 Days',
    price: '$899',
    rating: 4.8,
    maxPeople: 12,
    description: 'Explore ancient temples, UNESCO sites, and traditional villages. Visit Sigiriya, Dambulla, Kandy Temple, and Polonnaruwa.',
    highlights: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Ancient Ruins', 'Traditional Crafts'],
    category: 'Cultural'
  },
  {
    id: 2,
    name: 'Beach & Coast Adventure',
    duration: '5 Days',
    price: '$649',
    rating: 4.7,
    maxPeople: 8,
    description: 'Relax on pristine beaches, go whale watching, and explore colonial Galle Fort. Perfect for beach lovers.',
    highlights: ['Whale Watching', 'Galle Fort', 'Beach Relaxation', 'Water Sports'],
    category: 'Beach'
  },
  {
    id: 3,
    name: 'Wildlife Safari Experience',
    duration: '4 Days',
    price: '$799',
    rating: 4.9,
    maxPeople: 6,
    description: 'Spot leopards, elephants, and exotic birds in Yala and Udawalawe National Parks with expert guides.',
    highlights: ['Leopard Spotting', 'Elephant Orphanage', 'Bird Watching', 'Safari Drives'],
    category: 'Wildlife'
  },
  {
    id: 4,
    name: 'Hill Country Explorer',
    duration: '6 Days',
    price: '$749',
    rating: 4.6,
    maxPeople: 10,
    description: 'Journey through tea plantations, scenic train rides, and cool mountain climate in central highlands.',
    highlights: ['Tea Factory Tours', 'Scenic Train Ride', 'Little Adam\'s Peak', 'Strawberry Fields'],
    category: 'Mountains'
  }
];

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'cultural':
      return 'bg-primary/10 text-primary';
    case 'beach':
      return 'bg-accent/10 text-accent';
    case 'wildlife':
      return 'bg-tropical-green/10 text-tropical-green';
    case 'mountains':
      return 'bg-secondary/10 text-secondary';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const Tours = () => {
  return (
    <section id="tours" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Curated{' '}
            <span className="gradient-ocean bg-clip-text text-transparent">
              Tour Packages
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Choose from our expertly crafted tour packages designed to showcase 
            the best of Sri Lanka's culture, nature, and adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <div 
              key={tour.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="group overflow-hidden shadow-card hover:shadow-tropical transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(tour.category)}>
                      {tour.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-secondary fill-secondary" />
                      <span className="font-semibold">{tour.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
                    {tour.name}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground">
                    {tour.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Max {tour.maxPeople} people</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Tour Highlights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <MapPin className="h-3 w-3 text-primary" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary">{tour.price}</span>
                      <span className="text-muted-foreground ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tours;