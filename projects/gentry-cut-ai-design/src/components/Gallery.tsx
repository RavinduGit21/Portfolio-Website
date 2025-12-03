import { Card } from "@/components/ui/card";
import haircutImage from "@/assets/service-haircut.jpg";
import beardImage from "@/assets/service-beard.jpg";
import vipImage from "@/assets/service-vip.jpg";
import heroImage from "@/assets/hero-salon.jpg";

const Gallery = () => {
  const galleryItems = [
    {
      image: heroImage,
      title: "Luxury Interior",
      category: "Salon"
    },
    {
      image: haircutImage,
      title: "Precision Haircuts",
      category: "Services"
    },
    {
      image: beardImage,
      title: "Expert Beard Grooming",
      category: "Services"
    },
    {
      image: vipImage,
      title: "VIP Experience",
      category: "Premium"
    },
    {
      image: haircutImage,
      title: "Modern Styling",
      category: "Services"
    },
    {
      image: beardImage,
      title: "Traditional Techniques",
      category: "Services"
    }
  ];

  return (
    <section id="gallery" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Our Work
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Gallery of <span className="text-gradient-gold">Excellence</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Explore our craftsmanship and the sophisticated atmosphere of The Gentry Cut.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card/50 border-border/50 transition-smooth hover:shadow-gold hover:scale-105 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-smooth">
                  <div className="text-sm text-primary font-semibold mb-1">{item.category}</div>
                  <div className="text-xl font-bold">{item.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Follow us on social media for more updates and behind-the-scenes content
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
