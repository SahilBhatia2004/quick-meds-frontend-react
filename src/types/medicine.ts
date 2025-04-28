
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dosage: string;
  manufacturer: string;
  category: string;
  inStock: boolean;
  requiresPrescription: boolean;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
}
