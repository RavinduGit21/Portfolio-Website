import type { Product, MegaMenuCategory, User, Category, Review } from './types';

const BASE_URL = '/api';

type ProductDataPayload = {
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    images?: string[];
    category: string;
    description: string;
    shortDescription?: string;
    features?: string[];
    specifications?: { [key: string]: string };
    whatIncluded?: string[];
    warranty?: string;
    availability?: string;
    sku?: string;
    weight?: string;
    dimensions?: string;
    colors?: string[];
    stock?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    tags?: string[];
};

// Helper to handle API responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        // Try to parse the error message from the backend
        const errorData = await response.json().catch(() => ({ message: 'Could not connect to the server. Please make sure the backend is running and try again.' }));
        throw new Error(errorData.message || 'An unknown network error occurred');
    }
    return response.json();
};

// Helper to get auth token for secure requests
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// --- Public API Calls ---
const getProducts = (): Promise<Product[]> => fetch(`${BASE_URL}/products`).then(handleResponse);
const getProductById = (id: string): Promise<Product> => fetch(`${BASE_URL}/products/${id}`).then(handleResponse);
const getMegaMenuCategories = (): Promise<MegaMenuCategory[]> => fetch(`${BASE_URL}/megamenu-categories`).then(handleResponse);
const getPopularCategories = (): Promise<Category[]> => fetch(`${BASE_URL}/categories`).then(handleResponse);
const getBrands = (): Promise<{ names: string[] }[]> => fetch(`${BASE_URL}/brands`).then(handleResponse);
const getReviews = (): Promise<Review[]> => fetch(`${BASE_URL}/reviews`).then(handleResponse);


// --- Auth API Calls ---
const loginUser = (email: string, password: string): Promise<{ user: User; token: string }> => {
    return fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

const registerUser = (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    return fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    }).then(handleResponse);
};

const initiateGoogleAuth = (): void => {
    window.location.href = `${BASE_URL}/auth/google`;
};

// --- Admin API Calls ---
const createProduct = (productData: ProductDataPayload): Promise<Product> => {
    return fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

const updateProduct = (id: string, productData: Partial<ProductDataPayload>): Promise<Product> => {
    return fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

const deleteProduct = (id: string): Promise<{ message: string }> => {
    return fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

const getUsers = (): Promise<User[]> => {
    return fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

const api = {
    getProducts,
    getProductById,
    getMegaMenuCategories,
    getPopularCategories,
    getBrands,
    getReviews,
    loginUser,
    registerUser,
    initiateGoogleAuth,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
};

export default api;
