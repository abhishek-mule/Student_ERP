import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mock-data';
import { UserRole, isValidRole } from '../lib/utils';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('eduErpUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using mock data
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email && u.role === role);
        
        if (foundUser) {
          // In a real app, we would validate the password here
          setUser(foundUser);
          localStorage.setItem('eduErpUser', JSON.stringify(foundUser));
          setIsLoading(false);
        } else {
          throw new Error('Invalid credentials or role');
        }
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduErpUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
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