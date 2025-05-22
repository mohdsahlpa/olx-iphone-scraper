"use client";

import { useContext } from 'react';
import type { User } from 'firebase/auth';

// Define the AuthContext state structure
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isWhitelisted: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context with a default undefined value initially.
// AuthProvider will supply the actual value.
// This avoids errors if consumed outside the provider during initial setup,
// though proper usage means always consuming within a provider.
// The ! assertion is safe here as the context will be provided.
export const AuthContext = React.createContext<AuthContextType>(undefined!);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
