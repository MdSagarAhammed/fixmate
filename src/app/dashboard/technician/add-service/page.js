'use client';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import ServiceForm from '@/components/ServiceForm';
import { FormSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function AddService() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <FormSkeleton />;
  async function create(body) {
    await api('/services', { method: 'POST', body });
    toast.success('Service saved. It is waiting for admin approval.');
  }
  return (<><PageHead title="Add a Service" text="New services stay pending until an admin approves them." />
    <div className="card p-6"><ServiceForm user={data?.user} onSubmit={create} label="Add service" /></div></>);
}
