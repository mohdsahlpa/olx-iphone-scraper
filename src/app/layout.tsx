
"use client"; // Auth0Provider requires client context

import type { Metadata } from 'next'; // Metadata can still be defined
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider as CustomAuthProvider } from '@/components/auth/auth-provider'; // Renamed to avoid conflict
import { Toaster } from "@/components/ui/toaster";
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = { // Metadata object needs to be defined outside client component
//   title: 'Minimalist Dashboard',
//   description: 'A minimalist dashboard application with iPhone listings.',
// };
// If you need dynamic metadata based on auth, that's a more advanced pattern.
// For now, static metadata can be in a server component layout if needed, or keep it simple.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // You can render a loading state or null on the server
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Basic loading state or app shell for SSR/SSG */}
        </body>
      </html>
    );
  }
  
  const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '');


  if (!auth0Domain || !auth0ClientId) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            <h1>Auth0 Configuration Error</h1>
            <p>Please set NEXT_PUBLIC_AUTH0_DOMAIN and NEXT_PUBLIC_AUTH0_CLIENT_ID in your .env.local file.</p>
            <p>Also ensure NEXT_PUBLIC_BASE_URL is set (e.g., http://localhost:9002 for local dev).</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Minimalist Dashboard</title>
        <meta name="description" content="A minimalist dashboard application with iPhone listings." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={{
            redirect_uri: baseUrl,
          }}
          cacheLocation="localstorage" // Recommended for SPAs
        >
          <CustomAuthProvider>
            {children}
            <Toaster />
          </CustomAuthProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
