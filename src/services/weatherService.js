// src/services/weatherService.js
const API_BASE = import.meta?.env?.VITE_API_BASE || 'https://164478cbc2ce.ngrok-free.app';

export async function getLocalWeather() {
  const res = await fetch(`${API_BASE}/api/weather`, {
    method: 'GET',
    credentials: 'include', 
  });
  if (!res.ok) {
    throw new Error(`Local weather failed (${res.status})`);
  }
  return await res.json(); 
}
