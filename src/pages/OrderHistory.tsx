
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types/medicine';
import { ordersData } from '@/data/orders';

const OrderHistory: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Account Required</h2>
            <p className="text-gray-600 mb-6">Please log in to view your order history.</p>
            <Link to="/login?redirect=orders">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{order.id}</h3>
                      <p className="text-gray-500 text-sm">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Badge className={`${getStatusColor(order.status)} capitalize`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Delivered to: {order.shippingAddress.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <ul className="space-y-3">
                      {order.items.map(item => (
                        <li key={item.medicine.id} className="flex justify-between">
                          <div className="flex items-center">
                            <img 
                              src={item.medicine.imageUrl} 
                              alt={item.medicine.name}
                              className="w-12 h-12 rounded object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{item.medicine.name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} x ${item.medicine.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${(item.quantity * item.medicine.price).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div>
                      <p className="font-medium">Total</p>
                      <p className="text-gray-500 text-sm">Incl. shipping & taxes</p>
                    </div>
                    <p className="text-xl font-bold">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Order Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">No Orders Found</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Button asChild>
              <Link to="/medicines">Browse Medicines</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
