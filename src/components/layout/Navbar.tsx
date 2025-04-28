
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ShoppingCart, 
  User,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-500">
              QuickMeds
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search medicines..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-brand-500">
                <Search size={18} />
              </button>
            </form>
            
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link to="/medicines" className="text-gray-600 hover:text-brand-500">
                Medicines
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-brand-500">
                Categories
              </Link>
              <Link to="/offers" className="text-gray-600 hover:text-brand-500">
                Offers
              </Link>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <Link to="/favorites" className="text-gray-600 hover:text-brand-500 p-2">
              <Heart size={22} />
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-brand-500 p-2 relative">
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:block relative">
                <Link to="/account" className="flex items-center space-x-2 text-gray-600 hover:text-brand-500 p-2">
                  <User size={22} />
                  <span className="text-sm">{user?.name}</span>
                </Link>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="mr-2">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-brand-500 p-2" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4 animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search medicines..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-brand-500">
                <Search size={18} />
              </button>
            </form>
            
            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/medicines" 
                className="text-gray-600 hover:text-brand-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Medicines
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-brand-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/offers" 
                className="text-gray-600 hover:text-brand-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="text-gray-600 hover:text-brand-500 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-gray-600 hover:text-brand-500 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order History
                  </Link>
                  <button 
                    className="text-left text-red-600 hover:text-red-700 py-2"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex space-x-4 pt-2">
                  <Link 
                    to="/login" 
                    className="btn-outline flex-1 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary flex-1 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
