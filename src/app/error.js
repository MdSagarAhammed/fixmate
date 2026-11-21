'use client';
export default function Error({ error, reset }) {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div><h1 className="text-3xl font-bold">Something broke on our side</h1>
        <p className="mt-2 text-slate-600">{error?.message || 'Please try again in a moment.'}</p>
        <button onClick={reset} className="btn-primary mt-5">Try again</button></div>
    </div>
  );
}
