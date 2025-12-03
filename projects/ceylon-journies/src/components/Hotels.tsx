import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Wifi, Car, Coffee, Waves } from 'lucide-react';

// Import hotel images
import colomboHotelImage from '@/assets/colombohotel.jpg';
import mirissaHotelImage from '@/assets/mirissahotel.jpg';
import kandyHotelImage from '@/assets/kandyhotel.jpg';
import ellaHotelImage from '@/assets/ellahotel.jpg';
import yalaHotelImage from '@/assets/yallahotel.jpg';
import galleHotelImage from '@/assets/gallehotel.jpg';

// Booking function to handle hotel reservations
const handleHotelBooking = (hotelId: number, hotelName: string) => {
  // Booking URLs for each hotel - replace with actual booking links
  const bookingUrls: { [key: number]: string } = {
    1: "https://www.booking.com/hotel/lk/shangri-la-colombo.en-gb.html?aid=311984&label=shangri-la-colombo-orHUBtuTpDAVh4cMItOAiQS732533294608%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-397266678200%3Alp9069783%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YbSsBl3MCvHsD8UKUHIRFxY&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2214877&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071158&srpvid=2eef689861a5087c&type=total&ucfs=1&", // Shangri-La Colombo - Add your booking URL here
    2: "https://www.booking.com/hotel/lk/villa-saltasia.html?aid=356980&label=gog235jc-10CAsohQFCDnZpbGxhLXNhbHRhc2lhSDNYA2iFAYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAagCAbgCzpflxgbAAgHSAiQyNDAzOTc5MC1lMWIxLTQ3OWEtYWYyNy1mMzFhOWUyMWNiNGHYAgHgAgE&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2228935&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071189&srpvid=721968a8ed01002b&type=total&ucfs=1&", // Saltasia Boutique Beach - Add your booking URL here
    3: "https://www.booking.com/hotel/lk/chaaya-citadel-kandy.en-gb.html?aid=311984&label=chaaya-citadel-kandy-MIjmLxFFwj3XiH0UOFdpIgS162167704683%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-42358041073%3Alp9069783%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXORK0YJiVoOxcWODxYDaAA&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2222251&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071218&srpvid=661c68b62d22033d&type=total&ucfs=1&", // Cinnamon Citadel Kandy - Add your booking URL here
    4: "https://www.booking.com/hotel/lk/tip-top-boutique-ella.en-gb.html?aid=311984&label=tip-top-boutique-ella-qs8ayTOf4Oa1E%2AQxYOAxjgS589580219969%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1641812259482%3Alp9069783%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YbSsBl3MCvHsD8UKUHIRFxY&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2216722&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071242&srpvid=d4b268c2efac01c6&type=total&ucfs=1&", // Tip Top Ella Boutique Hotel - Add your booking URL here
    5: "https://www.booking.com/hotel/lk/hilton-yala-resort.en-gb.html?aid=311984&label=hilton-yala-resort-lOhzKeYa82efMQvxdxiytQS697425165286%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-877206491643%3Alp9069783%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXORK0YJiVoOxcWODxYDaAA&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2240952&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071265&srpvid=5f3668cefa1d0002&type=total&ucfs=1&", // Hilton Yala Resort - Add your booking URL here
    6: "https://www.booking.com/hotel/lk/le-grand-galle.en-gb.html?aid=311984&label=le-grand-galle-DC06yMS1EWMNi47N3Gj5SwS393127741918%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-466421019974%3Alp9069783%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YbSsBl3MCvHsD8UKUHIRFxY&sid=4b093e951aa0b0f5b77df4d3edf49bc1&dest_id=-2217578&dest_type=city&dist=0&group_adults=4&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=4&req_children=0&room1=A%2CA%2CA%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759071280&srpvid=85cd68d68350006a&type=total&ucfs=1&", // Le Grand Galle - Add your booking URL here
  };

  const bookingUrl = bookingUrls[hotelId];
  
  if (bookingUrl) {
    // Open booking URL in a new tab
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  } else {
    // Fallback: show alert if URL not configured
    alert(`Booking for ${hotelName} is not yet configured. Please contact us directly.`);
  }
};

