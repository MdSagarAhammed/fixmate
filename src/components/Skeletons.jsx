const range = (n) => Array.from({ length: n }, (_, i) => i);

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/90 ${className}`} />
);

export function PageSkeleton({ cards = 3, rows = 4 }) {
  return (
    <div className="container-x py-12" role="status" aria-label="Loading page">
      <Skeleton className="h-9 w-64 max-w-full" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {range(cards).map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="mt-8 space-y-3">
        {range(rows).map((i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function StatsSkeleton({ count = 3, chart = true }) {
  return (
    <div role="status" aria-label="Loading overview">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><Skeleton className="h-8 w-40" /><Skeleton className="mt-2 h-4 w-56 max-w-full" /></div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {range(count).map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
      {chart && <Skeleton className="mt-6 h-80 rounded-xl" />}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function TableSkeleton({ rows = 7, columns = 6 }) {
  return (
    <div role="status" aria-label="Loading table">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><Skeleton className="h-8 w-44" /><Skeleton className="mt-2 h-4 w-64 max-w-full" /></div>
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="card overflow-hidden">
        <div className="flex gap-6 bg-ink px-4 py-4">
          {range(columns).map((i) => <Skeleton key={i} className="h-4 flex-1 bg-white/20" />)}
        </div>
        <div className="divide-y divide-slate-100">
          {range(rows).map((r) => (
            <div key={r} className="flex items-center gap-6 px-4 py-4">
              {range(columns).map((c) => <Skeleton key={c} className={`h-4 flex-1 ${c === 0 ? 'max-w-[12rem]' : ''}`} />)}
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="container-x py-10" role="status" aria-label="Loading services">
      <Skeleton className="h-10 w-80 max-w-full" />
      <Skeleton className="mt-3 h-5 w-44" />
      <Skeleton className="mt-8 h-20 rounded-xl" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {range(8).map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
      </div>
      <span className="sr-only">Loading services...</span>
    </div>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="container-x grid gap-8 py-10 lg:grid-cols-3" role="status" aria-label="Loading service details">
      <div className="lg:col-span-2">
        <Skeleton className="aspect-[16/9] w-full rounded-xl" />
        <Skeleton className="mt-6 h-6 w-24 rounded-full" />
        <Skeleton className="mt-4 h-10 w-4/5" />
        <Skeleton className="mt-5 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
      </div>
      <span className="sr-only">Loading service details...</span>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div role="status" aria-label="Loading profile">
      <Skeleton className="h-8 w-48" />
      <div className="card mt-6 grid max-w-3xl gap-4 p-6 sm:grid-cols-2">
        <div className="flex items-center gap-4 sm:col-span-2"><Skeleton className="h-16 w-16 rounded-full" /><Skeleton className="h-10 flex-1" /></div>
        {range(4).map((i) => <Skeleton key={i} className="h-12" />)}
        <Skeleton className="h-24 sm:col-span-2" />
        <Skeleton className="h-11 sm:col-span-2" />
      </div>
      <span className="sr-only">Loading profile...</span>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div role="status" aria-label="Loading form">
      <Skeleton className="h-8 w-52" />
      <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      <div className="card mt-6 grid gap-4 p-6 sm:grid-cols-2">
        {range(6).map((i) => <Skeleton key={i} className={`h-12 ${i < 2 ? 'sm:col-span-2' : ''}`} />)}
        <Skeleton className="h-24 sm:col-span-2" />
        <Skeleton className="h-11 sm:col-span-2" />
      </div>
      <span className="sr-only">Loading form...</span>
    </div>
  );
}

export function PaymentSkeleton() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4" role="status" aria-label="Checking payment">
      <div className="card w-full max-w-md p-8 text-center">
        <Skeleton className="mx-auto h-14 w-14 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-7 w-56" />
        <Skeleton className="mx-auto mt-3 h-4 w-64 max-w-full" />
        <Skeleton className="mx-auto mt-2 h-4 w-40" />
        <Skeleton className="mx-auto mt-6 h-11 w-44" />
      </div>
      <span className="sr-only">Checking payment...</span>
    </div>
  );
}

export function DashboardShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-bench" role="status" aria-label="Loading dashboard">
      <aside className="hidden w-64 shrink-0 bg-ink-800 p-4 lg:block">
        <Skeleton className="h-10 w-32 bg-white/20" />
        <div className="mt-8 space-y-3">{range(6).map((i) => <Skeleton key={i} className="h-10 bg-white/10" />)}</div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-10 w-44 rounded-full" />
        </header>
        <main className="flex-1 p-4 sm:p-6"><StatsSkeleton count={4} /></main>
      </div>
      <span className="sr-only">Loading dashboard...</span>
    </div>
  );
}

export function AuthSkeleton() {
  return (
    <div className="container-x grid place-items-center py-14" role="status" aria-label="Loading sign in">
      <div className="card w-full max-w-md space-y-4 p-8">
        <Skeleton className="h-9 w-56" />
        {range(3).map((i) => <Skeleton key={i} className="h-12" />)}
        <Skeleton className="h-11 w-full" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
