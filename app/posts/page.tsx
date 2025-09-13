import Link from 'next/link';
import { serverFetch } from '@/lib/server-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id: number; name: string; email: string };
type Post = { id: number; title: string; body: string; authorId: number };

async function getData(): Promise<
  | { error: string; posts: Post[]; authors: Map<number, User> }
  | { posts: Post[]; authors: Map<number, User> }
> {
  try {
    const [users, posts] = await Promise.all([
      serverFetch<User[]>('/api/users'),
      serverFetch<Post[]>('/api/posts'),
    ]);
    const map = new Map(users.map((u) => [u.id, u]));
    return { posts, authors: map };
  } catch (err: any) {
    return { error: err.message, posts: [], authors: new Map() };
  }
}

export default async function PostsPage() {
  const data = await getData();

  if ('error' in data) {
    return (
      <p style={{ color: '#c00' }}>Failed to load → {data.error}</p>
    );
  }

  return (
    <section>
      <h1>Posts (SSR via /api/posts)</h1>
      <ul className="list">
        {data.posts.map((p) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>
              <b>{p.title}</b>
            </Link>
            <div style={{ color: '#666' }}>
              by {data.authors.get(p.authorId)?.name ?? 'Unknown'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
