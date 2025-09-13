// app/profile/page.tsx
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const people = [
    {
      id: 1,
      name: 'Mr. Patiphat Jeenchum',
      email: 'patiphat.je@mail.wu.ac.th',
      role: 'Frontend Developer',
      bio: 'เชี่ยวชาญ React, Next.js และการทำ SSR บน Vercel',
      avatar: 'https://i.pravatar.cc/160?img=12',
    },
    {
      id: 2,
      name: 'Pavadon Sangthong',
      email: 'pavadon.sa@mail.wu.ac.th',
      role: 'Backend Developer',
      bio: 'ถนัด Node.js, SQL และออกแบบระบบ API-first',
      avatar: 'https://i.pravatar.cc/160?img=32',
    },
  ];

  return (
    <section>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Profile</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        ข้อมูลโปรไฟล์ของสมาชิก 2 คน
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {people.map((p) => (
          <article
            key={p.id}
            style={{
              border: '1px solid #eee',
              borderRadius: 8,
              background: '#fff',
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Image
                src={p.avatar}
                alt={p.name}
                width={64}
                height={64}
                style={{ borderRadius: '50%', border: '1px solid #ddd' }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{p.role}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{p.email}</div>
              </div>
            </div>
            <p style={{ marginTop: 12, lineHeight: 1.6 }}>{p.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
