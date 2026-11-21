'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function AuthForm({ mode }) {
  const signUp = mode === 'sign-up';
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState('customer');

  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const errors = {};
    if (signUp && !f.name?.trim()) errors.name = 'Full name is required';
    if (!EMAIL.test(f.email || '')) errors.email = 'Enter a valid email';
    if (!f.password) errors.password = 'Password is required';
    else if (signUp) {
      if (f.password.length < 6) errors.password = 'Use at least 6 characters';
      else if (!/[A-Z]/.test(f.password)) errors.password = 'Add at least one uppercase letter';
      else if (!/[a-z]/.test(f.password)) errors.password = 'Add at least one lowercase letter';
    }
    setErr(errors);
    if (Object.keys(errors).length) return;
    setBusy(true);
    const { error } = signUp
      ? await authClient.signUp.email({ name: f.name.trim(), email: f.email, password: f.password, role })
      : await authClient.signIn.email({ email: f.email, password: f.password });
    setBusy(false);
    if (error) return toast.error(error.message || (signUp ? 'Could not create account' : 'Wrong email or password'));
    toast.success(signUp ? 'Account created. Welcome to FixMate!' : 'Signed in');
    const back = new URLSearchParams(window.location.search).get('redirect');
    window.location.assign(back && back.startsWith('/') ? back : '/dashboard');
  }
  const E = ({ k }) => (err[k] ? <p className="mt-1 text-xs text-red-600">{err[k]}</p> : null);
  return (
    <div className="container-x grid place-items-center py-14">
      <form onSubmit={submit} noValidate className="card w-full max-w-md space-y-4 p-8">
        <h1 className="text-3xl font-bold">{signUp ? 'Create your account' : 'Welcome back'}</h1>
        {signUp && <div><label className="label">Full name</label><input name="name" className="input" /><E k="name" /></div>}
        <div><label className="label">Email</label><input name="email" type="email" className="input" /><E k="email" /></div>
        <div><label className="label">Password</label><input name="password" type="password" className="input" /><E k="password" /></div>
        {signUp && (<fieldset><legend className="label">I am a</legend><div className="grid grid-cols-2 gap-3">
          {[['customer', 'Customer', 'I need a repair'], ['technician', 'Technician', 'I offer repairs']].map(([v, t, d]) => (
            <label key={v} className={`cursor-pointer rounded-lg border p-3 ${role === v ? 'border-ink bg-ink-50' : 'border-slate-300'}`}>
              <input type="radio" name="role" className="sr-only" checked={role === v} onChange={() => setRole(v)} /><p className="font-semibold">{t}</p><p className="text-xs text-slate-500">{d}</p></label>))}</div></fieldset>)}
        <button className={`${signUp ? 'btn-accent' : 'btn-primary'} w-full`} disabled={busy}>{busy ? 'Please wait...' : signUp ? 'Get Started' : 'Sign in'}</button>
        <p className="text-center text-sm text-slate-600">{signUp ? 'Already have an account? ' : 'New to FixMate? '}
          <Link className="font-semibold text-ink underline" href={signUp ? '/sign-in' : '/sign-up'}>{signUp ? 'Sign in' : 'Get started'}</Link></p>
      </form>
    </div>
  );
}
