import { Scissors } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-gradient-gold">The Gentry Cut</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Premium men's grooming services in Kirindiwela, Sri Lanka. 
              Experience luxury, tradition, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              {["Home", "About", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-primary transition-smooth"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              {["Premium Haircut", "Beard Grooming", "VIP Experience", "Home Service", "Special Events", "Consultations"].map((service) => (
                <li key={service} className="hover:text-primary transition-smooth cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Gentry Cut. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with excellence by Adeepa Dilmith
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
