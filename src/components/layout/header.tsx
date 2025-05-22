
"use client";

import Link from 'next/link';
import { LogoutButton } from '@/components/auth/logout-button';
import { useAuth } from '@/hooks/use-auth';
import { Smartphone, UserCircle2 } from 'lucide-react'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, isAuthenticated } = useAuth();

  const getUserInitials = (name?: string, email?: string): string => {
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between p-5">
        <Link href="/dashboard" className="flex items-center gap-2" aria-label="Dashboard Home">
           <Smartphone className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold text-foreground">
            Minimalist Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {user.picture && <AvatarImage src={user.picture} alt={user.name || user.email || 'User Avatar'} />}
                <AvatarFallback>
                  {user.picture ? <UserCircle2 className="h-5 w-5" /> : getUserInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {user.name || user.email}
              </span>
            </div>
          )}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
