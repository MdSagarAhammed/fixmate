'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useApi } from '@/lib/useApi';
import { Badge, ConfirmModal, Empty, Modal, Table, fmtDate } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function Requests() {
  const { data, loading, reload } = useApi('/bookings/technician');
  const [filter, setFilter] = useState('all');
  const [reject, setReject] = useState(null);
  const [done, setDone] = useState(null);
  const [amount, setAmount] = useState('');
  async function setStatus(b, status, finalAmount) {
    try { await api(`/bookings/${b._id}/status`, { method: 'PATCH', body: { status, finalAmount } }); toast.success(`Job marked ${status.replace('-', ' ')}`); reload(); } catch (e) { toast.error(e.message); }
  }
  if (loading) return <TableSkeleton rows={7} columns={7} />;
  const rows = (data || []).filter((b) => filter === 'all' || b.status === filter);
  const actions = (b) => ({
    requested: <div className="flex gap-2"><button className="btn-primary" onClick={() => setStatus(b, 'accepted')}>Accept</button><button className="btn-danger" onClick={() => setReject(b)}>Reject</button></div>,
    accepted: <button className="btn-primary" onClick={() => setStatus(b, 'in-progress')}>Start Work</button>,
    'in-progress': <button className="btn-accent" onClick={() => { setDone(b); setAmount(b.basePrice); }}>Mark Completed</button>,
    completed: <Badge value={b.paymentStatus} />,
  }[b.status] || '-');
  return (<><PageHead title="Manage Requests">
      <select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
        {['all', 'requested', 'accepted', 'in-progress', 'completed'].map((s) => <option key={s} value={s}>{s === 'all' ? 'All' : s.replace('-', ' ')}</option>)}</select></PageHead>
    <Table rows={rows} empty={<Empty title="No requests here" text="Customer requests for your services will show up in this list." />}
      cols={[{ h: 'Customer', r: (b) => <div><p className="font-medium">{b.customerName}</p><p className="text-xs text-slate-500">{b.customerPhone}</p></div> }, { h: 'Address', r: (b) => b.address },
        { h: 'Date', r: (b) => fmtDate(b.preferredDate) }, { h: 'Problem', r: (b) => <p className="max-w-xs text-xs">{b.problemDescription}</p> }, { h: 'Service', r: (b) => b.serviceTitle },
        { h: 'Status', r: (b) => <Badge value={b.status} /> }, { h: 'Action', r: actions }]} />
    <ConfirmModal open={!!reject} onClose={() => setReject(null)} title="Reject this request?" text={`${reject?.customerName}'s request will be rejected. This is final.`} label="Reject" onConfirm={() => { setStatus(reject, 'rejected'); setReject(null); }} />
    <Modal open={!!done} onClose={() => setDone(null)} title="Set the final amount">
      <label className="label">Final amount (USD)</label><input type="number" min="1" step="0.01" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className="btn-primary mt-4 w-full" onClick={() => { if (!(Number(amount) > 0)) return toast.error('Enter an amount above 0'); setStatus(done, 'completed', Number(amount)); setDone(null); }}>Complete job</button></Modal></>);
}
