'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { dashboardFor } from '@/lib/constants';
import { StatsSkeleton } from '@/components/Skeletons';

export default function DashboardIndex() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  useEffect(() => { if (!isPending && data) router.replace(dashboardFor(data.user.role)); }, [isPending, data, router]);
  return <StatsSkeleton count={4} />;
}
