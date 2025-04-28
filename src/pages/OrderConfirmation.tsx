
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-lg mb-2">Thank you for your order.</p>
          <p className="text-gray-600 mb-6">
            Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <span className="text-gray-500 text-sm">Order Number</span>
              <p className="font-medium">{orderNumber}</p>
            </div>
            
            <div>
              <span className="text-gray-500 text-sm">Estimated Delivery</span>
              <p className="font-medium">
                {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
                  'en-US',
                  { weekday: 'long', month: 'long', day: 'numeric' }
                )}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link to="/orders">
              <Button variant="outline" className="mr-4">
                View Orders
              </Button>
            </Link>
            
            <Link to="/medicines">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
