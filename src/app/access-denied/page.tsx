
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ShieldAlert, LogIn } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function AccessDeniedPage() {
  const { user, isAuthenticated, isLoading, isWhitelisted, logout, loginWithRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (isWhitelisted) {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, isWhitelisted, router]);

  const handleSignOutAndLogin = async () => {
    await logout({ logoutParams: { returnTo: (process.env.NEXT_PUBLIC_BASE_URL || window.location.origin) + '/login' } });
    // Auth0 will handle redirect to login after logout if returnTo is login page.
    // Or, if login page automatically calls loginWithRedirect, that might be sufficient.
    // Forcing another login call might be redundant or handled by Auth0's flow.
  };


  if (isLoading || (!isLoading && !isAuthenticated) || (!isLoading && isAuthenticated && isWhitelisted)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <ShieldAlert className="mb-6 h-20 w-20 text-destructive" />
      <h1 className="text-4xl font-bold text-foreground mb-4">Access Denied</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Your account ({user?.email || 'current user'}) is not authorized to access this dashboard. 
        Please contact an administrator if you believe this is an error.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_BASE_URL || window.location.origin } })} variant="outline">
          Sign Out
        </Button>
        <Button onClick={handleSignOutAndLogin}>
          <LogIn className="mr-2 h-4 w-4" /> Try a Different Account
        </Button>
      </div>
    </div>
  );
}
