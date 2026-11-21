'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Briefcase, CreditCard, LayoutDashboard, ListChecks, LogOut, Menu, PlusCircle, ClipboardList, Users, Wrench, Receipt, UserCog, Home, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { resetToken } from '@/lib/api';
import { dashboardFor } from '@/lib/constants';
import { Logo, UserPill } from '@/components/ui';
import { DashboardShellSkeleton } from '@/components/Skeletons';

const MENUS = {
  customer: [['/dashboard/customer', 'Overview', LayoutDashboard], ['/dashboard/customer/bookings', 'My Bookings', ClipboardList], ['/dashboard/customer/payments', 'Payment History', CreditCard]],
  technician: [['/dashboard/technician', 'Overview', LayoutDashboard], ['/dashboard/technician/add-service', 'Add Service', PlusCircle], ['/dashboard/technician/my-services', 'My Services', Briefcase], ['/dashboard/technician/requests', 'Manage Requests', ListChecks]],
  admin: [['/dashboard/admin', 'Overview', LayoutDashboard], ['/dashboard/admin/users', 'Manage Users', Users], ['/dashboard/admin/services', 'Service Approval', Wrench], ['/dashboard/admin/bookings', 'All Bookings', ClipboardList], ['/dashboard/admin/transactions', 'Transactions', Receipt]],
};

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const user = session?.user;
  const seg = pathname.split('/')[2];
  const wrongRole = user && MENUS[seg] && seg !== user.role;

  useEffect(() => {
    if (isPending) return;
    if (!user) router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    else if (wrongRole) router.replace(dashboardFor(user.role));
  }, [isPending, user, wrongRole, pathname, router]);

  async function signOut() {
    setAccountOpen(false);
    await authClient.signOut();
    resetToken();
    router.replace('/');
  }

  if (isPending || !user || wrongRole) return <DashboardShellSkeleton />;
  const menu = [...(MENUS[user.role] || MENUS.customer), ['/dashboard/profile', 'Update Profile', UserCog]];
  const nav = (
    <nav className="flex flex-col gap-1 p-3">{menu.map(([href, label, I]) => (
      <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${pathname === href ? 'bg-signal text-ink' : 'text-white/80 hover:bg-white/10'}`}><I size={18} />{label}</Link>))}</nav>
  );
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 bg-ink-800 lg:block"><div className="p-4"><Logo light /></div>{nav}</aside>
      {open && (<div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
        <aside className="relative h-full w-64 bg-ink-800"><div className="flex items-center justify-between p-4"><Logo light /><button onClick={() => setOpen(false)} className="text-white" aria-label="Close menu"><X /></button></div>{nav}</aside></div>)}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
          <button className="rounded p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          <Link href="/" className="hidden items-center gap-2 text-sm font-medium text-ink lg:flex"><Home size={16} /> Back to Home</Link>
          <div className="relative">
            <UserPill user={user} onClick={() => setAccountOpen(!accountOpen)} expanded={accountOpen} />
            {accountOpen && (
              <div className="card absolute right-0 mt-2 w-60 p-2 shadow-xl" onMouseLeave={() => setAccountOpen(false)}>
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="truncate font-semibold">{user.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-signal/15 px-2 py-0.5 text-xs font-semibold capitalize text-signal-dark">{user.role}</span>
                </div>
                <Link href="/dashboard/profile" onClick={() => setAccountOpen(false)} className="mt-1 flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-ink-50"><UserCog size={16} /> Update profile</Link>
                <Link href="/" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-ink-50"><Home size={16} /> Back to home</Link>
                <button type="button" onClick={signOut} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"><LogOut size={16} /> Sign out</button>
              </div>
            )}
          </div>
        </header>
        <main className="w-full flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
