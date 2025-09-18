// src/services/authService.js
import { makeUrl } from './api';

export async function login({ email, password }) {
  const payload = {
    email,                 // เพิ่ม
    username: email,       // เผื่อฝั่งเซิร์ฟเวอร์ใช้ชื่อนี้
    password,
  };

  const res = await fetch(makeUrl('/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',      // ให้รับ cookie/set-cookie ได้
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = data?.message || data?.error || `Login failed (${res.status})`;
    throw new Error(msg);
  }
  return { ok: true, message: data?.message || 'Login successful', token: data?.token || null };
}
