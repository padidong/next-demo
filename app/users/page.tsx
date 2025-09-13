import { serverFetch } from '@/lib/server-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id: number; name: string; email: string };

export default async function UsersPage() {
  let users: User[] = [];

  try {
    users = await serverFetch<User[]>('/api/users');
  } catch (err: any) {
    return (
      <p style={{ color: '#c00' }}>
        Failed to load users → {err.message}
      </p>
    );
  }

  return (
    <section>
      <h1>Users (SSR via /api/users)</h1>
      <ul className="list">
        {users.map((u) => (
          <li key={u.id}>
            <b>{u.name}</b> — <span style={{ color: '#666' }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
