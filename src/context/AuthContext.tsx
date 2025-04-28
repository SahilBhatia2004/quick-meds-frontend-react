
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, logout, register, resetPassword, getCurrentUser } from '../services/authService';
import type { User, LoginCredentials, RegisterDetails } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (details: RegisterDetails) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const { user } = await login(credentials);
      setUser(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (details: RegisterDetails): Promise<void> => {
    try {
      setIsLoading(true);
      const { user } = await register(details);
      setUser(user);
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not register user",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    try {
      await resetPassword(email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Could not send password reset email",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        resetPassword: handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
