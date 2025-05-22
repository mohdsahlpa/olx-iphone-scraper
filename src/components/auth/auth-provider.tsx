
"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { useAuth0, User as Auth0User } from '@auth0/auth0-react';
import { whitelistedEmails } from '@/lib/whitelist';
import { AuthContext, type AuthContextType } from '@/hooks/use-auth';
// Toasts are removed as Auth0 typically handles errors via its own UI or redirects.

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user: auth0User, 
    isAuthenticated, 
    isLoading: auth0IsLoading, 
    loginWithRedirect, 
    logout: auth0Logout,
    getAccessTokenSilently // Example of getting token if needed for API calls
  } = useAuth0<Auth0User>();
  
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    if (isAuthenticated && auth0User?.email) {
      setIsWhitelisted(whitelistedEmails.includes(auth0User.email));
    } else {
      setIsWhitelisted(false);
    }
  }, [isAuthenticated, auth0User]);

  const logout = async (options?: { logoutParams?: { returnTo?: string } }) => {
    const logoutOptions = options || { 
      logoutParams: { 
        returnTo: process.env.NEXT_PUBLIC_BASE_URL || window.location.origin 
      } 
    };
    await auth0Logout(logoutOptions);
  };
  
  const contextValue: AuthContextType = {
    user: auth0User,
    isAuthenticated,
    isLoading: auth0IsLoading,
    isWhitelisted,
    loginWithRedirect,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
