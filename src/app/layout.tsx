
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
  const auth0BaseUrlFromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  
  // This baseUrl is used for the redirect_uri. If NEXT_PUBLIC_BASE_URL is set, it will be used.
  // Otherwise, it falls back to window.location.origin (client-side only).
  // The check below ensures NEXT_PUBLIC_BASE_URL is set for the app to proceed.
  const effectiveBaseUrl = auth0BaseUrlFromEnv || (typeof window !== 'undefined' ? window.location.origin : '');


  if (!auth0Domain || !auth0ClientId || !auth0BaseUrlFromEnv) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red', backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Auth0 Configuration Error</h1>
            <p style={{maxWidth: '600px', lineHeight: '1.6'}}>
              The application requires Auth0 to be configured. Please ensure the following environment variables are set in your <code>.env.local</code> file:
            </p>
            <ul style={{listStyle: 'none', padding: '0', textAlign: 'left', backgroundColor: '#f8f8f8', border: '1px solid #ddd', borderRadius: '4px', padding: '15px', margin: '10px 0' }}>
              <li><strong>NEXT_PUBLIC_AUTH0_DOMAIN</strong>: Your Auth0 application domain. {!auth0Domain && <span style={{color: 'red'}}>(Missing)</span>}</li>
              <li><strong>NEXT_PUBLIC_AUTH0_CLIENT_ID</strong>: Your Auth0 application client ID. {!auth0ClientId && <span style={{color: 'red'}}>(Missing)</span>}</li>
              <li><strong>NEXT_PUBLIC_BASE_URL</strong>: The base URL of your application (e.g., http://localhost:9002 for local development). {!auth0BaseUrlFromEnv && <span style={{color: 'red'}}>(Missing)</span>}</li>
            </ul>
            <p>After adding these to <code>.env.local</code>, please restart your development server.</p>
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
            redirect_uri: effectiveBaseUrl, // This will be process.env.NEXT_PUBLIC_BASE_URL due to the check above
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
