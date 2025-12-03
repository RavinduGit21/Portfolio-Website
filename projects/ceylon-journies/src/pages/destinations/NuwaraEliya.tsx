import { ArrowLeft, MapPin, Star, Coffee, Mountain, Flower, Clock, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import Nuwara Eliya images
import nuwaraHero from '@/assets/nuwara-eliya.jpg';
import nuwara1 from '@/assets/nuwara-eliya1.jpg';

const NuwaraEliya = () => {
  const experiences = [
    {
      icon: Coffee,
      title: "Tea Plantations",
      description: "Explore world-renowned tea estates and witness the art of Ceylon tea production in misty mountain plantations.",
      image: nuwaraHero,
      stats: { duration: "Half Day", difficulty: "Easy", elevation: "1,868m" }
    },
    {
      icon: Mountain,
      title: "Hill Station Life",
      description: "Experience the charm of 'Little England' with colonial architecture, cool climate, and scenic mountain vistas.",
      image: nuwara1,
      stats: { duration: "Full Day", difficulty: "Easy", founded: "1846" }
    },
    {
      icon: Flower,
      title: "Gardens & Golf",
      description: "Stroll through beautiful botanical gardens and enjoy golf on one of Asia's finest courses amidst stunning landscapes.",
      image: nuwaraHero,
      stats: { duration: "Variable", difficulty: "Easy", altitude: "1,868m" }
    }
  ];

  const quickFacts = [
    { icon: ThermometerSun, label: "Climate", value: "16-20°C Year Round" },
    { icon: MapPin, label: "Elevation", value: "1,868 meters" },
    { icon: Clock, label: "Best Time", value: "Mar - May" },
    { icon: Coffee, label: "From Colombo", value: "6 hours" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Immersive Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={nuwaraHero} 
            alt="Nuwara Eliya tea plantations"
            className="w-full h-full object-cover scale-105 animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Destinations
          </Link>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tight">
            Nuwara Eliya
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where emerald tea gardens carpet rolling hills, and the colonial charm 
            of 'Little England' creates a timeless mountain sanctuary
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <Star className="h-5 w-5 text-secondary fill-secondary" />
              <span className="text-white font-semibold text-lg">4.7</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-ocean text-white border-none px-4 py-2 text-sm">
              Little England
            </Badge>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickFacts.map((fact, index) => (
              <div key={index} className="text-center group">
                <div className="bg-background rounded-2xl p-6 shadow-sm group-hover:shadow-card transition-shadow duration-300">
                  <fact.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-sm text-muted-foreground mb-1">{fact.label}</div>
                  <div className="font-display font-bold text-foreground">{fact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-6">
              Nuwara Eliya
              <span className="gradient-hero bg-clip-text text-transparent"> Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the cool mountain charm of Sri Lanka's most beloved hill station
            </p>
          </div>
          
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-tropical group">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-2xl p-3">
                      <experience.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                      {experience.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(experience.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-muted-foreground capitalize mb-1">{key}</div>
                        <div className="font-display font-semibold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="bg-gradient-sunset hover:opacity-90 transition-opacity">
                    Explore {experience.title}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
              Begin Your Mountain Journey
            </h3>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              From world-famous tea plantations to colonial charm, Nuwara Eliya offers 
              a refreshing escape into Sri Lanka's cool and captivating hill country.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-ocean text-white hover:opacity-90 transition-opacity">
                <Coffee className="h-5 w-5 mr-2" />
                Plan My Hill Country Tour
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Mountain className="h-5 w-5 mr-2" />
                View Photo Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NuwaraEliya;