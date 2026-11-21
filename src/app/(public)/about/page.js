import Link from 'next/link';
import { ClipboardList, CreditCard, Search, Wrench } from 'lucide-react';
export const metadata = { title: 'How It Works | FixMate' };
const STEPS = [[Search, 'Find a service', 'Search verified repair services by category, area and price.'], [ClipboardList, 'Send a request', 'Share the problem, your address and a preferred date.'],
  [Wrench, 'Track the repair', 'The technician accepts, starts work and completes the job. You see each stage.'], [CreditCard, 'Pay after completion', 'Pay with Stripe once the final amount is set. Never before.']];
export default function About() {
  return (
    <div className="container-x py-14">
      <h1 className="h-section max-w-2xl">Repairs you can see happening</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">Finding a trustworthy technician is hard, and paying before any work is done makes it worse. FixMate gives every job a clear status and moves payment to the end.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{STEPS.map(([I, t, d]) => (
        <div key={t} className="card flex gap-4 p-6"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ink text-signal"><I /></div><div><h2 className="text-xl font-bold">{t}</h2><p className="mt-1 text-slate-600">{d}</p></div></div>))}</div>
      <Link href="/services" className="btn-accent mt-10">Browse services</Link>
    </div>
  );
}
