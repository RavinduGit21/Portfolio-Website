import React, { useState, useEffect } from 'react';
import api from '../../api';
import type { Product } from '../../types';

interface ProductFormPageProps {
  productId?: string;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  navigate: (path: string) => void;
  allCategories: string[];
}

const ProductFormPage: React.FC<ProductFormPageProps> = ({ productId, products, setProducts, navigate, allCategories }) => {
  const [formState, setFormState] = useState({
    name: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    imageUrl: '',
    images: [] as string[],
    category: '',
    description: '',
    shortDescription: '',
    features: [] as string[],
    specifications: {} as { [key: string]: string },
    whatIncluded: [] as string[],
    warranty: '',
    availability: '',
    sku: '',
    weight: '',
    dimensions: '',
    colors: [] as string[],
    stock: 0,
    isNew: false,
    isFeatured: false,
    tags: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newIncludedItem, setNewIncludedItem] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newTag, setNewTag] = useState('');

  const isEditing = Boolean(productId);

  useEffect(() => {
    // Set default category if creating a new product and categories are available
    if (!isEditing && allCategories.length > 0) {
        setFormState(prev => ({ ...prev, category: allCategories[0] }));
    }
    
    if (isEditing) {
      const existingProduct = products.find(p => p._id === productId);
      if (existingProduct) {
        setFormState({
            name: existingProduct.name,
            brand: existingProduct.brand,
            price: existingProduct.price,
            originalPrice: existingProduct.originalPrice || 0,
            imageUrl: existingProduct.imageUrl,
            images: existingProduct.images || [],
            category: existingProduct.category,
            description: existingProduct.description,
            shortDescription: existingProduct.shortDescription || '',
            features: existingProduct.features || [],
            specifications: existingProduct.specifications || {},
            whatIncluded: existingProduct.whatIncluded || [],
            warranty: existingProduct.warranty || '',
            availability: existingProduct.availability || '',
            sku: existingProduct.sku || '',
            weight: existingProduct.weight || '',
            dimensions: existingProduct.dimensions || '',
            colors: existingProduct.colors || [],
            stock: existingProduct.stock || 0,
            isNew: existingProduct.isNew || false,
            isFeatured: existingProduct.isFeatured || false,
            tags: existingProduct.tags || [],
        });
        setImagePreview(existingProduct.imageUrl);
        setAdditionalImages(existingProduct.images || []);
        setUploadedImages(existingProduct.images || []);
      } else {
        const fetchProduct = async () => {
            try {
                const productData = await api.getProductById(productId!);
                setFormState({
                    name: productData.name,
                    brand: productData.brand,
                    price: productData.price,
                    originalPrice: productData.originalPrice || 0,
                    imageUrl: productData.imageUrl,
                    images: productData.images || [],
                    category: productData.category,
                    description: productData.description,
                    shortDescription: productData.shortDescription || '',
                    features: productData.features || [],
                    specifications: productData.specifications || {},
                    whatIncluded: productData.whatIncluded || [],
                    warranty: productData.warranty || '',
                    availability: productData.availability || '',
                    sku: productData.sku || '',
                    weight: productData.weight || '',
                    dimensions: productData.dimensions || '',
                    colors: productData.colors || [],
                    stock: productData.stock || 0,
                    isNew: productData.isNew || false,
                    isFeatured: productData.isFeatured || false,
                    tags: productData.tags || [],
                });
                setImagePreview(productData.imageUrl);
                setAdditionalImages(productData.images || []);
                setUploadedImages(productData.images || []);
            } catch (err) {
                 setError('Product not found.');
            }
        };
        fetchProduct();
      }
    }
  }, [productId, products, isEditing, allCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormState(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormState(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormState(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormState(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormState(prev => ({ 
        ...prev, 
        specifications: { ...prev.specifications, [newSpecKey.trim()]: newSpecValue.trim() }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormState(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const addIncludedItem = () => {
    if (newIncludedItem.trim()) {
      setFormState(prev => ({ ...prev, whatIncluded: [...prev.whatIncluded, newIncludedItem.trim()] }));
      setNewIncludedItem('');
    }
  };

  const removeIncludedItem = (index: number) => {
    setFormState(prev => ({ ...prev, whatIncluded: prev.whatIncluded.filter((_, i) => i !== index) }));
  };

  const addColor = () => {
    if (newColor.trim()) {
      setFormState(prev => ({ ...prev, colors: [...prev.colors, newColor.trim()] }));
      setNewColor('');
    }
  };

  const removeColor = (index: number) => {
    setFormState(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormState(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormState(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const addAdditionalImage = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setAdditionalImages(prev => [...prev, url.trim()]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsMainImage = (imageUrl: string) => {
    setFormState(prev => ({ ...prev, imageUrl }));
    setImagePreview(imageUrl);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
          // Process multiple files - all go to additional images
          Array.from(files).forEach((file) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const base64String = reader.result as string;
                  // All files go to additional images only
                  setUploadedImages(prev => [...prev, base64String]);
              };
              reader.readAsDataURL(file);
          });
      }
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              // Set as main image
              setFormState(prev => ({ ...prev, imageUrl: base64String }));
              setImagePreview(base64String);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const productData = { 
        ...formState, 
        images: [...uploadedImages, ...additionalImages]
      };

      if (isEditing) {
        const updatedProduct = await api.updateProduct(productId!, productData);
        setProducts(prev => prev.map(p => (p._id === productId ? updatedProduct : p)));
      } else {
        const newProduct = await api.createProduct(productData);
        setProducts(prev => [...prev, newProduct]);
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save product. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-8rem)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-brand-dark mb-6">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formState.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formState.sku}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formState.originalPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formState.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            
            {/* Set Main Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Set Main Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <p className="text-sm text-gray-500 mt-1">This image will be shown everywhere on the website (product cards, thumbnails, etc.)</p>
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Main Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-brand-primary" />
                  <p className="text-sm text-gray-500 mt-1">Current Main Image</p>
                </div>
              )}
            </div>

            {/* Add Additional Images */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Add Additional Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <p className="text-sm text-gray-500 mt-1">These images will only be shown on the product detail page along with the main image.</p>
            </div>

            {/* Additional Images Gallery */}
            {uploadedImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Additional Images ({uploadedImages.length})</h3>
                <p className="text-sm text-gray-500 mb-3">These images will be shown on the product detail page along with the main image.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Additional ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-brand-primary transition-colors" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                          <button
                            type="button"
                            onClick={() => setAsMainImage(image)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                            title="Set as main image"
                          >
                            Main
                          </button>
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images from URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Add Images by URL</label>
              <button
                type="button"
                onClick={addAdditionalImage}
                className="mb-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Add Image URL
              </button>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`URL Image ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-brand-primary transition-colors" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                          <button
                            type="button"
                            onClick={() => setAsMainImage(image)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                            title="Set as main image"
                          >
                            Main
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Descriptions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formState.shortDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="space-y-2">
              {formState.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-gray-100 px-3 py-2 rounded">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-sky-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="space-y-2">
              {Object.entries(formState.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="flex-1 bg-gray-100 px-3 py-2 rounded">
                    <strong>{key}:</strong> {value}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="Specification name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Specification value"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-sky-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">What's Included</h2>
            <div className="space-y-2">
              {formState.whatIncluded.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-gray-100 px-3 py-2 rounded">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeIncludedItem(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIncludedItem}
                  onChange={(e) => setNewIncludedItem(e.target.value)}
                  placeholder="Add included item"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={addIncludedItem}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-sky-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Available Colors</h2>
            <div className="space-y-2">
              {formState.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="flex-1 bg-gray-100 px-3 py-2 rounded">{color}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add color (e.g., Black, White, Blue)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-sky-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                <input
                  type="text"
                  name="warranty"
                  value={formState.warranty}
                  onChange={handleChange}
                  placeholder="e.g., 1 Year Warranty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formState.weight}
                  onChange={handleChange}
                  placeholder="e.g., 200g"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formState.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 15cm x 8cm x 2cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formState.availability}
                  onChange={handleChange}
                  placeholder="e.g., In Stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Product Flags */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Product Flags</h2>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formState.isNew}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">New Product</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formState.isFeatured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-brand-primary text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-sky-400 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 bg-gray-500 text-white font-bold rounded-md shadow-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;