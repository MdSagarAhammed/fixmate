import './globals.css';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { Toaster } from 'sonner';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Figtree({ subsets: ['latin'], variable: '--font-body' });

export const metadata = { title: 'FixMate | Device & Home Appliance Repair', description: 'Book verified technicians, track every repair, pay only after the job is done.' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}<Toaster richColors position="top-right" /></body>
    </html>
  );
}
