
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { searchMedicines } from '@/services/medicineService';
import { Medicine } from '@/types/medicine';

const Search: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  
  const [results, setResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        if (searchQuery.trim()) {
          const data = await searchMedicines(searchQuery);
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error searching medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [searchQuery]);
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-2">Search Results</h1>
        
        {searchQuery && (
          <p className="text-gray-600 mb-6">
            Showing results for "{searchQuery}"
          </p>
        )}
        
        {isLoading ? (
          <ProductGrid products={[]} isLoading={true} />
        ) : results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">
              No medicines found matching "{searchQuery}".
            </p>
            <p className="text-gray-500">
              Try using different keywords or check for spelling errors.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
