import { API } from './constants';
let cached = null;
async function getToken() {
  if (cached && cached.exp > Date.now()) return cached.t;
  const r = await fetch('/api/token');
  if (!r.ok) throw new Error('Please sign in again');
  cached = { t: (await r.json()).token, exp: Date.now() + 50 * 60 * 1000 };
  return cached.t;
}
export const resetToken = () => { cached = null; };
export async function api(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;
  const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}
