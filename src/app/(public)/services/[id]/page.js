import { notFound } from 'next/navigation';
import { Clock, MapPin, Wrench } from 'lucide-react';
import { API } from '@/lib/constants';
import RequestForm from '@/components/RequestForm';
import { Avatar } from '@/components/ui';

async function get(url) { try { const r = await fetch(url, { cache: 'no-store' }); return r.ok ? r.json() : null; } catch { return null; } }

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  const s = await get(`${API}/services/${id}`);
  if (!s) notFound();
  const tech = await get(`${API}/users/technician/${encodeURIComponent(s.technicianEmail)}`);
  const facts = [[Clock, 'Estimated time', s.estimatedDuration], [Wrench, 'Service mode', s.serviceMode], [MapPin, 'Service area', s.serviceArea]];
  return (
    <div className="container-x grid gap-8 py-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <img src={s.image} alt={s.title} className="aspect-[16/9] w-full rounded-xl object-cover" />
        <span className="mt-6 inline-block rounded-full bg-ink-50 px-3 py-1 text-sm font-semibold text-ink">{s.category}</span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{s.title}</h1>
        <p className="mt-4 max-w-prose leading-relaxed text-slate-700">{s.description}</p>
      </div>
      <aside className="space-y-6">
        <div className="card p-6">
          <p className="text-sm text-slate-500">Starting price</p><p className="font-display text-4xl font-bold text-ink">${s.basePrice}</p>
          <ul className="my-5 space-y-3 text-sm">{facts.map(([I, l, v]) => <li key={l} className="flex items-center gap-3"><I size={18} className="text-ink" /><span className="text-slate-500">{l}:</span><span className="font-medium">{v}</span></li>)}</ul>
          <RequestForm service={{ _id: s._id }} />
        </div>
        <div className="card p-6"><h2 className="mb-3 text-lg font-bold">Your technician</h2>
          <div className="flex items-center gap-3"><Avatar user={{ name: s.technicianName, image: tech?.image }} size={48} />
            <div><p className="font-semibold">{s.technicianName}</p><p className="text-sm text-slate-500">{tech?.area || s.serviceArea}</p></div></div>
          {tech?.bio && <p className="mt-3 text-sm text-slate-600">{tech.bio}</p>}</div>
      </aside>
    </div>
  );
}
