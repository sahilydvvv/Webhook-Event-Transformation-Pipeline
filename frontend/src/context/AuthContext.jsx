import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, login as loginApi, signup as signupApi, logout as logoutApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getProfile();
        setUser(data.user || data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setUser(data.user || data);
    return data;
  };

  const signup = async (userData) => {
    const data = await signupApi(userData);
    setUser(data.user || data);
    return data;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
