import { notFound } from 'next/navigation';
import { serverFetch } from '@/lib/server-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Post = { id: number; title: string; body: string; authorId: number };
type User = { id: number; name: string };

async function fetchPost(id: number): Promise<{ post: Post; author?: User | null } | null> {
  try {
    // serverFetch จะ throw error ถ้า !res.ok
    const data = await serverFetch<{ post: Post; author?: User | null }>(
      `/api/posts/${id}`
    );
    return data;
  } catch (err: any) {
    if (err.message.includes('404')) return null;
    throw err; // ให้ component หลักจัดการ
  }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await fetchPost(id);

  if (!data) return notFound();

  const { post, author } = data;

  return (
    <article>
      <h1>{post.title}</h1>
      <div style={{ color: '#666', marginBottom: 8 }}>
        by {author?.name ?? 'Unknown'} (author #{post.authorId})
      </div>
      <div className="card">
        <p>{post.body}</p>
      </div>
      <p style={{ marginTop: 12, color: '#666' }}>
        Fetched via <code>/api/posts/{id}</code> at request-time (cookies forwarded).
      </p>
    </article>
  );
}
