
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, count, clearCart } = useCart();
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        {count === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-6">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any medicines to your cart yet.</p>
            <Link to="/medicines">
              <Button>Browse Medicines</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Cart Items ({count})</h2>
                  <Button 
                    variant="ghost" 
                    onClick={clearCart} 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.medicine.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
