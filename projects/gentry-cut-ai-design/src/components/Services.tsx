import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Sparkles, Home, Star } from "lucide-react";
import haircutImage from "@/assets/service-haircut.jpg";
import beardImage from "@/assets/service-beard.jpg";
import vipImage from "@/assets/service-vip.jpg";

const Services = () => {
  const services = [
    {
      title: "Premium Haircut",
      description: "Expert precision cutting tailored to your style and face shape. Includes consultation, wash, cut, and styling.",
      image: haircutImage,
      price: "Starting at LKR 1,500",
      icon: Scissors,
      features: ["Style consultation", "Precision cut", "Hair wash", "Styling"]
    },
    {
      title: "Beard Grooming",
      description: "Professional beard trimming, shaping, and hot towel treatment for the perfect beard.",
      image: beardImage,
      price: "Starting at LKR 1,000",
      icon: Sparkles,
      features: ["Beard trim", "Shape & design", "Hot towel", "Conditioning"]
    },
    {
      title: "VIP Experience",
      description: "The ultimate grooming package with exclusive attention and premium products.",
      image: vipImage,
      price: "LKR 5,000",
      icon: Star,
      features: ["Full haircut & style", "Beard grooming", "Facial treatment", "Complimentary refreshments"],
      isVIP: true
    }
  ];

  const additionalServices = [
    "Hair Coloring & Highlights",
    "Scalp Treatment",
    "Facial Services",
    "Traditional Shave",
    "Kids Haircut",
    "Special Event Styling"
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Our Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Premium <span className="text-gradient-gold">Grooming</span> Services
          </h3>
          <p className="text-lg text-muted-foreground">
            Experience exceptional grooming with our curated selection of services, designed for the modern gentleman.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 transition-smooth hover:shadow-gold hover:scale-105 ${
                service.isVIP ? 'ring-2 ring-primary shadow-gold' : ''
              }`}
            >
              {service.isVIP && (
                <div className="gradient-gold py-2 text-center">
                  <span className="text-sm font-semibold text-background">MOST POPULAR</span>
                </div>
              )}
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-background" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/50">
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                  <Button 
                    className="w-full"
                    variant={service.isVIP ? "default" : "outline"}
                    onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <Card className="p-8 bg-secondary/30 border-border/50">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Additional Services</h4>
              <p className="text-muted-foreground">We offer a comprehensive range of grooming services to meet all your needs.</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {additionalServices.map((service, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="justify-start py-3 px-4 text-sm bg-background/50"
              >
                {service}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Home Service Banner */}
        <Card className="mt-8 p-8 gradient-gold text-background">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Home className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1">Home Service Available</h4>
                <p className="text-background/80">We bring the luxury experience to your doorstep</p>
              </div>
            </div>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Request Home Service
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Services;
