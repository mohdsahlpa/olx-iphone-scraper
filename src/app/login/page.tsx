
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginButton } from '@/components/auth/login-button';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/ui/spinner';

export default function LoginPage() {
  const { isAuthenticated, isLoading, isWhitelisted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isWhitelisted) {
        router.replace('/dashboard');
      } else {
        router.replace('/access-denied');
      }
    }
  }, [isAuthenticated, isLoading, isWhitelisted, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }
  
  // Only show login button if not loading and not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary">Minimalist Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">Sign in to access your dashboard.</p>
        </div>
        <LoginButton />
      </div>
    );
  }

  // Fallback for when authenticated but redirection hasn't completed
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <Spinner className="h-12 w-12 text-primary" />
       <p className="mt-4 text-muted-foreground">Redirecting...</p>
    </div>
  );
}
