// app/profile/page.tsx
import { serverFetch } from '@/lib/server-fetch';
import Image from 'next/image';

type User = {
  id: number;
  name: string;
  email?: string;
};

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const users = await serverFetch<User[]>('/api/users');

  // เลือก 2 คนแรก และเพิ่มข้อมูลเสริม
  const two = users.slice(0, 2).map((u, idx) => ({
    ...u,
    role: idx === 0 ? 'Frontend Developer' : 'Backend Developer',
    bio:
      idx === 0
        ? 'ชอบงาน UI/UX, React, และการทำ SSR บน Vercel'
        : 'ถนัด Node.js/SQL ออกแบบ API-first และปรับจูน Query',
    avatar: `https://i.pravatar.cc/160?img=${idx === 0 ? 12 : 32}`,
  }));

  return (
    <section>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Profile</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        ตัวอย่างหน้าโปรไฟล์ (SSR) ที่ดึงข้อมูลจาก <code>/api/users</code>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {two.map((u) => (
          <article
            key={u.id}
            style={{
              border: '1px solid #eee',
              borderRadius: 8,
              background: '#fff',
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Image
                src={u.avatar}
                alt={u.name}
                width={64}
                height={64}
                style={{ borderRadius: '50%', border: '1px solid #ddd' }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{u.role}</div>
                {u.email && (
                  <div style={{ fontSize: 12, color: '#666' }}>{u.email}</div>
                )}
              </div>
            </div>
            <p style={{ marginTop: 12, lineHeight: 1.6 }}>{u.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
