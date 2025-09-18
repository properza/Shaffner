// src/services/deviceCommands.js
import { makeUrl } from './api';

export async function sendFfu(id, body) {
  const res = await fetch(makeUrl(`/ffu/${id}/set`), {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await res.json().catch(()=> ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.error || `FFU ${id} failed`);
  return json;
}

export async function sendAc(id, body) {
  const res = await fetch(makeUrl(`/ac/${id}/set`), {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await res.json().catch(()=> ({}));
  if (!res.ok || json?.ok === false) throw new Error(json?.error || `AC ${id} failed`);
  return json;
}
