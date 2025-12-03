import React from 'react';

interface FilterSidebarProps {
  brands: string[];
  categories: string[];
  filters: {
    category: string;
    brand: string;
    price: number;
    rating: number;
  };
  maxPrice: number;
  onFilterChange: (filterName: string, value: any) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ brands, categories, filters, maxPrice, onFilterChange, onClearFilters }) => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-brand-dark">Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-brand-primary hover:text-sky-400 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">Category</h4>
          <div className="space-y-2">
            <div>
              <input type="radio" id="cat_all" name="category" value="" checked={filters.category === ''} onChange={(e) => onFilterChange('category', e.target.value)} className="form-radio text-brand-primary focus:ring-brand-primary" />
              <label htmlFor="cat_all" className="ml-2 text-gray-700">All</label>
            </div>
            {categories.map(category => (
              <div key={category}>
                <input 
                  type="radio" 
                  id={`cat_${category.replace(/\s+/g, '-')}`} 
                  name="category" 
                  value={category} 
                  checked={filters.category === category} 
                  onChange={(e) => onFilterChange('category', e.target.value)} 
                  className="form-radio text-brand-primary focus:ring-brand-primary" />
                <label htmlFor={`cat_${category.replace(/\s+/g, '-')}`} className="ml-2 text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">Brand</h4>
          <select value={filters.brand} onChange={(e) => onFilterChange('brand', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50">
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">Price Range</h4>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="1000"
            value={filters.price}
            onChange={(e) => onFilterChange('price', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1 text-center">
            Up to Rs. {filters.price.toLocaleString('en-US')}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Rating</h4>
          <select value={filters.rating} onChange={(e) => onFilterChange('rating', Number(e.target.value))} className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50">
            <option value="0">All Ratings</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="1">1 Star & Up</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;