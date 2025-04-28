
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilter from '@/components/product/CategoryFilter';
import { getMedicines } from '@/services/medicineService';
import { Medicine } from '@/types/medicine';

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setIsLoading(true);
        const data = await getMedicines();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicines();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(
        medicine => medicine.category === selectedCategory
      );
      setFilteredMedicines(filtered);
    }
  }, [selectedCategory, medicines]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL without reloading
    const url = new URL(window.location.href);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url.toString());
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Browse Medicines</h1>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters - Mobile */}
          <div className="md:hidden mb-6">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 mr-8">
            <div className="sticky top-24">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
          
          {/* Medicine List */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGrid products={[]} isLoading={true} />
            ) : filteredMedicines.length > 0 ? (
              <ProductGrid products={filteredMedicines} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No medicines found for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicineList;
