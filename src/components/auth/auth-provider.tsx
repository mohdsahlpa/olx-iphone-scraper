"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { whitelistedEmails } from '@/lib/whitelist';
import { AuthContext, type AuthContextType } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        setIsWhitelisted(whitelistedEmails.includes(currentUser.email));
      } else {
        setIsWhitelisted(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle setting user and whitelist status
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
      toast({
        title: "Sign In Failed",
        description: error.message || "An unexpected error occurred during sign-in.",
        variant: "destructive",
      });
      setLoading(false); // Ensure loading is false on error
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setIsWhitelisted(false);
    } catch (error: any) {
      console.error("Error signing out: ", error);
      toast({
        title: "Sign Out Failed",
        description: error.message || "An unexpected error occurred during sign-out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const contextValue: AuthContextType = {
    user,
    loading,
    isWhitelisted,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
