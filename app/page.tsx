import { serverFetch } from '@/lib/server-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id: number; name: string; email?: string };
type Post = { id: number; title: string; body: string; authorId: number };

async function getSummary() {
  try {
    const [users, posts] = await Promise.all([
      serverFetch<User[]>('/api/users'),
      serverFetch<Post[]>('/api/posts'),
    ]);
    return { users: users.length, posts: posts.length };
  } catch (err: any) {
    return { error: err.message, users: 0, posts: 0 };
  }
}

export default async function Home() {
  const data = await getSummary();

  return (
    <section>
      <h1>Next.js API-first (SSR) • Vercel-ready</h1>

      {'error' in data && data.error ? (
        <p style={{ color: '#c00' }}>API error → {data.error}</p>
      ) : null}

      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        <div className="card">
          <h3>Users</h3>
          <p>
            Total: <b>{data.users}</b>
          </p>
        </div>
        <div className="card">
          <h3>Posts</h3>
          <p>
            Total: <b>{data.posts}</b>
          </p>
        </div>
      </div>

      <p style={{ marginTop: 12, color: '#666' }}>
        SSR calls <code>/api/users</code> and <code>/api/posts</code> and forwards cookies/headers.
      </p>
    </section>
  );
}
