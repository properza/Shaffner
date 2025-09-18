import axios from 'axios';

// ให้ตั้ง REACT_APP_API_BASE เป็น "origin" เท่านั้น เช่น:
// REACT_APP_API_BASE=https://ba7ec38a3cd9.ngrok-free.app
export const API_BASE = (process.env.REACT_APP_API_BASE || 'http://localhost:3000').replace(/\/+$/, '');

// สร้าง axios instance สำหรับ call ที่สะดวก (ไม่ใส่ Content-Type กับ GET)
export const axiosBase = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // ไม่มีคุกกี้
});

// ตั้ง header เฉพาะ method ที่มี body
axiosBase.defaults.headers.post['Content-Type']  = 'application/json';
axiosBase.defaults.headers.put['Content-Type']   = 'application/json';
axiosBase.defaults.headers.patch['Content-Type'] = 'application/json';

// helper fetch แบบเบา ๆ
export function apiFetch(path, init = {}) {
  // อย่าใส่ Content-Type กับ GET
  return fetch(`${API_BASE}${path}`, {
    credentials: 'omit',
    ...init,
  });
}

// helper แปลง object -> array
export function toArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return Object.entries(data).map(([k, v]) => ({ id: k, ...v }));
  return [];
}
