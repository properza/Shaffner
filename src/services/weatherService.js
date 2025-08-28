// src/services/weatherService.js
const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:3000';

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
