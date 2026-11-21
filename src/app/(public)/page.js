import Link from 'next/link';
import { Search, ClipboardList, Wrench, CreditCard, ShieldCheck, BadgeCheck, Smartphone, Laptop, Snowflake, Refrigerator, Tv, WashingMachine, Zap, Smile, Sparkles } from 'lucide-react';
import { API, CATEGORIES } from '@/lib/constants';
import ServiceCard from '@/components/ServiceCard';
import HeroShowcase from '@/components/HeroShowcase';
import { Empty } from '@/components/ui';

const ICONS = { Smartphone, 'Laptop & PC': Laptop, AC: Snowflake, Refrigerator, TV: Tv, 'Washing Machine': WashingMachine, Electrical: Zap };
const STEPS = [[Search, 'Find a Service', 'Browse approved repair services and compare prices.'], [ClipboardList, 'Send a Request', 'Describe the problem and pick a date.'],
  [Wrench, 'Technician Fixes It', 'Follow the job from accepted to completed.'], [CreditCard, 'Pay After Completion', 'Pay securely online only when the work is done.']];

async function latest() {
  try { const r = await fetch(`${API}/services?limit=6&sort=newest`, { cache: 'no-store' }); return r.ok ? await r.json() : []; } catch { return []; }
}

export default async function Home() {
  const services = await latest();
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-signal/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="container-x relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80"><Sparkles size={14} className="text-signal" /> Trusted repair marketplace</span>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Expert repairs,<br /><span className="text-signal">without the runaround.</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">Book verified technicians, follow every repair update, and pay only after the job is done right.</p>
            <form action="/services" className="mt-8 flex max-w-xl gap-2 rounded-2xl bg-white p-2 shadow-2xl">
              <input name="q" placeholder="Try: iPhone screen, AC servicing" className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none" aria-label="Search services" />
              <button className="btn-accent shrink-0 px-5">Find a repair</button>
            </form>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"><span className="flex items-center gap-2"><BadgeCheck size={18} className="text-signal" />Verified technicians</span><span className="flex items-center gap-2"><ShieldCheck size={18} className="text-signal" />Pay after service</span></div>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div><p className="font-display text-2xl font-bold text-white">12k+</p><p className="text-xs text-white/50">repairs completed</p></div>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <div><p className="font-display text-2xl font-bold text-white">4.9/5</p><p className="text-xs text-white/50">average rating</p></div>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <div><p className="font-display text-2xl font-bold text-white">24h</p><p className="text-xs text-white/50">typical response</p></div>
            </div>
          </div>
          <HeroShowcase />
        </div>
      </section>

      <section className="container-x py-16">
        <div className="mb-8 flex items-end justify-between"><h2 className="h-section">Latest repair services</h2><Link href="/services" className="btn-outline">Browse all</Link></div>
        {services.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <ServiceCard key={s._id} s={s} />)}</div>
          : <Empty title="No services yet" text="Approved services will appear here." />}
      </section>

      <section className="bg-white py-16"><div className="container-x">
        <h2 className="h-section mb-10 text-center">How FixMate works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{STEPS.map(([I, t, d], i) => (
          <div key={t} className="card p-6"><div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-ink text-signal"><I /></div><h3 className="text-lg font-bold">Step {i + 1}: {t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div>))}</div>
      </div></section>

      <section className="container-x py-16">
        <h2 className="h-section mb-8">Popular categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">{CATEGORIES.map((c) => { const I = ICONS[c]; return (
          <Link key={c} href={`/services?category=${encodeURIComponent(c)}`} className="card grid place-items-center gap-2 p-5 text-center hover:border-ink"><I className="text-ink" /><span className="text-sm font-semibold">{c}</span></Link>); })}</div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">{[[BadgeCheck, 'Verified technicians', 'Every service is reviewed by an admin before it goes live.'], [Smile, 'Jobs tracked step by step', 'Requested, accepted, in progress, completed. You always know.'], [ShieldCheck, 'Pay after service', 'Nothing is charged until the technician marks the job complete.']].map(([I, t, d]) => (
          <div key={t} className="flex gap-4"><I className="mt-1 shrink-0 text-signal-dark" /><div><h3 className="font-bold">{t}</h3><p className="text-sm text-slate-600">{d}</p></div></div>))}</div>
      </section>
    </>
  );
}
