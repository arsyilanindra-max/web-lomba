import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/api.js';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  const navigateToLogin = () => {
    base44.auth.redirectToLogin();
  };

  // Skip complex checks for standalone - directly ready
  useEffect(() => {
    setIsLoadingPublicSettings(false);
    setIsLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      navigateToLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

