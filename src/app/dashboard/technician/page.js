'use client';
import { Briefcase, BadgeCheck, Inbox } from 'lucide-react';
import { useApi } from '@/lib/useApi';
import { StatCard } from '@/components/ui';
import { StatsSkeleton } from '@/components/Skeletons';
import { StatusChart, countBy } from '@/components/Charts';
import PageHead from '@/components/PageHead';

export default function TechOverview() {
  const s = useApi('/services/mine');
  const b = useApi('/bookings/technician');
  if (s.loading || b.loading) return <StatsSkeleton count={3} />;
  const services = s.data || [], jobs = b.data || [];
  return (<><PageHead title="Overview" text="Your services and incoming jobs" />
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><StatCard label="Total Services" value={services.length} icon={Briefcase} />
      <StatCard label="Approved Services" value={services.filter((x) => x.approvalStatus === 'approved').length} icon={BadgeCheck} />
      <StatCard label="Pending Requests" value={jobs.filter((x) => x.status === 'requested').length} icon={Inbox} /></div>
    <StatusChart items={countBy(jobs)} title="Requests by status" /></>);
}
