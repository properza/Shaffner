import { API_BASE, apiFetch } from './apiClient';

export async function login({ email, password }) {
  const payload = { username: email, password };

  const res = await apiFetch(`/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // POST เท่านั้น
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch (_) {}

  if (!res.ok) {
    const msg = data?.message || data?.error || `Login failed (${res.status})`;
    throw new Error(msg);
  }

  return {
    ok: true,
    message: data?.message || 'Login successful',
    token: data?.token || null,
  };
}
