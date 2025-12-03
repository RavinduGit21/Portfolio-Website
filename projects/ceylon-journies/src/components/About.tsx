import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, MapPin, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Travelers' },
    { icon: MapPin, value: '50+', label: 'Destinations' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Heart, value: '98%', label: 'Customer Satisfaction' }
  ];

  const values = [
    {
      title: 'Authentic Experiences',
      description: 'We provide genuine local experiences that connect you with Sri Lankan culture and traditions.',
      icon: Heart
    },
    {
      title: 'Expert Guidance',
      description: 'Our experienced local guides ensure you discover hidden gems and create unforgettable memories.',
      icon: Award
    },
    {
      title: 'Sustainable Tourism',
      description: 'We are committed to responsible travel that benefits local communities and preserves natural beauty.',
      icon: MapPin
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            About{' '}
            <span className="gradient-hero bg-clip-text text-transparent">
              Serranid Journeys
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            For over 15 years, Serranid Journeys has been Sri Lanka's premier travel partner, 
            crafting extraordinary experiences that showcase the true essence of the pearl of the Indian Ocean. 
            We believe every journey should be transformative, authentic, and unforgettable.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="p-6 shadow-card hover:shadow-tropical transition-all duration-300">
                <CardContent className="p-0">
                  <div className="inline-flex p-3 rounded-full bg-gradient-hero mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
              Our Mission
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To showcase Sri Lanka's incredible diversity - from ancient kingdoms and sacred temples 
              to pristine beaches and lush mountains - while supporting local communities and 
              preserving the natural heritage for future generations.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We curate personalized experiences that go beyond typical tourism, allowing you to 
              connect with local cultures, taste authentic cuisine, and create meaningful memories 
              that last a lifetime.
            </p>
            <Button className="bg-gradient-sunset hover:opacity-90 transition-opacity">
              Learn More About Us
            </Button>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="p-6 shadow-card hover:shadow-tropical transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                          {value.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center bg-gradient-hero rounded-2xl p-8 sm:p-12 text-white animate-fade-in">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
            Why Choose Serranid Journeys?
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
            We're not just another travel agency. We're your local friends who are passionate 
            about sharing the magic of Sri Lanka with the world. Every detail matters, 
            every experience is crafted with love.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-primary transition-colors"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;