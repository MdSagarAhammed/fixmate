'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { CATEGORIES, MODES } from '@/lib/constants';
import { uploadImage } from '@/lib/imgbb';

export default function ServiceForm({ initial = {}, user, onSubmit, label }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState({});
  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const file = e.target.image.files[0];
    const errors = {};
    ['title', 'description', 'estimatedDuration', 'serviceArea'].forEach((k) => { if (!f[k]?.trim()) errors[k] = 'Required'; });
    if (!(Number(f.basePrice) > 0)) errors.basePrice = 'Enter a positive number';
    if (!file && !initial.image) errors.image = 'Choose an image';
    setErr(errors);
    if (Object.keys(errors).length) return;
    setBusy(true);
    try {
      const image = file ? await uploadImage(file) : initial.image;
      await onSubmit({ ...f, basePrice: Number(f.basePrice), image });
      if (!initial._id) e.target.reset();
    } catch (e2) { toast.error(e2.message); } finally { setBusy(false); }
  }
  const E = ({ k }) => (err[k] ? <p className="mt-1 text-xs text-red-600">{err[k]}</p> : null);
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className="label">Title</label><input name="title" defaultValue={initial.title} className="input" /><E k="title" /></div>
      <div><label className="label">Category</label><select name="category" defaultValue={initial.category || CATEGORIES[0]} className="input">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label className="label">Base price (USD)</label><input name="basePrice" type="number" min="1" step="0.01" defaultValue={initial.basePrice} className="input" /><E k="basePrice" /></div>
      <div><label className="label">Estimated duration</label><input name="estimatedDuration" defaultValue={initial.estimatedDuration} placeholder="2-3 hours" className="input" /><E k="estimatedDuration" /></div>
      <div><label className="label">Service mode</label><select name="serviceMode" defaultValue={initial.serviceMode || MODES[0]} className="input">{MODES.map((m) => <option key={m}>{m}</option>)}</select></div>
      <div className="sm:col-span-2"><label className="label">Service area</label><input name="serviceArea" defaultValue={initial.serviceArea} placeholder="Dhanmondi, Dhaka" className="input" /><E k="serviceArea" /></div>
      {user && <><div><label className="label">Technician name</label><input className="input bg-slate-100" value={user.name} readOnly /></div><div><label className="label">Technician email</label><input className="input bg-slate-100" value={user.email} readOnly /></div></>}
      <div className="sm:col-span-2"><label className="label">Description</label><textarea name="description" rows={4} defaultValue={initial.description} className="input" /><E k="description" /></div>
      <div className="sm:col-span-2"><label className="label">Service image {initial.image && '(leave empty to keep current)'}</label><input name="image" type="file" accept="image/*" className="input" /><E k="image" /></div>
      <button className="btn-primary sm:col-span-2" disabled={busy}>{busy ? 'Saving...' : label}</button>
    </form>
  );
}
