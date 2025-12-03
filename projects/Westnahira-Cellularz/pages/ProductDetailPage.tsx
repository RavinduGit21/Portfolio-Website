import React, { useState, useEffect } from 'react';
import api from '../api';
import type { Product } from '../types';

interface ProductDetailPageProps {
  productId: string;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await api.getProductById(productId);
        setProduct(productData);
        // Set default color if available
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  // Get all images for the product
  const allImages = product.images && product.images.length > 0 
    ? [product.imageUrl, ...product.images] 
    : [product.imageUrl];

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <span>Home</span> / <span>{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnail Images */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-brand-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 order-1 md:order-2">
                <div className="bg-gray-100 rounded-lg shadow-md p-4 aspect-square">
                  <img
                    src={allImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isNew && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  FEATURED
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{product.brand}</p>
            
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.round(product.rating)} />
              ))}
              <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-4xl font-extrabold text-brand-primary">Rs. {product.price.toLocaleString('en-US')}</p>
                {product.originalPrice && (
                  <>
                    <p className="text-xl text-gray-500 line-through">Rs. {product.originalPrice.toLocaleString('en-US')}</p>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Shipping calculated at checkout</p>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Short Description</h3>
                <p className="text-gray-700">{product.shortDescription}</p>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Color: {selectedColor}</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color 
                          ? 'border-brand-primary' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-brand-primary text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-sky-400 transition-colors">
                Add to Cart
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {product.whatIncluded && product.whatIncluded.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                  <ul className="space-y-1">
                    {product.whatIncluded.map((item, index) => (
                      <li key={index} className="text-gray-700">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warranty */}
              {product.warranty && (
                <div className="flex items-center gap-2">
                  <span className="text-green-500">🛡️</span>
                  <span className="text-gray-700">{product.warranty}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">Product Details</h2>
          <div className="prose max-w-none text-gray-700">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;