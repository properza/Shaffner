// src/services/weatherService.js
import { makeUrl } from './api';

export async function getLocalWeather() {
  const res = await fetch(makeUrl('/weather'), { method: 'GET', credentials: 'include' });
  if (!res.ok) throw new Error(`Local weather failed (${res.status})`);
  return await res.json();
}
