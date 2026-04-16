import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/components/AppProvider';

export const metadata: Metadata = {
  title: 'Timex Trade',
  description: 'A Stationery Venture',
  manifest: '/manifest.json',
  themeColor: '#4a72ff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Timex Trade',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="grainy-background" />
        <AppProvider>
          <div className="relative min-h-screen w-full overflow-x-hidden">
            {children}
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
