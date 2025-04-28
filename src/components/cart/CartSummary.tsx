
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { total, count } = useCart();
  
  const shippingFee = total > 40 ? 0 : 5.99;
  const subtotal = total;
  const grandTotal = subtotal + shippingFee;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({count} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          {shippingFee > 0 ? (
            <span className="font-medium">${shippingFee.toFixed(2)}</span>
          ) : (
            <span className="text-green-600">Free</span>
          )}
        </div>
        
        {shippingFee > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            Free shipping on orders over $40
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold text-lg">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {onCheckout ? (
        <Button
          onClick={onCheckout}
          className="w-full mt-6"
          disabled={count === 0}
        >
          Proceed to Checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button
            className="w-full mt-6"
            disabled={count === 0}
          >
            Proceed to Checkout
          </Button>
        </Link>
      )}
      
      <div className="mt-4">
        <Link to="/medicines" className="text-brand-500 hover:text-brand-600 text-sm flex justify-center">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
