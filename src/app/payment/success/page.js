'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { money } from '@/components/ui';
import { PaymentSkeleton } from '@/components/Skeletons';

export default function Success() {
  const [pay, setPay] = useState(null);
  const [error, setError] = useState('');
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return; ran.current = true;
    const id = new URLSearchParams(window.location.search).get('session_id');
    api(`/payments/verify?session_id=${id}`).then(setPay).catch((e) => setError(e.message));
  }, []);
  if (!pay && !error) return <PaymentSkeleton />;
  return (
    <div className="grid min-h-screen place-items-center px-4"><div className="card max-w-md p-8 text-center">
      {error ? <><h1 className="text-2xl font-bold">We could not confirm the payment</h1><p className="mt-2 text-slate-600">{error}</p></> : <>
        <CheckCircle2 className="mx-auto text-green-600" size={56} /><h1 className="mt-3 text-2xl font-bold">Payment successful</h1>
        <p className="mt-2 text-slate-600">You paid <b>{money(pay?.amount)}</b> for {pay?.serviceTitle}.</p>
        <p className="mt-1 break-all text-xs text-slate-500">Transaction: {pay?.transactionId}</p></>}
      <Link href="/dashboard/customer/bookings" className="btn-primary mt-6">Back to My Bookings</Link></div></div>
  );
}
