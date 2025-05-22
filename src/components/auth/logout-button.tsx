
"use client";

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/ui/spinner';

export function LogoutButton() {
  const { logout, isLoading } = useAuth();

  return (
    <Button
      onClick={() => logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_BASE_URL || window.location.origin } })}
      disabled={isLoading}
      variant="ghost"
      size="icon"
      aria-label="Sign Out"
    >
      {isLoading ? <Spinner className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
    </Button>
  );
}
