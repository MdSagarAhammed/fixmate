'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useApi } from '@/lib/useApi';
import { Badge, ConfirmModal, Empty, Modal, Table, Thumb, money } from '@/components/ui';
import { TableSkeleton } from '@/components/Skeletons';
import ServiceForm from '@/components/ServiceForm';
import PageHead from '@/components/PageHead';

export default function MyServices() {
  const { data, loading, reload } = useApi('/services/mine');
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const run = async (fn, ok) => { try { await fn(); toast.success(ok); reload(); } catch (e) { toast.error(e.message); } };
  if (loading) return <TableSkeleton rows={7} columns={6} />;
  return (<><PageHead title="My Services" />
    <Table rows={data} empty={<Empty title="No services yet" text="Add your first repair service." action={<Link href="/dashboard/technician/add-service" className="btn-primary mt-2">Add a service</Link>} />}
      cols={[{ h: 'Service', r: (s) => <Thumb src={s.image} title={s.title} /> }, { h: 'Category', r: (s) => s.category }, { h: 'Price', r: (s) => money(s.basePrice) },
        { h: 'Approval', r: (s) => <Badge value={s.approvalStatus} /> },
        { h: 'Available', r: (s) => <button role="switch" aria-checked={s.isAvailable} aria-label="Toggle availability" onClick={() => run(() => api(`/services/${s._id}/availability`, { method: 'PATCH', body: { isAvailable: !s.isAvailable } }), s.isAvailable ? 'Service hidden' : 'Service visible')}
          className={`h-6 w-11 rounded-full p-0.5 transition ${s.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}><span className={`block h-5 w-5 rounded-full bg-white transition ${s.isAvailable ? 'translate-x-5' : ''}`} /></button> },
        { h: 'Actions', r: (s) => <div className="flex gap-2"><button className="btn-outline" onClick={() => setEdit(s)}>Edit</button><button className="btn-danger" onClick={() => setDel(s)}>Delete</button></div> }]} />
    <Modal open={!!edit} onClose={() => setEdit(null)} title="Edit service">
      {edit && <ServiceForm initial={edit} label="Save changes" onSubmit={async (b) => { await api(`/services/${edit._id}`, { method: 'PATCH', body: b }); toast.success('Updated. Sent back for admin approval.'); setEdit(null); reload(); }} />}</Modal>
    <ConfirmModal open={!!del} onClose={() => setDel(null)} title="Delete this service?" text={`"${del?.title}" will be removed permanently.`} label="Delete"
      onConfirm={() => { run(() => api(`/services/${del._id}`, { method: 'DELETE' }), 'Service deleted'); setDel(null); }} /></>);
}
