import React from 'react';

interface OurBrandsProps {
    brands: string[];
}

const OurBrands: React.FC<OurBrandsProps> = ({ brands }) => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">Our Brands</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We partner with the best brands in the industry to bring you top-quality products.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
             <div key={brand} className="flex justify-center items-center filter grayscale hover:grayscale-0 transition-all duration-300">
                 <span className="text-2xl font-semibold text-gray-500">{brand}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBrands;
