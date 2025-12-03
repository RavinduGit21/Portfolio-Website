import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  navigate: (path: string) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, navigate }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">Featured Products</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Check out our hand-picked selection of the best devices and accessories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} navigate={navigate} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <a
                href="/all-products"
                onClick={(e) => { e.preventDefault(); navigate('/all-products'); }}
                className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-400 transition-all duration-300 transform hover:scale-105"
            >
                View All Products
            </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
