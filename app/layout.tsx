import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UP IN SMOKE | UK Medical Wellness',
  description:
    'A premium UK wellness platform helping eligible patients connect with licensed clinics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
