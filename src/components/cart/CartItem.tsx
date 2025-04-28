
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types/medicine';
import { Minus, Plus, Trash } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { medicine, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(medicine.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeItem(medicine.id);
  };
  
  const itemTotal = medicine.price * quantity;
  
  return (
    <div className="flex py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-md overflow-hidden">
        <Link to={`/medicine/${medicine.id}`}>
          <img 
            src={medicine.imageUrl} 
            alt={medicine.name} 
            className="w-full h-full object-center object-cover"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between">
        <div>
          <div className="flex justify-between">
            <div>
              <Link to={`/medicine/${medicine.id}`}>
                <h3 className="text-base font-medium text-gray-900 hover:text-brand-500">
                  {medicine.name}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-gray-500">{medicine.manufacturer}</p>
              
              {medicine.requiresPrescription && (
                <span className="mt-2 inline-block bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
                  Prescription Required
                </span>
              )}
            </div>
            
            <div className="sm:hidden">
              <span className="font-medium text-gray-900">${itemTotal.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Quantity Controls - Mobile */}
          <div className="mt-4 sm:hidden">
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)} 
                className="px-2 py-1 text-gray-600 hover:text-brand-500"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              
              <span className="px-2 py-1 text-center w-10">{quantity}</span>
              
              <button 
                onClick={() => handleQuantityChange(quantity + 1)} 
                className="px-2 py-1 text-gray-600 hover:text-brand-500"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleRemove} 
              className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <Trash size={14} className="mr-1" />
              Remove
            </button>
          </div>
        </div>
        
        {/* Desktop - Price, Quantity, Remove */}
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <span className="font-medium text-gray-900">${itemTotal.toFixed(2)}</span>
          
          <div className="mt-2 flex items-center border rounded-md">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)} 
              className="px-2 py-1 text-gray-600 hover:text-brand-500"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            
            <span className="px-2 py-1 text-center w-10">{quantity}</span>
            
            <button 
              onClick={() => handleQuantityChange(quantity + 1)} 
              className="px-2 py-1 text-gray-600 hover:text-brand-500"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove} 
            className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800"
          >
            <Trash size={14} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
