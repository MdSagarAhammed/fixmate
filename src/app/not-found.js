import Link from 'next/link';
import { Wrench, Settings } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4 text-center text-white">
      <div>
        <div className="relative mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-signal text-ink"><Wrench size={52} /><Settings size={30} className="absolute -right-3 -top-2 text-white" /></div>
        <h1 className="font-display text-6xl font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-white/80">This page is out for repair. We could not find what you were looking for.</p>
        <Link href="/" className="btn-accent mt-6">Back to Home</Link>
      </div>
    </div>
  );
}
