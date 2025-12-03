
import React, { useState, useEffect } from 'react';

// Types
import type { Product, User, MegaMenuCategory, Category, Review } from './types';

// API
import api from './api';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import PopularCategories from './components/PopularCategories';
import OurBrands from './components/OurBrands';
import CustomerReviews from './components/CustomerReviews';

// Pages
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductFormPage from './pages/admin/ProductFormPage';
import ContactPage from './pages/ContactPage';
import UsersPage from './pages/UsersPage';

function App() {
  const [path, setPath] = useState(window.location.pathname + window.location.search);
  const [user, setUser] = useState<User | null>(null);
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [megaMenuCategories, setMegaMenuCategories] = useState<MegaMenuCategory[]>([]);
  const [popularCategories, setPopularCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = (newPath: string) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [ productsData, megaMenuData, popularCategoriesData, brandsData, reviewsData ] = await Promise.all([
          api.getProducts(),
          api.getMegaMenuCategories(),
          api.getPopularCategories(),
          api.getBrands(),
          api.getReviews()
        ]);

        setProducts(productsData);
        setMegaMenuCategories(megaMenuData);
        setPopularCategories(popularCategoriesData);
        setBrands(brandsData[0]?.names || []);
        setReviews(reviewsData);
        
      } catch (err: any) {
        setError(err.message || 'Failed to load initial data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        handleLogout();
      }
    }
  }, []);
  
  const handleLoginSuccess = (data: { user: User; token: string }) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    navigate(data.user.isAdmin ? '/admin/dashboard' : '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const renderPage = () => {
    const [pathname] = path.split('?');

    if (loading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-4">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
      );
    }

    switch (pathname) {
      case '/':
        return (
          <>
            <Hero navigate={navigate} />
            <FeaturedProducts products={products} navigate={navigate} />
            <PopularCategories categories={popularCategories} navigate={navigate} />
            <OurBrands brands={brands} />
            <CustomerReviews reviews={reviews} />
          </>
        );
      case '/all-products':
        return <AllProductsPage products={products} brands={brands} navigate={navigate} />;
      case '/login':
        return <LoginPage navigate={navigate} onLoginSuccess={handleLoginSuccess} />;
      case '/register':
        return <RegisterPage navigate={navigate} onLoginSuccess={handleLoginSuccess} />;
      case '/auth/success':
        return <AuthSuccessPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
      case '/contact':
        return <ContactPage />;
    }

    const productMatch = pathname.match(/^\/products\/(\w+)$/);
    if (productMatch) return <ProductDetailPage productId={productMatch[1]} />;
    
    const categoryMatch = pathname.match(/^\/category\/(.+)$/);
    if (categoryMatch) return <CategoryPage products={products} categoryName={decodeURIComponent(categoryMatch[1])} navigate={navigate} />;

    if (pathname.startsWith('/admin')) {
        if (!user || !user.isAdmin) return <div className="text-center py-20"><h2 className="text-2xl font-bold">Access Denied</h2><p className="mt-2">You must be an administrator to view this page.</p></div>;
        if (pathname === '/admin/dashboard') return <AdminDashboardPage products={products} setProducts={setProducts} navigate={navigate} />;
        if (pathname === '/admin/users') return <UsersPage navigate={navigate} />;
        
        const allProductCategories = megaMenuCategories.flatMap(group => group.links.map(link => link.name));
        
        const editProductMatch = pathname.match(/^\/admin\/product\/(.+)$/);
        if (editProductMatch && editProductMatch[1] !== 'new') {
            return <ProductFormPage productId={editProductMatch[1]} products={products} setProducts={setProducts} navigate={navigate} allCategories={allProductCategories}/>;
        }
        if (pathname === '/admin/product/new') {
             return <ProductFormPage products={products} setProducts={setProducts} navigate={navigate} allCategories={allProductCategories}/>;
        }
    }
    
    return <div className="text-center py-20"><h2 className="text-2xl font-bold">404: Page Not Found</h2><p className="mt-2">The page you are looking for does not exist.</p></div>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header user={user} navigate={navigate} onLogout={handleLogout} megaMenuCategories={megaMenuCategories} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
