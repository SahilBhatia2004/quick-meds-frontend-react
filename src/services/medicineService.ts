
import api from './api';
import { Medicine } from '../types/medicine';
import { medicinesData } from '../data/medicines';

// In a real application, this would call the API
// For now, we'll use dummy data

export const getMedicines = async (category?: string): Promise<Medicine[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...medicinesData];
      
      if (category && category !== 'all') {
        result = result.filter(med => med.category === category);
      }
      
      resolve(result);
    }, 500);
  });
};

export const getMedicineById = async (id: string): Promise<Medicine | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const medicine = medicinesData.find(med => med.id === id);
      resolve(medicine);
    }, 300);
  });
};

export const searchMedicines = async (query: string): Promise<Medicine[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = medicinesData.filter(
        med => 
          med.name.toLowerCase().includes(query.toLowerCase()) || 
          med.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};
