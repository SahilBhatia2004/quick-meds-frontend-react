
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart } from 'lucide-react';
import { getMedicineById } from '@/services/medicineService';
import { useCart } from '@/context/CartContext';
import { Medicine } from '@/types/medicine';
import ProductGrid from '@/components/product/ProductGrid';
import { medicinesData } from '@/data/medicines';

const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getMedicineById(id);
        
        if (data) {
          setMedicine(data);
          
          // Find related products (same category)
          const related = medicinesData
            .filter(m => m.category === data.category && m.id !== data.id)
            .slice(0, 4);
            
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicine();
  }, [id]);
  
  const handleAddToCart = () => {
    if (medicine) {
      addItem(medicine, quantity);
    }
  };
  
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-gray-200 rounded-lg h-80"></div>
              </div>
              <div className="md:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!medicine) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-semibold mb-4">Medicine Not Found</h1>
          <p className="mb-6">The medicine you're looking for doesn't exist or has been removed.</p>
          <Link to="/medicines" className="btn-primary inline-block">
            Browse Medicines
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <div className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-brand-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/medicines" className="hover:text-brand-500">Medicines</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{medicine.name}</span>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={medicine.imageUrl} 
                alt={medicine.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
            
            <p className="text-gray-600 mb-4">Manufacturer: {medicine.manufacturer}</p>
            
            {medicine.requiresPrescription && (
              <div className="mb-4 bg-orange-100 text-orange-700 px-3 py-2 rounded-md text-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Prescription Required
              </div>
            )}
            
            <div className="text-2xl font-bold text-brand-700 mb-4">
              ${medicine.price.toFixed(2)}
            </div>
            
            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-brand-500"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity" 
                    min="1" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="w-12 text-center border-0 focus:outline-none focus:ring-0"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-brand-500"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart size={18} />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="dosage">Dosage</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <p className="text-gray-700">
                  {medicine.description}
                </p>
              </TabsContent>
              
              <TabsContent value="dosage" className="py-4">
                <p className="text-gray-700">
                  <strong className="font-medium">Recommended Dosage:</strong><br />
                  {medicine.dosage}
                </p>
                <p className="text-gray-700 mt-4">
                  <strong className="font-medium">Important:</strong><br />
                  Always follow your doctor's instructions for dosage. The information provided here is general and might not apply to your specific case.
                </p>
              </TabsContent>
              
              <TabsContent value="details" className="py-4">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">Manufacturer:</span>
                    <span className="text-gray-600">{medicine.manufacturer}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">Category:</span>
                    <span className="text-gray-600">{medicine.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">In Stock:</span>
                    <span className={medicine.inStock ? "text-green-600" : "text-red-600"}>
                      {medicine.inStock ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">Prescription:</span>
                    <span className="text-gray-600">
                      {medicine.requiresPrescription ? "Required" : "Not Required"}
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicineDetail;
