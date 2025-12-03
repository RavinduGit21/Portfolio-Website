import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Hotels', href: '#hotels' },
    { name: 'Tours', href: '#tours' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const tourTypes = [
    { name: 'Cultural Tours', href: '#' },
    { name: 'Beach Tours', href: '#' },
    { name: 'Wildlife Safari', href: '#' },
    { name: 'Hill Country', href: '#' },
    { name: 'Adventure Tours', href: '#' },
    { name: 'Honeymoon Packages', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold gradient-sunset bg-clip-text text-transparent">
              Serranid Journeys
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Your trusted partner for unforgettable Sri Lankan adventures. 
              Experience the pearl of the Indian Ocean with authentic local insights.
            </p>
            <div className="space-y-2 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0775320506</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>jinidusupunsara@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Types */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Tour Types</h4>
            <ul className="space-y-2">
              {tourTypes.map((tour) => (
                <li key={tour.name}>
                  <a
                    href={tour.href}
                    className="text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    {tour.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Stay Connected</h4>
            <p className="text-foreground/80 text-sm">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-foreground/10 border-foreground/20 text-foreground placeholder:text-foreground/60"
              />
              <Button className="bg-gradient-sunset hover:opacity-90 transition-opacity">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="pt-4">
              <p className="text-sm font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-gradient-hero transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-foreground/80 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/80 text-sm">
            © {currentYear} Serranid Journeys. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground/80">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
