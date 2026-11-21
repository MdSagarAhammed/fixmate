'use client';
import { useState } from 'react';
import { useApi } from '@/lib/useApi';
import { Badge, Empty, Table, fmtDate, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function AdminBookings() {
  const { data, loading } = useApi('/admin/bookings');
  const [filter, setFilter] = useState('all');
  if (loading) return <TableSkeleton rows={8} columns={7} />;
  const rows = (data || []).filter((b) => filter === 'all' || b.status === filter);
  return (<><PageHead title="All Bookings"><select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
      {['all', 'requested', 'accepted', 'in-progress', 'completed', 'rejected', 'cancelled'].map((s) => <option key={s}>{s}</option>)}</select></PageHead>
    <Table rows={rows} empty={<Empty title="No bookings" text="No bookings match this filter." />}
      cols={[{ h: 'Service', r: (b) => b.serviceTitle }, { h: 'Customer', r: (b) => b.customerName }, { h: 'Technician', r: (b) => b.technicianName }, { h: 'Date', r: (b) => fmtDate(b.preferredDate) },
        { h: 'Status', r: (b) => <Badge value={b.status} /> }, { h: 'Payment', r: (b) => <Badge value={b.paymentStatus} /> }, { h: 'Amount', r: (b) => money(b.finalAmount) }]} /></>);
}
