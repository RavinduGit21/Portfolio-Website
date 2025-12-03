import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-sigiriya.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful Sri Lankan landscape with Sigiriya Rock"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Discover Sri Lanka with{' '}
            <span className="gradient-sunset bg-clip-text text-transparent">
              Ceylon Journeys
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-body">
            Experience the pearl of the Indian Ocean through authentic adventures, 
            breathtaking landscapes, and unforgettable memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-sunset hover:opacity-90 transition-opacity text-white font-semibold px-8 py-4 text-lg shadow-glow"
              asChild
            >
              <a href="/plan">Plan Your Trip</a>
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-sunset hover:opacity-90 transition-opacity text-white font-semibold px-8 py-4 text-lg shadow-glow"
              asChild
            >
              <a href="/plan">Explore Destinations</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-float">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
