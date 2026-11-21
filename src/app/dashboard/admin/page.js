'use client';
import { DollarSign, Hourglass, UserCog, Users } from 'lucide-react';
import { useApi } from '@/lib/useApi';
import { StatCard, money } from '@/components/ui';
import { StatsSkeleton } from '@/components/Skeletons';
import { StatusChart } from '@/components/Charts';
import PageHead from '@/components/PageHead';

export default function AdminOverview() {
  const { data: s, loading } = useApi('/admin/stats');
  if (loading || !s) return <StatsSkeleton count={4} />;
  return (<><PageHead title="Overview" text="Platform health" />
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total Users" value={s.users} icon={Users} /><StatCard label="Total Technicians" value={s.technicians} icon={UserCog} />
      <StatCard label="Pending Services" value={s.pendingServices} icon={Hourglass} /><StatCard label="Revenue" value={money(s.revenue)} icon={DollarSign} /></div>
    <StatusChart items={s.bookingsByStatus.map((x) => ({ name: x._id, value: x.count }))} title="All jobs by status" /></>);
}
