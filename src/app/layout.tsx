import type { Metadata } from 'next';
import './globals.css';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Campus Action AI - Turn Campus Benefits into Student Action',
  description: 'AI-powered Campus Opportunity, Benefits & Student Support Platform connecting students with institutional opportunities from QR scan to application status tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-white text-primaryText antialiased">
        <DemoBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
