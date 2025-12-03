import React from 'react';
import type { Category } from '../types';

interface PopularCategoriesProps {
    categories: Category[];
    navigate: (path: string) => void;
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ categories, navigate }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">Popular Categories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Find what you need faster by browsing our top categories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <a 
              href={`/all-products?category=${category.name}`}
              key={category.name} 
              className="relative rounded-lg overflow-hidden h-64 group"
              onClick={(e) => { e.preventDefault(); navigate(`/all-products?category=${category.name}`); }}
            >
                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg">{category.name}</h3>
                </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
