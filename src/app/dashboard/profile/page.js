'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/lib/imgbb';
import { Avatar } from '@/components/ui';
import { ProfileSkeleton } from '@/components/Skeletons';
import PageHead from '@/components/PageHead';

export default function Profile() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const [busy, setBusy] = useState(false);
  if (isPending || !user) return <ProfileSkeleton />;
  async function save(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (!f.name.trim()) return toast.error('Name is required');
    setBusy(true);
    try {
      const file = e.target.photo.files[0];
      const image = file ? await uploadImage(file) : user.image;
      const body = { name: f.name.trim(), phone: f.phone, area: f.area, bio: f.bio, image };
      await api('/users/profile', { method: 'PATCH', body });
      await authClient.updateUser(body); // refreshes the session so navbar and top bar update instantly
      toast.success('Profile updated');
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  }
  return (<><PageHead title="Update Profile" />
    <form onSubmit={save} className="card grid max-w-3xl gap-4 p-6 sm:grid-cols-2">
      <div className="flex items-center gap-4 sm:col-span-2"><Avatar user={user} size={64} /><div className="flex-1"><label className="label">Profile photo</label><input name="photo" type="file" accept="image/*" className="input" /></div></div>
      <div><label className="label">Name</label><input name="name" defaultValue={user.name} className="input" /></div>
      <div><label className="label">Phone</label><input name="phone" defaultValue={user.phone || ''} className="input" /></div>
      <div><label className="label">Email (read-only)</label><input value={user.email} readOnly className="input bg-slate-100" /></div>
      <div><label className="label">Role (read-only)</label><input value={user.role} readOnly className="input bg-slate-100 capitalize" /></div>
      <div className="sm:col-span-2"><label className="label">Area</label><input name="area" defaultValue={user.area || ''} placeholder="Mirpur, Dhaka" className="input" /></div>
      <div className="sm:col-span-2"><label className="label">Bio</label><textarea name="bio" rows={4} defaultValue={user.bio || ''} className="input" /></div>
      <button className="btn-primary sm:col-span-2" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</button></form></>);
}
