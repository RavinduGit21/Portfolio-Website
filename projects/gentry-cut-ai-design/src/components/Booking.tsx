import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Home } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    serviceType: "in-salon",
    address: "",
    notes: ""
  });

  const services = [
    "Premium Haircut",
    "Beard Grooming",
    "VIP Experience",
    "Hair Coloring",
    "Scalp Treatment",
    "Facial Service",
    "Traditional Shave",
    "Kids Haircut"
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.serviceType === "home-service" && !formData.address) {
      toast.error("Please provide your address for home service");
      return;
    }

    // In a real app, this would send to a backend
    toast.success("Booking request submitted! We'll contact you shortly to confirm.");
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      serviceType: "in-salon",
      address: "",
      notes: ""
    });
  };

  return (
    <section id="booking" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Book Appointment
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Reserve Your <span className="text-gradient-gold">Spot</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Schedule your appointment online or request a home service. We'll confirm your booking shortly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type Selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card 
                  className={`p-6 cursor-pointer transition-smooth ${
                    formData.serviceType === "in-salon" 
                      ? "border-primary shadow-gold" 
                      : "border-border/50 hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, serviceType: "in-salon", address: "" })}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      formData.serviceType === "in-salon" ? "gradient-gold" : "bg-secondary"
                    }`}>
                      <MapPin className={`w-6 h-6 ${
                        formData.serviceType === "in-salon" ? "text-background" : "text-foreground"
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold">In-Salon Service</div>
                      <div className="text-sm text-muted-foreground">Visit our location</div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-6 cursor-pointer transition-smooth ${
                    formData.serviceType === "home-service" 
                      ? "border-primary shadow-gold" 
                      : "border-border/50 hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, serviceType: "home-service" })}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      formData.serviceType === "home-service" ? "gradient-gold" : "bg-secondary"
                    }`}>
                      <Home className={`w-6 h-6 ${
                        formData.serviceType === "home-service" ? "text-background" : "text-foreground"
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold">Home Service</div>
                      <div className="text-sm text-muted-foreground">We come to you</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Personal Information */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 77 123 4567"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address for Home Service */}
              {formData.serviceType === "home-service" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Your Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your full address including city"
                    rows={3}
                    required={formData.serviceType === "home-service"}
                  />
                </div>
              )}

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or preferences?"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full gradient-gold shadow-gold text-lg"
              >
                Submit Booking Request
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                * We'll contact you to confirm your appointment within 24 hours
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Booking;
