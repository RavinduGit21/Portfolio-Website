import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Hotels from '@/components/Hotels';
import Tours from '@/components/Tours';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Destinations />
      <Hotels />
      <Tours />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
