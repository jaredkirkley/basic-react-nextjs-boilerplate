import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Basic React Next.js Boilerplate',
  description: 'A minimal Next.js + TypeScript boilerplate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
