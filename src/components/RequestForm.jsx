'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api';
import { Modal } from './ui';

export default function RequestForm({ service }) {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState({});
  const user = session?.user;
  const today = new Date().toISOString().slice(0, 10);

  if (isPending) return <button className="btn-primary w-full" disabled>Loading...</button>;
  if (!user) return <Link className="btn-accent w-full" href={`/sign-in?redirect=/services/${service._id}`}>Request Repair</Link>;
  if (user.role !== 'customer') return (<><button className="btn-primary w-full" disabled>Request Repair</button><p className="mt-2 text-sm text-slate-500">Only customers can request a repair.</p></>);

  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const errors = {};
    if (!f.phone.trim()) errors.phone = 'Phone is required';
    if (!f.address.trim()) errors.address = 'Address is required';
    if (!f.preferredDate || f.preferredDate < today) errors.preferredDate = 'Pick today or a future date';
    if (f.problemDescription.trim().length < 20) errors.problemDescription = 'Describe the problem in at least 20 characters';
    setErr(errors);
    if (Object.keys(errors).length) return;
    setBusy(true);
    try {
      await api('/bookings', { method: 'POST', body: { ...f, serviceId: service._id } });
      toast.success(<span>Request sent! <Link href="/dashboard/customer/bookings" className="underline">View My Bookings</Link></span>);
      setOpen(false);
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  }
  const E = ({ k }) => (err[k] ? <p className="mt-1 text-xs text-red-600">{err[k]}</p> : null);
  return (
    <>
      <button className="btn-accent w-full" onClick={() => setOpen(true)}>Request Repair</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Send a repair request">
        <form onSubmit={submit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="label">Name</label><input className="input bg-slate-100" value={user.name} readOnly /></div>
            <div><label className="label">Email</label><input className="input bg-slate-100" value={user.email} readOnly /></div>
          </div>
          <div><label className="label">Phone</label><input name="phone" className="input" defaultValue={user.phone || ''} /><E k="phone" /></div>
          <div><label className="label">Address</label><input name="address" className="input" /><E k="address" /></div>
          <div><label className="label">Preferred date</label><input name="preferredDate" type="date" min={today} className="input" /><E k="preferredDate" /></div>
          <div><label className="label">Problem description</label><textarea name="problemDescription" rows={4} className="input" /><E k="problemDescription" /></div>
          <button className="btn-primary w-full" disabled={busy}>{busy ? 'Sending...' : 'Send request'}</button>
        </form>
      </Modal>
    </>
  );
}
