import Link from 'next/link';
export default function Cancel() {
  return (
    <div className="grid min-h-screen place-items-center px-4"><div className="card max-w-md p-8 text-center">
      <h1 className="text-2xl font-bold">Payment cancelled</h1><p className="mt-2 text-slate-600">No money was taken. You can pay whenever you are ready.</p>
      <Link href="/dashboard/customer/bookings" className="btn-primary mt-6">Try Again</Link></div></div>
  );
}
