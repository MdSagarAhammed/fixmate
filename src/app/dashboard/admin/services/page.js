'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useApi } from '@/lib/useApi';
import { Badge, Empty, Table, Thumb, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function AdminServices() {
  const { data, loading, reload } = useApi('/admin/services');
  const [filter, setFilter] = useState('pending');
  async function decide(s, approvalStatus) {
    try { await api(`/admin/services/${s._id}/approval`, { method: 'PATCH', body: { approvalStatus } }); toast.success(`Service ${approvalStatus}`); reload(); } catch (e) { toast.error(e.message); }
  }
  if (loading) return <TableSkeleton rows={7} columns={6} />;
  const rows = (data || []).filter((s) => filter === 'all' || s.approvalStatus === filter);
  return (<><PageHead title="Service Approval"><select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by approval">
      {['pending', 'approved', 'rejected', 'all'].map((s) => <option key={s}>{s}</option>)}</select></PageHead>
    <Table rows={rows} empty={<Empty title="Nothing to review" text="No services match this filter." />}
      cols={[{ h: 'Service', r: (s) => <Thumb src={s.image} title={s.title} /> }, { h: 'Technician', r: (s) => s.technicianName }, { h: 'Category', r: (s) => s.category }, { h: 'Price', r: (s) => money(s.basePrice) },
        { h: 'Status', r: (s) => <Badge value={s.approvalStatus} /> },
        { h: 'Action', r: (s) => <div className="flex gap-2"><button className="btn-primary" disabled={s.approvalStatus === 'approved'} onClick={() => decide(s, 'approved')}>Approve</button>
          <button className="btn-danger" disabled={s.approvalStatus === 'rejected'} onClick={() => decide(s, 'rejected')}>Reject</button></div> }]} /></>);
}
