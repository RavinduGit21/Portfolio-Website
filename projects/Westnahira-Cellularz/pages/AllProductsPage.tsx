import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

interface AllProductsPageProps {
  products: Product[];
  brands: string[];
  navigate: (path: string) => void;
}

const AllProductsPage: React.FC<AllProductsPageProps> = ({ products, brands, navigate }) => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    price: 0,
    rating: 0,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const maxPrice = useMemo(() => products.reduce((max, p) => p.price > max ? p.price : max, 0), [products]);
  const productCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products]);

  // Effect to set initial filters from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters(prev => ({
      ...prev,
      category: params.get('category') || '',
      brand: params.get('brand') || '',
      price: maxPrice, // Default price filter to max
    }));
  }, [maxPrice]);


  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      price: maxPrice,
      rating: 0,
    });
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.price < maxPrice) {
       filtered = filtered.filter(p => p.price <= filters.price);
    }
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
         filtered.sort((a, b) => b.rating - a.rating);
        break;
      // 'featured' case does nothing, keeps original order
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy, maxPrice]);
  
  useEffect(() => {
      if(filters.price === 0 && maxPrice > 0){
          setFilters(prev => ({ ...prev, price: maxPrice }));
      }
  }, [maxPrice, filters.price]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">All Products</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore our full range of smartphones and accessories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <FilterSidebar 
              brands={brands}
              categories={productCategories}
              filters={filters}
              maxPrice={maxPrice}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          <main className="flex-1">
             {/* Mobile Filter Button & Sort Dropdown */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md lg:shadow-none lg:bg-transparent lg:p-0">
               <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" /></svg>
                   Filters
                </button>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border-gray-300 rounded-md shadow-sm focus:border-brand-primary focus:ring-brand-primary">
                        <option value="featured">Featured</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating_desc">Rating</option>
                    </select>
                </div>
            </div>
            
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product._id} product={product} navigate={navigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-brand-dark">No Products Found</h3>
                    <p className="mt-2 text-gray-600">Try adjusting your filters or clearing them to see all products.</p>
                     <button
                        onClick={handleClearFilters}
                        className="mt-6 bg-brand-primary text-white font-bold py-2 px-4 rounded-md"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Mobile Filter Sidebar (Overlay) */}
      {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <div className="absolute inset-y-0 left-0 w-80 bg-gray-50 p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <button onClick={() => setIsSidebarOpen(false)}>&times;</button>
                  </div>
                   <FilterSidebar 
                      brands={brands}
                      categories={productCategories}
                      filters={filters}
                      maxPrice={maxPrice}
                      onFilterChange={handleFilterChange}
                      onClearFilters={() => { handleClearFilters(); setIsSidebarOpen(false); }}
                    />
              </div>
          </div>
      )}

    </div>
  );
};

export default AllProductsPage;