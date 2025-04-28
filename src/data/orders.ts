
import { Order } from '../types/medicine';
import { medicinesData } from './medicines';

export const ordersData: Order[] = [
  {
    id: 'order-001',
    items: [
      { medicine: medicinesData[0], quantity: 2 },
      { medicine: medicinesData[2], quantity: 1 },
    ],
    totalAmount: 20.73,
    status: 'delivered',
    date: '2023-12-15',
    shippingAddress: {
      name: 'Demo User',
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      postalCode: '10001',
      phone: '(555) 123-4567',
    },
  },
  {
    id: 'order-002',
    items: [
      { medicine: medicinesData[3], quantity: 1 },
      { medicine: medicinesData[9], quantity: 1 },
    ],
    totalAmount: 27.24,
    status: 'shipped',
    date: '2024-01-23',
    shippingAddress: {
      name: 'Demo User',
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      postalCode: '10001',
      phone: '(555) 123-4567',
    },
  },
  {
    id: 'order-003',
    items: [
      { medicine: medicinesData[5], quantity: 1 },
      { medicine: medicinesData[10], quantity: 2 },
      { medicine: medicinesData[11], quantity: 1 },
    ],
    totalAmount: 49.23,
    status: 'processing',
    date: '2024-02-18',
    shippingAddress: {
      name: 'Demo User',
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      postalCode: '10001',
      phone: '(555) 123-4567',
    },
  },
];
