'use client';
import { useApi } from '@/lib/useApi';
import { Empty, Table, fmtDate, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function Payments() {
  const { data, loading } = useApi('/payments/my');
  if (loading) return <TableSkeleton rows={6} columns={5} />;
  return (<><PageHead title="Payment History" />
    <Table rows={data} empty={<Empty title="No payments yet" text="Completed jobs you pay for will be listed here." />}
      cols={[{ h: 'Service', r: (p) => p.serviceTitle }, { h: 'Technician', r: (p) => p.technicianName }, { h: 'Amount', r: (p) => money(p.amount) },
        { h: 'Transaction ID', r: (p) => <span className="break-all text-xs">{p.transactionId}</span> }, { h: 'Paid on', r: (p) => fmtDate(p.paidAt) }]} /></>);
}
