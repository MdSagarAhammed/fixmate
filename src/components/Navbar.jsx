'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Menu, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { dashboardFor } from '@/lib/constants';
import { resetToken } from '@/lib/api';
import { Logo, UserPill } from './ui';

const LINKS = [{ href: '/', label: 'Home' }, { href: '/services', label: 'Services' }, { href: '/about', label: 'How It Works' }];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const user = session?.user;
  const active = (h) => (h === '/' ? pathname === '/' : pathname.startsWith(h));

  async function signOut() {
    await authClient.signOut();
    resetToken(); setMenu(false);
    toast.success('Signed out');
    window.location.assign('/');
  }
  const link = (l) => (
    <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
      className={`rounded-lg px-3 py-2 text-sm font-medium ${active(l.href) ? 'bg-ink text-white' : 'text-slate-700 hover:bg-ink-50'}`}>{l.label}</Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">{LINKS.map(link)}</nav>
        <div className="flex items-center gap-2">
          {!isPending && !user && (<div className="hidden gap-2 sm:flex"><Link href="/sign-in" className="btn-outline">Sign In</Link><Link href="/sign-up" className="btn-accent">Get Started</Link></div>)}
          {user && (
            <div className="relative">
              <UserPill user={user} onClick={() => setMenu(!menu)} expanded={menu} />
              {menu && (
                <div className="card absolute right-0 mt-2 w-60 p-2 shadow-lg" onMouseLeave={() => setMenu(false)}>
                  <div className="border-b border-slate-100 px-3 py-2"><p className="truncate font-semibold">{user.name}</p>
                    <span className="mt-1 inline-block rounded-full bg-signal/30 px-2 py-0.5 text-xs font-semibold capitalize text-ink">{user.role}</span></div>
                  <Link className="block rounded px-3 py-2 text-sm hover:bg-ink-50" href={dashboardFor(user.role)} onClick={() => setMenu(false)}>Dashboard</Link>
                  <Link className="block rounded px-3 py-2 text-sm hover:bg-ink-50" href="/dashboard/profile" onClick={() => setMenu(false)}>Update Profile</Link>
                  <button className="block w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={signOut}>Sign Out</button>
                </div>)}
            </div>)}
          <button className="rounded p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="container-x flex flex-col gap-1 pb-4 md:hidden">{LINKS.map(link)}
          {!user && <div className="mt-2 flex gap-2"><Link href="/sign-in" className="btn-outline flex-1">Sign In</Link><Link href="/sign-up" className="btn-accent flex-1">Get Started</Link></div>}</div>)}
    </header>
  );
}
