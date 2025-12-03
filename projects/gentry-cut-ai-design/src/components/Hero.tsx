import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import heroImage from "@/assets/hero-salon.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-card/50 backdrop-blur-sm">
            <Scissors className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Premium Men's Grooming</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            The <span className="text-gradient-gold">Gentry</span> Cut
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience luxury grooming in Kirindiwela. Where tradition meets modern elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={scrollToBooking}
              className="gradient-gold shadow-gold text-lg px-8"
            >
              Book Your Appointment
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 border-primary/50 hover:bg-primary/10"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
