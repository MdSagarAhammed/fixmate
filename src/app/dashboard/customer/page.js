'use client';
import { CheckCircle2, ClipboardList, Hammer } from 'lucide-react';
import { useApi } from '@/lib/useApi';
import { StatCard } from '@/components/ui';
import { StatsSkeleton } from '@/components/Skeletons';
import { StatusChart, countBy } from '@/components/Charts';
import PageHead from '@/components/PageHead';

export default function CustomerOverview() {
  const { data, loading } = useApi('/bookings/my');
  if (loading) return <StatsSkeleton count={3} />;
  const rows = data || [];
  const active = rows.filter((b) => ['requested', 'accepted', 'in-progress'].includes(b.status)).length;
  return (<><PageHead title="Overview" text="Your repair activity at a glance" />
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><StatCard label="Total Requests" value={rows.length} icon={ClipboardList} /><StatCard label="Active Jobs" value={active} icon={Hammer} />
      <StatCard label="Completed Jobs" value={rows.filter((b) => b.status === 'completed').length} icon={CheckCircle2} /></div>
    <StatusChart items={countBy(rows)} /></>);
}
