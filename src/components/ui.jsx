'use client';
import Link from 'next/link';
import { ChevronDown, Loader2, Wrench, X } from 'lucide-react';
import { STATUS_STYLE } from '@/lib/constants';

export const Logo = ({ light }) => (
  <Link href="/" className={`flex items-center gap-2 font-display text-xl font-bold ${light ? 'text-white' : 'text-ink'}`}>
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal text-ink"><Wrench size={20} /></span>FixMate
  </Link>
);
export const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X"><path d="M18.9 2H22l-7.4 8.4L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9L1.3 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.7L6.7 3.9H4.9L17.7 20Z" /></svg>
);
export const Badge = ({ value }) => (
  <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[value] || 'bg-slate-100 text-slate-600'}`}>{String(value).replace('-', ' ')}</span>
);
export const Spinner = () => <div className="grid place-items-center py-20 text-ink"><Loader2 className="animate-spin" size={32} /></div>;
export const Empty = ({ title, text, action }) => (
  <div className="card grid place-items-center gap-2 px-6 py-14 text-center">
    <div className="grid h-14 w-14 place-items-center rounded-full bg-ink-50 text-ink"><Wrench /></div>
    <h3 className="text-lg font-semibold">{title}</h3>
    {text && <p className="max-w-sm text-sm text-slate-500">{text}</p>}
    {action}
  </div>
);
export const StatCard = ({ label, value, icon: Icon, hint }) => (
  <div className="card flex items-center gap-4 p-5">
    <div className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-signal">{Icon && <Icon />}</div>
    <div><p className="text-sm text-slate-500">{label}</p><p className="font-display text-2xl font-bold text-ink">{value}</p>{hint}</div>
  </div>
);
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-4" onClick={onClose}>
      <div className="card w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-slate-100"><X size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}
export const ConfirmModal = ({ open, onClose, onConfirm, title, text, label = 'Confirm' }) => (
  <Modal open={open} onClose={onClose} title={title}>
    <p className="mb-6 text-sm text-slate-600">{text}</p>
    <div className="flex justify-end gap-2"><button className="btn-outline" onClick={onClose}>Keep it</button><button className="btn-danger" onClick={onConfirm}>{label}</button></div>
  </Modal>
);
export const Avatar = ({ user, size = 36 }) => user?.image
  ? <img src={user.image} alt={user.name} style={{ width: size, height: size }} className="rounded-full object-cover ring-1 ring-slate-200" />
  : <span style={{ width: size, height: size }} className="grid place-items-center rounded-full bg-slate-200 text-sm font-bold text-slate-700 ring-1 ring-white">{(user?.name || '?')[0].toUpperCase()}</span>;
export const UserPill = ({ user, onClick, expanded = false }) => (
  <button
    type="button"
    onClick={onClick}
    aria-haspopup="menu"
    aria-expanded={expanded}
    className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
  >
    <Avatar user={user} size={34} />
    <span className="max-w-[8.5rem] truncate text-sm font-semibold text-ink">{user?.name || 'Account'}</span>
    <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
  </button>
);
export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-');
export const money = (n) => `$${Number(n || 0).toFixed(2)}`;


export function Table({ cols, rows, empty }) {
  if (!rows?.length) return empty;
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-ink text-white"><tr>{cols.map((c) => <th key={c.h} className="px-4 py-3 font-semibold">{c.h}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => <tr key={row._id} className="align-middle hover:bg-slate-50">{cols.map((c) => <td key={c.h} className="px-4 py-3">{c.r(row)}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
export const Thumb = ({ src, title }) => (
  <div className="flex items-center gap-3"><img src={src} alt="" className="h-10 w-14 rounded object-cover" /><span className="font-medium">{title}</span></div>
);
