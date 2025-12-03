import { Award, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import ownerImage from "@/assets/owner-adeepa.png";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Award, label: "Years Experience", value: "8+" },
    { icon: Sparkles, label: "Premium Services", value: "15+" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={ownerImage} 
                alt="Adeepa Dilmith - Master Barber"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <Card className="absolute -bottom-6 -right-6 p-6 bg-card/90 backdrop-blur-md shadow-gold">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                  <Award className="w-6 h-6 text-background" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                About The Gentry Cut
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                Meet <span className="text-gradient-gold">Adeepa Dilmith</span>
              </h3>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 8 years of experience in men's grooming, Adeepa Dilmith founded The Gentry Cut 
              to bring world-class barbering services to Kirindiwela. His passion for the craft and 
              dedication to excellence has made The Gentry Cut the premier destination for discerning 
              gentlemen.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              At The Gentry Cut, we believe that grooming is not just a service—it's an experience. 
              Our black-themed salon combines luxury with comfort, creating the perfect atmosphere for 
              you to relax and look your absolute best.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4 text-center bg-secondary/50 border-border/50">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
