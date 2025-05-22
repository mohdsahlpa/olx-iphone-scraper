import Link from 'next/link';
import { LogoutButton } from '@/components/auth/logout-button';
import { Smartphone } from 'lucide-react'; // Example icon

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2" aria-label="Dashboard Home">
           <Smartphone className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold text-foreground">
            Minimalist Dashboard
          </span>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
