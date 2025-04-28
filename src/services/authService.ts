
import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterDetails {
  name: string;
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<{ user: User, token: string }> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo validation - in real app this would be server-side
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const userData = {
          user: {
            id: 'user-1',
            name: 'Demo User',
            email: 'demo@example.com',
          },
          token: 'fake-jwt-token',
        };
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
        resolve(userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const register = async (details: RegisterDetails): Promise<{ user: User, token: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userData = {
        user: {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          name: details.name,
          email: details.email,
        },
        token: 'fake-jwt-token',
      };
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
      resolve(userData);
    }, 500);
  });
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const resetPassword = async (email: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would trigger a password reset email
      resolve();
    }, 500);
  });
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
