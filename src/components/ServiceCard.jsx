import Link from 'next/link';
import { MapPin, User } from 'lucide-react';

export default function ServiceCard({ s }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden transition hover:shadow-md">
      <img src={s.image} alt={s.title} className="h-44 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs font-semibold"><span className="rounded-full bg-ink-50 px-2 py-1 text-ink">{s.category}</span><span className="text-slate-500">{s.serviceMode}</span></div>
        <h3 className="line-clamp-2 text-lg font-bold leading-snug">{s.title}</h3>
        <p className="flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} /> {s.serviceArea}</p>
        <p className="flex items-center gap-1 text-sm text-slate-500"><User size={14} /> {s.technicianName}</p>
        <div className="mt-auto flex items-center justify-between pt-3"><p className="text-sm text-slate-500">From <span className="font-display text-xl font-bold text-ink">${s.basePrice}</span></p>
          <Link href={`/services/${s._id}`} className="btn-primary">View Details</Link></div>
      </div>
    </article>
  );
}
