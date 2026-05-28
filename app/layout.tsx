import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'UP IN SMOKE COLLECTIVE | Medical Wellness Gateway',
  description: 'Premium UK medical-wellness intake experience connecting eligible patients to licensed clinical partners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
