'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useApi } from '@/lib/useApi';
import { Badge, ConfirmModal, Empty, Table, Thumb, fmtDate, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function MyBookings() {
  const { data, loading, reload } = useApi('/bookings/my');
  const [target, setTarget] = useState(null);
  const [paying, setPaying] = useState('');
  async function cancel() {
    try { await api(`/bookings/${target._id}/cancel`, { method: 'PATCH' }); toast.success('Request cancelled'); reload(); } catch (e) { toast.error(e.message); }
    setTarget(null);
  }
  async function pay(b) {
    setPaying(b._id);
    try { const { url } = await api('/payments/create-checkout-session', { method: 'POST', body: { bookingId: b._id } }); window.location.assign(url); }
    catch (e) { toast.error(e.message); setPaying(''); }
  }
  if (loading) return <TableSkeleton rows={7} />;
  return (<><PageHead title="My Bookings" />
    <Table rows={data} empty={<Empty title="No bookings yet" text="Find a repair service and send your first request." action={<Link href="/services" className="btn-primary mt-2">Browse services</Link>} />}
      cols={[{ h: 'Service', r: (b) => <Thumb src={b.serviceImage} title={b.serviceTitle} /> }, { h: 'Technician', r: (b) => b.technicianName }, { h: 'Date', r: (b) => fmtDate(b.preferredDate) },
        { h: 'Amount', r: (b) => money(b.status === 'completed' ? b.finalAmount : b.basePrice) }, { h: 'Status', r: (b) => <Badge value={b.status} /> }, { h: 'Payment', r: (b) => <Badge value={b.paymentStatus} /> },
        { h: 'Action', r: (b) => b.status === 'requested' ? <button className="btn-outline" onClick={() => setTarget(b)}>Cancel</button>
          : b.status === 'completed' && b.paymentStatus === 'unpaid' ? <button className="btn-accent" disabled={paying === b._id} onClick={() => pay(b)}>Pay Now</button>
          : b.paymentStatus === 'paid' ? <Badge value="paid" /> : '-' }]} />
    <ConfirmModal open={!!target} onClose={() => setTarget(null)} onConfirm={cancel} title="Cancel this request?" text={`Your request for "${target?.serviceTitle}" will be cancelled. This cannot be undone.`} label="Cancel request" /></>);
}
