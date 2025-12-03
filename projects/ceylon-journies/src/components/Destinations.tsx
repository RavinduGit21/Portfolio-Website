import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';

// Import destination images
import ellaImage from '@/assets/ella-destination.jpg';
import galleFortImage from '@/assets/galle-fort.jpg';
import mirissaBeachImage from '@/assets/mirissa-beach.jpg';
import kandyTempleImage from '@/assets/kandy-temple.jpg';
import yalaWildlifeImage from '@/assets/yala-wildlife.jpg';
import nuwaraEliyaImage from '@/assets/nuwara-eliya.jpg';

const destinations = [
  {
    id: 1,
    name: 'Ella',
    description: 'Famous for Nine Arch Bridge and stunning tea plantations with breathtaking mountain views.',
    image: ellaImage,
    rating: 4.8,
    activities: ['Hiking', 'Tea Plantation Tours', 'Train Rides']
  },
  {
    id: 2,
    name: 'Galle Fort',
    description: 'UNESCO World Heritage site with Dutch colonial architecture and historic charm.',
    image: galleFortImage,
    rating: 4.7,
    activities: ['Historical Tours', 'Shopping', 'Photography']
  },
  {
    id: 3,
    name: 'Mirissa Beach',
    description: 'Perfect for whale watching, surfing, and relaxing on pristine sandy beaches.',
    image: mirissaBeachImage,
    rating: 4.6,
    activities: ['Whale Watching', 'Surfing', 'Beach Relaxation']
  },
  {
    id: 4,
    name: 'Kandy Temple',
    description: 'Sacred Temple of the Tooth Relic, a significant Buddhist pilgrimage site.',
    image: kandyTempleImage,
    rating: 4.9,
    activities: ['Cultural Tours', 'Religious Sites', 'Traditional Dance']
  },
  {
    id: 5,
    name: 'Yala National Park',
    description: 'Best place for leopard spotting and diverse wildlife safari experiences.',
    image: yalaWildlifeImage,
    rating: 4.5,
    activities: ['Safari Tours', 'Wildlife Photography', 'Bird Watching']
  },
  {
    id: 6,
    name: 'Nuwara Eliya',
    description: 'Cool climate hill station known as "Little England" with beautiful tea estates.',
    image: nuwaraEliyaImage,
    rating: 4.7,
    activities: ['Tea Factory Tours', 'Golf', 'Strawberry Picking']
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Explore Sri Lanka's{' '}
            <span className="gradient-hero bg-clip-text text-transparent">
              Top Destinations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            From ancient temples to pristine beaches, discover the diverse beauty 
            of Sri Lanka's most captivating locations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="group overflow-hidden shadow-card hover:shadow-tropical transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-secondary fill-secondary" />
                    <span className="text-sm font-semibold">{destination.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-display">
                    <MapPin className="h-5 w-5 text-primary" />
                    {destination.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {destination.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity) => (
                      <span
                        key={activity}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full bg-gradient-ocean hover:opacity-90 transition-opacity"
                  >
                    <Link to={
                      destination.name === 'Ella' ? '/destinations/ella' :
                      destination.name === 'Galle Fort' ? '/destinations/galle-fort' :
                      destination.name === 'Mirissa Beach' ? '/destinations/mirissa-beach' :
                      destination.name === 'Kandy Temple' ? '/destinations/kandy-temple' :
                      destination.name === 'Yala National Park' ? '/destinations/yala-national-park' :
                      destination.name === 'Nuwara Eliya' ? '/destinations/nuwara-eliya' :
                      '#'
                    }>
                      View More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;