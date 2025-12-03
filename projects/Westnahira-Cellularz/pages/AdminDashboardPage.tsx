import React, { useState } from 'react';
import api from '../api';
import type { Product } from '../types';

interface AdminDashboardPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  navigate: (path: string) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ products, setProducts, navigate }) => {
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (productId: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }
        setIsDeleting(productId);
        setError(null);
        try {
            await api.deleteProduct(productId);
            setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
        } catch (err: any) {
            setError(err.message || 'Failed to delete product.');
        } finally {
            setIsDeleting(null);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-8rem)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-dark">Admin Dashboard</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                        >
                            👥 View Users
                        </button>
                        <button
                            onClick={() => navigate('/admin/product/new')}
                            className="bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-sky-400 transition-colors"
                        >
                            + Add New Product
                        </button>
                    </div>
                </div>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => navigate(`/admin/product/${product._id}`)} className="text-brand-primary hover:text-sky-400 mr-4">Edit</button>
                                        <button
                                            onClick={() => handleDelete(product._id!)}
                                            disabled={isDeleting === product._id}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {isDeleting === product._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;