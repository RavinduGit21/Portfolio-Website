
import React, { useState, useEffect } from 'react';
import type { User, MegaMenuCategory } from '../types';

// PERMANENT FIX: Define Logo component directly to avoid Vercel build errors.
const Logo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Westnahira Cellularz Logo"
  >
    <g>
      <rect width="100" height="100" rx="20" fill="#1E252C" />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="60"
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
      >
        <tspan fill="#00BFFF">W</tspan>
        <tspan fill="#FFFFFF">C</tspan>
      </text>
    </g>
  </svg>
);


interface HeaderProps {
  user: User | null;
  navigate: (path: string) => void;
  onLogout: () => void;
  megaMenuCategories: MegaMenuCategory[];
}

const Header: React.FC<HeaderProps> = ({ user, navigate, onLogout, megaMenuCategories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categoriesTimeout, setCategoriesTimeout] = useState<NodeJS.Timeout | null>(null);
  const [userMenuTimeout, setUserMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (categoriesTimeout) clearTimeout(categoriesTimeout);
      if (userMenuTimeout) clearTimeout(userMenuTimeout);
    };
  }, [categoriesTimeout, userMenuTimeout]);

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  }

  const handleCategoriesMouseEnter = () => {
    if (categoriesTimeout) {
      clearTimeout(categoriesTimeout);
      setCategoriesTimeout(null);
    }
    setIsCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 150); // 150ms delay
    setCategoriesTimeout(timeout);
  };

  const handleUserMenuMouseEnter = () => {
    if (userMenuTimeout) {
      clearTimeout(userMenuTimeout);
      setUserMenuTimeout(null);
    }
    setIsUserMenuOpen(true);
  };

  const handleUserMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 150); // 150ms delay
    setUserMenuTimeout(timeout);
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode; className?: string; }> = ({ href, children, className }) => (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); handleNavigate(href); }}
      className={`text-gray-600 hover:text-brand-primary transition-colors py-2 ${className}`}
    >
      {children}
    </a>
  );
  
  const NavButton: React.FC<{ href: string; children: React.ReactNode; }> = ({ href, children }) => (
     <a
      href={href}
      onClick={(e) => { e.preventDefault(); handleNavigate(href); }}
      className="block bg-brand-primary text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-sky-400 transition-colors"
    >
      {children}
    </a>
  );


  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavigate('/'); }} aria-label="Home">
              <Logo className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium">
             <NavLink href="/">Home</NavLink>
             <NavLink href="/all-products">All Products</NavLink>
             {/* Mega Menu */}
             {megaMenuCategories.length > 0 && (
                <div className="relative" 
                     onMouseEnter={handleCategoriesMouseEnter}
                     onMouseLeave={handleCategoriesMouseLeave}>
                    <button className="text-gray-600 hover:text-brand-primary transition-colors font-medium py-2 flex items-center">
                        Categories
                        <svg className={`w-4 h-4 ml-1 text-gray-400 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isCategoriesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-md shadow-lg p-6 z-50">
                        <div className="flex gap-12">
                            {megaMenuCategories.map(categoryGroup => (
                                <div key={categoryGroup.title} className="w-48">
                                    <h3 className="font-bold text-brand-dark mb-3">{categoryGroup.title}</h3>
                                    <ul className="space-y-2">
                                        {categoryGroup.links.map(link => (
                                            <li key={link.name}>
                                                <a
                                                    href={link.href}
                                                    onClick={(e) => { e.preventDefault(); handleNavigate(link.href); }}
                                                    className="block text-sm text-gray-700 hover:text-brand-primary"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
             )}
             <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Auth links & Mobile Menu Button */}
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="relative"
                     onMouseEnter={handleUserMenuMouseEnter}
                     onMouseLeave={handleUserMenuMouseLeave}>
                  <button className="font-medium text-gray-600 hover:text-brand-primary flex items-center gap-2">
                    <span>{user.name.split(' ')[0]}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user.isAdmin && <a href="/admin/dashboard" onClick={(e) => {e.preventDefault(); handleNavigate('/admin/dashboard')}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-primary">Admin Dashboard</a>}
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-primary">Logout</a>
                  </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink href="/login">Sign In</NavLink>
                  <NavButton href="/register">Sign Up</NavButton>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-brand-primary hover:bg-gray-100">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/all-products">All Products</NavLink>
            {megaMenuCategories.map(category => (
                <div key={category.title}>
                    <h3 className="px-0 pt-2 pb-1 font-semibold text-gray-800">{category.title}</h3>
                     {category.links.map(link => (
                         <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleNavigate(link.href); }}
                            className="block pl-4 py-2 text-sm text-gray-600 hover:text-brand-primary"
                         >
                            {link.name}
                         </a>
                     ))}
                </div>
            ))}
            <NavLink href="/contact">Contact</NavLink>
            <div className="border-t border-gray-200 pt-4 mt-2 space-y-2">
              {user ? (
                <>
                  <p className="px-0 font-medium">{user.name}</p>
                  {user.isAdmin && <NavLink href="/admin/dashboard">Admin Dashboard</NavLink>}
                  <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsMobileMenuOpen(false); }} className="block text-gray-600 hover:text-brand-primary py-2">Logout</a>
                </>
              ) : (
                <>
                  <NavLink href="/login">Sign In</NavLink>
                  <NavButton href="/register">Sign Up</NavButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
