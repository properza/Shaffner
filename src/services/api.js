// src/services/api.js

// อ่าน ENV (รองรับ Vite/CRA)
const raw =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) ??
  process.env.REACT_APP_API_BASE ??
  '';

const host =
  (typeof window !== 'undefined' && window.location && window.location.hostname) || '';

let base = String(raw).trim().replace(/\/+$/,''); // '', 'http://127.0.0.1:3000', 'https://x.ngrok.app/api'

// ถ้ารันบนโดเมนสาธารณะ (ไม่ใช่ localhost/127.0.0.1) และค่า ENV ชี้ localhost → เมินทิ้ง บังคับ same-origin
const isPublicHost = host && !/^localhost$|^127\.0\.0\.1$/.test(host);
if (isPublicHost && /^https?:\/\/localhost(?::\d+)?$/i.test(base)) {
  base = '';
}

// คำนวณ BASE สุดท้าย
export const API_BASE = base ? (base.endsWith('/api') ? base : `${base}/api`) : '/api';

// helper
export const makeUrl = (path) => `${API_BASE}${path.startsWith('/') ? path : '/'+path}`;

export function makeWsUrl(path = '/ws') {
  if (typeof window === 'undefined' || !window.location) return '';
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}${path}`;
}
// DEBUG (ถ้าต้องการดูว่าตอนนี้ใช้ค่าอะไรอยู่)
// console.log('[API_BASE]', API_BASE);