const hotels = [
  {
    id: 1,
    name: 'Shangri-La Colombo',
    location: 'Colombo',
    description: 'Luxury 5-star resort with world-class amenities and stunning ocean views.',
    image: colomboHotelImage,
    rating: 4.5,
    price: '$180',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    category: 'Luxury'
  },
  {
    id: 2,
    name: 'Villa Saltasia',
    location: 'Mirissa',
    description: 'Boutique beachfront villa perfect for romantic getaways and surfing.',
    image: mirissaHotelImage,
    rating: 4.2,
    price: '$85',
    amenities: ['WiFi', 'Beach Access', 'Restaurant', 'Parking'],
    category: 'Beach Resort'
  },
  {
    id: 3,
    name: 'Chaaya Citadel Kandy',
    location: 'Kandy',
    description: 'Historic hotel near Temple of Tooth with traditional Sri Lankan hospitality.',
    image: kandyHotelImage,
    rating: 4.3,
    price: '$95',
    amenities: ['WiFi', 'Cultural Tours', 'Restaurant', 'Garden'],
    category: 'Heritage'
  },
  {
    id: 4,
    name: 'Tip Top Ella Boutique Hotel',
    location: 'Ella',
    description: 'Cozy mountain lodge with panoramic views of tea plantations and valleys.',
    image: ellaHotelImage,
    rating: 4.1,
    price: '$45',
    amenities: ['WiFi', 'Mountain Views', 'Tea Tours', 'Hiking'],
    category: 'Mountain Lodge'
  },
  {
    id: 5,
    name: 'Hilton Yala Resort',
    location: 'Yala',
    description: 'Luxury safari resort with stunning wildlife encounters and modern amenities.',
    image: yalaHotelImage,
    rating: 4.6,
    price: '$320',
    amenities: ['Safari Tours', 'Restaurant', 'Wildlife Viewing', 'Pool'],
    category: 'Safari Lodge'
  },
  {
    id: 6,
    name: 'Le Grand Galle',
    location: 'Galle',
    description: 'Beautifully restored colonial mansion within the historic Galle Fort.',
    image: galleHotelImage,
    rating: 4.4,
    price: '$120',
    amenities: ['WiFi', 'Historic Tours', 'Restaurant', 'Art Gallery'],
    category: 'Boutique'
  }
];

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'wifi':
      return <Wifi className="h-4 w-4" />;
    case 'parking':
      return <Car className="h-4 w-4" />;
    case 'restaurant':
      return <Coffee className="h-4 w-4" />;
    case 'beach access':
      return <Waves className="h-4 w-4" />;
    default:
      return <Star className="h-4 w-4" />;
  }
};

const Hotels = () => {
  return (
    <section id="hotels" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Premium{' '}
            <span className="gradient-sunset bg-clip-text text-transparent">
              Hotels & Resorts
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Experience Sri Lankan hospitality at its finest with our carefully selected 
            collection of luxury hotels and unique accommodations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div 
              key={hotel.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="group overflow-hidden shadow-card hover:shadow-tropical transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {hotel.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 dark:bg-background/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 border border-border/50">
                    <Star className="h-4 w-4 text-secondary fill-secondary" />
                    <span className="text-sm font-semibold text-foreground">{hotel.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl font-display">
                    <span>{hotel.name}</span>
                    <span className="text-lg font-bold text-primary">{hotel.price}/night</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </CardDescription>
                  <CardDescription className="text-muted-foreground">
                    {hotel.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-hero hover:opacity-90 transition-opacity"
                      onClick={() => handleHotelBooking(hotel.id, hotel.name)}
                    >
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotels;