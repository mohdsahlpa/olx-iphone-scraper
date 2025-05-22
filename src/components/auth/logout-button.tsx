"use client";

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/ui/spinner';

export function LogoutButton() {
  const { signOut, loading } = useAuth();

  return (
    <Button
      onClick={signOut}
      disabled={loading}
      variant="ghost"
      size="icon"
      aria-label="Sign Out"
    >
      {loading ? <Spinner className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
    </Button>
  );
}
