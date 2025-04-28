
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, Medicine } from '../types/medicine';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (medicine: Medicine, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const total = items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity, 
    0
  );

  const addItem = (medicine: Medicine, quantity = 1): void => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        item => item.medicine.id === medicine.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        
        toast({
          title: "Cart updated",
          description: `Updated ${medicine.name} quantity`,
        });
        
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        toast({
          title: "Added to cart",
          description: `Added ${medicine.name} to your cart`,
        });
        
        return [...prevItems, { medicine, quantity }];
      }
    });
  };

  const removeItem = (medicineId: string): void => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.medicine.id === medicineId);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `Removed ${itemToRemove.medicine.name} from your cart`,
        });
      }
      
      return prevItems.filter(item => item.medicine.id !== medicineId);
    });
  };

  const updateQuantity = (medicineId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(medicineId);
      return;
    }

    setItems((prevItems) => 
      prevItems.map(item => 
        item.medicine.id === medicineId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = (): void => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
