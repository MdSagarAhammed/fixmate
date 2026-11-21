import Link from 'next/link';
import { API } from '@/lib/constants';
import ServiceCard from '@/components/ServiceCard';
import ServiceFilters from '@/components/ServiceFilters';
import { Empty } from '@/components/ui';

export const metadata = { title: 'Browse Services | FixMate' };

export default async function ServicesPage({ searchParams }) {
  const sp = await searchParams;
  const initial = { q: sp.q || '', category: sp.category || '', mode: sp.mode || '', sort: sp.sort || '' };
  const qs = new URLSearchParams(Object.entries(initial).filter(([, v]) => v));
  let services = [];
  try { const r = await fetch(`${API}/services?${qs}`, { cache: 'no-store' }); if (r.ok) services = await r.json(); } catch {}
  return (
    <div className="container-x py-10">
      <h1 className="h-section mb-2">Browse repair services</h1>
      <p className="mb-8 text-slate-600">{services.length} service{services.length === 1 ? '' : 's'} available</p>
      <ServiceFilters initial={initial} />
      {services.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{services.map((s) => <ServiceCard key={s._id} s={s} />)}</div>
        : <Empty title="No services match" text="Try a different keyword or clear a filter." action={<Link href="/services" className="btn-primary mt-2">Clear filters</Link>} />}
    </div>
  );
}
