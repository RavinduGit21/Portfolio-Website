import React from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
  products: Product[];
  categoryName: string;
  navigate: (path: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products, categoryName, navigate }) => {
  const filteredProducts = products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());

  // Capitalize first letter for display
  const displayCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">{displayCategoryName}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore our collection of {displayCategoryName.toLowerCase()}.
          </p>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-brand-dark">No Products Found in this Category</h3>
            <p className="mt-2 text-gray-600">Check back later or browse all our products.</p>
            <a
              href="/all-products"
              onClick={(e) => { e.preventDefault(); navigate('/all-products'); }}
              className="mt-6 inline-block bg-brand-primary text-white font-bold py-2 px-4 rounded-md"
            >
              View All Products
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
