'use client';
import { useEffect, useState } from 'react';
import { AirVent, BadgeCheck, Check, ChevronLeft, ChevronRight, Laptop, Smartphone, Star } from 'lucide-react';

const SLIDES = [
  {
    Icon: Smartphone,
    kicker: 'Phone repair',
    title: 'Cracked screen rescue',
    metric: '2,400+',
    metricLabel: 'screens fixed',
    badge: 'Same day',
    tags: ['90-day warranty', 'Genuine parts'],
    glow: 'bg-signal/30',
  },
  {
    Icon: AirVent,
    kicker: 'Home visit',
    title: 'Cool air, back on',
    metric: '4.9/5',
    metricLabel: 'average rating',
    badge: 'Verified',
    tags: ['Background checked', 'On-time arrival'],
    glow: 'bg-cyan-300/20',
  },
  {
    Icon: Laptop,
    kicker: 'Pay after repair',
    title: 'Work-ready again',
    metric: '100%',
    metricLabel: 'job tracking',
    badge: 'Protected',
    tags: ['Live status updates', 'Secure checkout'],
    glow: 'bg-indigo-300/20',
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 4800);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (dir) => setActive((i) => (i + dir + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[active];

  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="FixMate repair highlights"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-signal/10 blur-3xl" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] shadow-glow backdrop-blur">
        <div className={`absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700 ${slide.glow}`} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent_45%)]" />

        {SLIDES.map(({ Icon, kicker, title, metric, metricLabel, badge, tags }, i) => (
          <div
            key={title}
            className={`absolute inset-0 transition-all duration-700 ease-out ${i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
            aria-hidden={i !== active}
          >
            <div className="absolute inset-x-0 top-0 grid h-[72%] place-items-center">
              <div className="relative grid h-48 w-48 place-items-center rounded-[2.5rem] border border-white/15 bg-white/10 shadow-2xl sm:h-56 sm:w-56">
                <div className="absolute -inset-7 rounded-full border border-white/10" />
                <div className="absolute -inset-14 rounded-full border border-white/5" />
                <Icon size={88} strokeWidth={1.35} className="text-white drop-shadow-[0_22px_35px_rgba(255,122,69,.32)]" />
                <span className="absolute -right-5 top-3 flex items-center gap-1 rounded-full bg-signal px-3 py-1.5 text-xs font-bold text-ink shadow-lg">
                  <Check size={13} strokeWidth={3} /> {badge}
                </span>
                <span className="absolute -bottom-4 -left-7 flex items-center gap-2 rounded-2xl border border-white/15 bg-ink-800/90 px-3 py-2 text-left shadow-xl">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-signal/15 text-signal"><BadgeCheck size={17} /></span>
                  <span><span className="block text-[10px] uppercase tracking-wider text-white/50">{kicker}</span><span className="block text-xs font-semibold text-white">{title}</span></span>
                </span>
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-ink-800/85 p-4 backdrop-blur-md">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal">{kicker}</p>
                  <p className="mt-1 font-display text-lg font-bold text-white">{title}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-signal">{metric}</p>
                  <p className="text-[11px] text-white/55">{metricLabel}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/75">{tag}</span>)}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute right-4 top-4 flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous highlight" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-800/60 text-white backdrop-blur transition hover:bg-white/15"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next highlight" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-800/60 text-white backdrop-blur transition hover:bg-white/15"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose highlight">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.title}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-signal' : 'w-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-white/60"><Star size={13} className="fill-signal text-signal" /> Trusted by 12,000+ customers</span>
      </div>
    </div>
  );
}
