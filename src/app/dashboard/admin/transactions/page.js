'use client';
import { DollarSign } from 'lucide-react';
import { useApi } from '@/lib/useApi';
import { Empty, StatCard, Table, fmtDate, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function Transactions() {
  const { data, loading } = useApi('/admin/payments');
  if (loading) return <TableSkeleton rows={6} columns={6} />;
  const total = (data || []).reduce((s, p) => s + p.amount, 0);
  return (<><PageHead title="Transactions" /><div className="mb-6 max-w-xs"><StatCard label="Total revenue" value={money(total)} icon={DollarSign} /></div>
    <Table rows={data} empty={<Empty title="No transactions yet" text="Paid jobs will appear here." />}
      cols={[{ h: 'Customer', r: (p) => p.customerName }, { h: 'Technician', r: (p) => p.technicianName }, { h: 'Service', r: (p) => p.serviceTitle }, { h: 'Amount', r: (p) => money(p.amount) },
        { h: 'Transaction ID', r: (p) => <span className="break-all text-xs">{p.transactionId}</span> }, { h: 'Paid on', r: (p) => fmtDate(p.paidAt) }]} /></>);
}
