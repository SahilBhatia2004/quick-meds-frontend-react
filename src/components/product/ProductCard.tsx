
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Medicine } from '@/types/medicine';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  medicine: Medicine;
}

const ProductCard: React.FC<ProductCardProps> = ({ medicine }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(medicine, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      {/* Product Image & Quick Actions */}
      <div className="relative">
        <Link to={`/medicine/${medicine.id}`}>
          <img 
            src={medicine.imageUrl} 
            alt={medicine.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        <div className="absolute top-2 right-2">
          <button 
            className="p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
            aria-label="Add to favorites"
          >
            <Heart size={18} />
          </button>
        </div>
        
        {medicine.requiresPrescription && (
          <div className="absolute bottom-2 left-2 bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-medium">
            Prescription Required
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/medicine/${medicine.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-brand-500">
            {medicine.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-2">
          {medicine.manufacturer}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-brand-700 font-bold">
            ${medicine.price.toFixed(2)}
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-brand-500 hover:bg-brand-500 hover:text-white border-brand-500"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
