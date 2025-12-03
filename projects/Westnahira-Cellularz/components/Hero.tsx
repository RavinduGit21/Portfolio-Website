import React, { useState, useEffect } from 'react';

interface HeroProps {
  navigate: (path: string) => void;
}

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  isAccessories: boolean;
  fallbackImage: string;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&h=1080&fit=crop&crop=center",
      title: "Discover Your Next Device",
      subtitle: "The best deals on the latest smartphones, tablets, and accessories.",
      isAccessories: false,
      fallbackImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601972602288-526ecb63cdb4?w=1920&h=1080&fit=crop&crop=center",
      title: "Premium Mobile Accessories",
      subtitle: "Protect and enhance your devices with our top-quality cases, chargers, and more.",
      isAccessories: true,
      fallbackImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="relative bg-white overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
      <div className="absolute inset-0">
        <img
          className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          src={currentBanner.image}
          alt={currentBanner.isAccessories ? "Mobile accessories showcase" : "Modern smartphones and mobile devices showcase"}
          width="1920"
          height="1080"
          onError={(e) => {
            e.currentTarget.src = currentBanner.fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
          {currentBanner.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-100 drop-shadow-md">
          {currentBanner.subtitle}
        </p>
        
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {currentBanner.isAccessories ? (
            // Show accessories-focused buttons
            <>
              <a
                href="/all-products?category=Case"
                onClick={(e) => { e.preventDefault(); navigate('/all-products?category=Case'); }}
                className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Phone Cases
              </a>
              <a
                href="/all-products?category=Charger"
                onClick={(e) => { e.preventDefault(); navigate('/all-products?category=Charger'); }}
                className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Chargers
              </a>
              <a
                href="/all-products?category=Accessory"
                onClick={(e) => { e.preventDefault(); navigate('/all-products?category=Accessory'); }}
                className="inline-block bg-gray-700/50 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-600/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                All Accessories
              </a>
            </>
          ) : (
            // Show general mobile device buttons
            <>
              <a
                href="/all-products"
                onClick={(e) => { e.preventDefault(); navigate('/all-products'); }}
                className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                All Products
              </a>
              <a
                href="/all-products?category=Accessory"
                onClick={(e) => { e.preventDefault(); navigate('/all-products?category=Accessory'); }}
                className="inline-block bg-gray-700/50 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-600/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Browse Accessories
              </a>
            </>
          )}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;