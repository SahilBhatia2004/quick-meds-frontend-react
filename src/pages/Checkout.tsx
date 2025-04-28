
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const Checkout: React.FC = () => {
  const { items, total, count, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'credit-card',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (count === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Simulate API call for processing order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - clear cart and navigate to confirmation
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });
      
      navigate('/order-confirmation');
    } catch (error) {
      toast({
        title: "Error processing order",
        description: "There was an issue processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to complete your order.",
        variant: "destructive",
      });
      navigate('/login?redirect=checkout');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {count === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
            <Button onClick={() => navigate('/medicines')}>
              Browse Medicines
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Delivery Details</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Contact Information */}
                  <div className="mb-6">
                    <h3 className="text-base font-medium mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h3 className="text-base font-medium mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input 
                          id="postalCode" 
                          name="postalCode" 
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-8">
                    <h3 className="text-base font-medium mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="credit-card"
                          name="paymentMethod"
                          type="radio"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="h-4 w-4 text-brand-500 focus:ring-brand-400"
                        />
                        <label htmlFor="credit-card" className="ml-3 text-gray-700">
                          Credit Card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="h-4 w-4 text-brand-500 focus:ring-brand-400"
                        />
                        <label htmlFor="paypal" className="ml-3 text-gray-700">
                          PayPal
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="cod"
                          name="paymentMethod"
                          type="radio"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleChange}
                          className="h-4 w-4 text-brand-500 focus:ring-brand-400"
                        />
                        <label htmlFor="cod" className="ml-3 text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
