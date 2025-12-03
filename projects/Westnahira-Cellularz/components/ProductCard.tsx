
import React from 'react';
import type { Product } from '../types';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  return (
    <div 
      className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-400 cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-t-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:opacity-90 group-hover:scale-105 transition-all duration-300 p-2"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{product.category}</p>
        <h3 className="text-md font-semibold text-gray-800 mt-1 flex-grow">
          {product.name}
        </h3>
        
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < Math.round(product.rating)} />
          ))}
          <span className="text-xs text-gray-500 ml-1.5">({product.reviews} reviews)</span>
        </div>

        <p className="text-lg font-bold text-gray-900 mt-3">
          Rs. {product.price.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
