"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/ui/spinner';

export default function HomePage() {
  const { user, loading, isWhitelisted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (isWhitelisted) {
          router.replace('/dashboard');
        } else {
          router.replace('/access-denied');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, isWhitelisted, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Spinner className="h-12 w-12 text-primary" />
    </div>
  );
}
