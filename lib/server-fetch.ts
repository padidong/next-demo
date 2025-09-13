// lib/server-fetch.ts
import { headers } from 'next/headers';
import { getBaseUrl } from './base-url';

/**
 * Server-side fetch ที่ forward headers/cookies
 * รองรับ Vercel Password Protection หรือ custom auth.
 * คืนค่า JSON อัตโนมัติ (ใช้ generic T)
 */
export async function serverFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const h = headers();
  const cookie = h.get('cookie') ?? '';
  const bypass = h.get('x-vercel-protection-bypass');
  const auth = h.get('authorization');

  const hdrs: Record<string, string> = {
    ...(init?.headers as any || {}),
  };
  if (cookie) hdrs['cookie'] = cookie;
  if (bypass) hdrs['x-vercel-protection-bypass'] = bypass as string;
  if (auth) hdrs['authorization'] = auth as string;

  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: hdrs,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
