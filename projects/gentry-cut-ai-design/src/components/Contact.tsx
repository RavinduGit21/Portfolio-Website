import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["Kirindiwela", "Sri Lanka"],
      action: "Get Directions",
      link: "https://maps.google.com/?q=Kirindiwela"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+94 77 123 4567", "+94 71 234 5678"],
      action: "Call Now",
      link: "tel:+94771234567"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@thegentrycut.lk", "booking@thegentrycut.lk"],
      action: "Send Email",
      link: "mailto:info@thegentrycut.lk"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: By Appointment"],
      action: "Book Now",
      link: "#booking"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", link: "#" },
    { icon: Instagram, name: "Instagram", link: "#" },
    { icon: Youtube, name: "YouTube", link: "#" }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Get In Touch
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Visit Us <span className="text-gradient-gold">Today</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            We're located in the heart of Kirindiwela. Drop by or get in touch to schedule your appointment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 text-center transition-smooth hover:shadow-gold hover:scale-105"
            >
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-background" />
              </div>
              
              <h4 className="font-semibold mb-3">{info.title}</h4>
              
              <div className="space-y-1 mb-4 text-sm text-muted-foreground">
                {info.details.map((detail, idx) => (
                  <div key={idx}>{detail}</div>
                ))}
              </div>

              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-primary/50 hover:bg-primary/10"
                onClick={() => window.location.href = info.link}
              >
                {info.action}
              </Button>
            </Card>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="overflow-hidden mb-12">
          <div className="w-full h-96 bg-secondary/50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Map will be embedded here
              </p>
              <Button 
                variant="outline"
                className="mt-4 border-primary/50"
                onClick={() => window.open("https://maps.google.com/?q=Kirindiwela", "_blank")}
              >
                Open in Google Maps
              </Button>
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <div className="text-center">
          <h4 className="text-2xl font-bold mb-6">Follow Us</h4>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center transition-smooth hover:border-primary hover:shadow-gold hover:scale-110"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
