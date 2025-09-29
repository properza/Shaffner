import { apiFetch } from './apiClient';

export async function sendFfu(id, body) {
  const res = await apiFetch(`/api/ffu/${id}/set`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.error || `FFU ${id} failed`);
  return json;
}

export async function sendAc(id, body) {
  const res = await apiFetch(`/api/ac/${id}/set`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.error || `AC ${id} failed`);
  return json;
}
