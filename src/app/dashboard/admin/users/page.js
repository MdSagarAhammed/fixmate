'use client';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import { useApi } from '@/lib/useApi';
import { Avatar, Table, fmtDate } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function Users() {
  const { data, loading, reload } = useApi('/admin/users');
  const me = authClient.useSession().data?.user;
  async function change(u, role) {
    try { await api(`/admin/users/${u._id}/role`, { method: 'PATCH', body: { role } }); toast.success(`${u.name} is now ${role}`); } catch (e) { toast.error(e.message); }
    reload();
  }
  if (loading) return <TableSkeleton rows={8} columns={4} />;
  return (<><PageHead title="Manage Users" />
    <Table rows={data} cols={[{ h: 'User', r: (u) => <div className="flex items-center gap-3"><Avatar user={u} /><span className="font-medium">{u.name}</span></div> }, { h: 'Email', r: (u) => u.email },
      { h: 'Role', r: (u) => <select className="input w-auto" value={u.role || 'customer'} disabled={u.email === me?.email} onChange={(e) => change(u, e.target.value)} aria-label={`Role for ${u.name}`}>
        {['customer', 'technician', 'admin'].map((r) => <option key={r}>{r}</option>)}</select> }, { h: 'Joined', r: (u) => fmtDate(u.createdAt) }]} /></>);
}
