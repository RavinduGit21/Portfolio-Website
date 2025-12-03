import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Fernando",
      role: "Business Professional",
      rating: 5,
      text: "The Gentry Cut is my go-to place for haircuts. Adeepa is extremely skilled and knows exactly what suits me. The attention to detail is unmatched!"
    },
    {
      name: "Kasun Silva",
      role: "Entrepreneur",
      rating: 5,
      text: "Amazing service! The VIP experience is worth every rupee. From the moment you walk in, you feel like royalty. Highly recommended!"
    },
    {
      name: "Dinesh Perera",
      role: "Marketing Manager",
      rating: 5,
      text: "I've been coming here for over a year now. The quality of service is consistently excellent. The home service option is a game-changer for busy professionals."
    },
    {
      name: "Chaminda Wickramasinghe",
      role: "Software Engineer",
      rating: 5,
      text: "Best barbershop in Kirindiwela! Adeepa is a true professional who takes pride in his work. The atmosphere is relaxing and the results are always perfect."
    },
    {
      name: "Lahiru Jayawardena",
      role: "Doctor",
      rating: 5,
      text: "I appreciate the professionalism and expertise. Adeepa listens to what you want and delivers beyond expectations. The beard grooming service is exceptional!"
    },
    {
      name: "Nuwan Bandara",
      role: "Architect",
      rating: 5,
      text: "The Gentry Cut has set a new standard for men's grooming in Sri Lanka. The black-themed interior, premium products, and skilled service make it stand out."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient-gold">Clients</span> Say
          </h3>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 transition-smooth hover:shadow-gold hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                <p className="text-muted-foreground relative z-10 pl-6">
                  {testimonial.text}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
