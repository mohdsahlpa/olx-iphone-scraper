
"use client";

import React, { useContext } from 'react';
import type { User as Auth0User } from '@auth0/auth0-react';

// Define the AuthContext state structure for Auth0
export interface AuthContextType {
  user: Auth0User | undefined; // Auth0 user object (can be undefined)
  isAuthenticated: boolean;   // Provided by Auth0
  isLoading: boolean;         // Auth0's loading state
  isWhitelisted: boolean;
  loginWithRedirect: () => Promise<void>; // Auth0's login method
  logout: (options?: { logoutParams?: { returnTo?: string } }) => Promise<void>; // Auth0's logout method
}

export const AuthContext = React.createContext<AuthContextType>(undefined!);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
