const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:3000';

export async function login({ email, password }) {
  const payload = { username: email, password };

  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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
