import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Logo, XIcon } from './ui';

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: Linkedin },
  { label: 'X', href: 'https://x.com', Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink-800 text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div><Logo light /><p className="mt-4 max-w-xs text-sm">Verified technicians, trackable jobs, and payment only after the repair is done.</p>
          <div className="mt-5 flex gap-3">{SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`FixMate on ${label}`} title={label} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-signal hover:text-ink"><Icon size={16} /></a>
          ))}</div></div>
        <div><h4 className="mb-3 font-semibold text-white">Quick links</h4><ul className="space-y-2 text-sm">
          <li><Link href="/" className="transition hover:text-signal">Home</Link></li><li><Link href="/services" className="transition hover:text-signal">Services</Link></li><li><Link href="/about" className="transition hover:text-signal">About</Link></li><li><Link href="/sign-up" className="transition hover:text-signal">Get Started</Link></li></ul></div>
        <div><h4 className="mb-3 font-semibold text-white">Popular categories</h4><ul className="space-y-2 text-sm">
          {['Smartphone', 'AC', 'Laptop & PC', 'Refrigerator'].map((c) => <li key={c}><Link href={`/services?category=${encodeURIComponent(c)}`} className="transition hover:text-signal">{c}</Link></li>)}</ul></div>
        <div><h4 className="mb-3 font-semibold text-white">Contact</h4><ul className="space-y-2 text-sm">
          <li><a href="mailto:help@fixmate.com" className="flex items-center gap-2 transition hover:text-signal"><Mail size={16} /> help@fixmate.com</a></li>
          <li><a href="tel:+8801700000000" className="flex items-center gap-2 transition hover:text-signal"><Phone size={16} /> +880 1700-000000</a></li>
          <li><a href="https://maps.google.com/?q=Mirpur+10,+Dhaka,+Bangladesh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-signal"><MapPin size={16} /> Mirpur 10, Dhaka, Bangladesh</a></li></ul></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">&copy; {new Date().getFullYear()} FixMate. All rights reserved.</p>
    </footer>
  );
}
