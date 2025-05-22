"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ShieldAlert, LogIn } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function AccessDeniedPage() {
  const { user, loading, isWhitelisted, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (isWhitelisted) {
        router.replace('/dashboard');
      }
    }
  }, [user, loading, isWhitelisted, router]);

  if (loading || (!loading && !user) || (!loading && user && isWhitelisted)) {
    // Show spinner while loading, or if redirecting
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
        Your account ({user?.email}) is not authorized to access this dashboard. 
        Please contact an administrator if you believe this is an error.
      </p>
      <div className="flex space-x-4">
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" /> Try a Different Account
          </Link>
        </Button>
      </div>
    </div>
  );
}
