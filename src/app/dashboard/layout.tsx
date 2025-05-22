
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, isWhitelisted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (!isWhitelisted) {
        router.replace('/access-denied');
      }
    }
  }, [isAuthenticated, isLoading, isWhitelisted, router]);

  if (isLoading || !isAuthenticated || !isWhitelisted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
