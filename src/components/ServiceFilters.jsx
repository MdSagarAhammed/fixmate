'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, MODES } from '@/lib/constants';

export default function ServiceFilters({ initial }) {
  const router = useRouter();
  const path = usePathname();
  const [q, setQ] = useState(initial.q || '');
  const push = (patch) => {
    const p = new URLSearchParams();
    Object.entries({ ...initial, q, ...patch }).forEach(([k, v]) => v && p.set(k, v));
    router.push(`${path}?${p}`);
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); push({}); }} className="card mb-8 grid gap-3 p-4 md:grid-cols-5">
      <input className="input md:col-span-2" placeholder="Search by title or category" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
      <select className="input" value={initial.category || ''} onChange={(e) => push({ category: e.target.value })} aria-label="Category"><option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      <select className="input" value={initial.mode || ''} onChange={(e) => push({ mode: e.target.value })} aria-label="Service mode"><option value="">Any mode</option>{MODES.map((m) => <option key={m}>{m}</option>)}</select>
      <select className="input" value={initial.sort || 'newest'} onChange={(e) => push({ sort: e.target.value })} aria-label="Sort">
        <option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select>
    </form>
  );
}
