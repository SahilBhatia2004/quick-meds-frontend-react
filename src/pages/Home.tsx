
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';
import { Medicine } from '@/types/medicine';
import { getMedicines } from '@/services/medicineService';
import { featuredMedicines, popularMedicines } from '@/data/medicines';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Medicine[]>([]);
  const [popularProducts, setPopularProducts] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setIsLoading(true);
        const allMedicines = await getMedicines();
        
        // Filter featured products
        const featured = allMedicines.filter(
          medicine => featuredMedicines.includes(medicine.id)
        );
        setFeaturedProducts(featured);
        
        // Filter popular products
        const popular = allMedicines.filter(
          medicine => popularMedicines.includes(medicine.id)
        );
        setPopularProducts(popular);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicines();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Medicines Delivered to Your Doorstep
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Fast, reliable delivery for all your healthcare needs
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for medicines..."
                className="w-full py-3 px-4 pl-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute left-3 top-3.5 text-gray-500"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your medicines delivered within 2 hours in selected areas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Authentic Medicines</h3>
                <p className="text-gray-600">
                  100% genuine medicines from authorized distributors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Upload Prescription</h3>
                <p className="text-gray-600">
                  Easily order prescription medicines by uploading your prescription.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/medicines" className="text-brand-500 hover:text-brand-600 flex items-center">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/medicines?category=pain-relief" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">Pain Relief</h3>
              </div>
            </Link>
            
            <Link to="/medicines?category=antibiotics" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">Antibiotics</h3>
              </div>
            </Link>
            
            <Link to="/medicines?category=vitamins" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">Vitamins</h3>
              </div>
            </Link>
            
            <Link to="/medicines?category=allergy" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">Allergy</h3>
              </div>
            </Link>
            
            <Link to="/medicines?category=digestive-health" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">Digestive Health</h3>
              </div>
            </Link>
            
            <Link to="/categories" className="group">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-all group-hover:bg-brand-50 group-hover:border-brand-500 border-2 border-transparent">
                <div className="h-10 w-10 text-brand-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-center">View All</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>
            <Link to="/medicines" className="text-brand-500 hover:text-brand-600 flex items-center">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={popularProducts} isLoading={isLoading} />
        </div>
      </section>

      {/* Prescription Upload CTA */}
      <section className="py-12 bg-brand-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a prescription?</h2>
            <p className="text-lg mb-6 text-white/90">
              Upload your prescription and we'll deliver your medicines right to your doorstep.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/upload-prescription">Upload Prescription</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="QuickMeds Mobile App" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-gray-600 mb-6">
                Get the best experience with our mobile app. Order medicines, track deliveries, and manage prescriptions on the go.
              </p>
              <div className="flex space-x-4">
                <button className="bg-black text-white rounded-lg px-4 py-2 flex items-center">
                  <div className="mr-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M17.6,13.8l1.1,2l-1.7,1.1L16,15l-2.6,1.5l-0.5-1L16,13.8l-2.5-4.3l1.7-1l1.3,2.3l1.3-2.3l1.7,1L17.6,13.8z M12,3 c3.3,0,6.3,1.5,8.3,3.9l-3,1.7c-1.3-1.4-3.2-2.3-5.3-2.3c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c3.1,0,5.8-1.9,6.9-4.7h-2.1 c-0.8,1.4-2.3,2.4-4.1,2.4c-2.6,0-4.6-2.1-4.6-4.7c0-2.6,2.1-4.7,4.6-4.7c1.5,0,2.8,0.7,3.7,1.7L14,13.1h-2v-2h6v0.7 C18,16.8,15.2,21,11.9,21C7,21,3,17,3,12.1C3,7.1,7,3,12,3L12,3z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </button>
                <button className="bg-black text-white rounded-lg px-4 py-2 flex items-center">
                  <div className="mr-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 16.7,21.95 15.66,21.97C14.61,22 14.08,21.54 13.04,21.54C12,21.54 11.39,21.95 10.46,21.97C9.34,22 8.06,20.68 7.23,19.47C5.53,17 4.2,12.45 6.05,9.39C6.96,7.87 8.54,6.91 10.26,6.88C11.39,6.86 12.45,7.4 13.14,7.4C13.83,7.4 15.11,6.74 16.5,6.88C17.13,6.91 19.11,7.1 20.45,8.93C20.35,9 18.21,10.27 18.24,12.96C18.28,16.17 21.04,17.22 21.08,17.24C21.03,17.39 20.63,18.9 19.74,20.13C18.97,21.17 18.14,21.97 17.15,21.97C16.15,21.97 15.69,21.54 14.58,21.54C13.57,21.54 13.01,21.94 12.09,21.94C11.16,21.94 10.34,21.17 9.58,20.13C9.28,19.69 9.01,19.2 8.76,18.68L8.76,18.68C8.59,18.31 8.44,17.92 8.3,17.5H8.15C9.45,16.76 10.27,15.54 10.47,14.17C10.65,12.92 10.2,11.73 9.21,10.74C8.73,10.26 8.13,9.89 7.46,9.67L7.46,9.67C8.33,8.5 9.6,7.78 10.86,7.78L10.86,7.78C12.21,7.78 13.21,8.4 13.91,8.4C14.58,8.4 15.71,7.69 17.28,7.69C18.37,7.69 19.43,8.22 20.19,9.08C17.26,10.46 17.49,14.71 20.45,15.63C19.85,17.21 19.03,18.8 18.71,19.5L18.71,19.5Z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
