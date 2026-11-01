import type { Metadata } from 'next';
import { Header } from '@/components/cyberize/header';
import { Footer } from '@/components/cyberize/footer';
import './globals.css';
export const metadata: Metadata = { title: 'Cyberize Group', description: 'Website design and development, support and maintenance, SEO and PPC.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
