import Link from 'next/link';
import { redis, BlogPost } from '@/lib/redis';
import BlogEditor from './BlogEditor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, insights, and resources for supporting your child\'s speech, language, and literacy development from the Speech on the Slope team.',
  openGraph: {
    title: 'Blog | Speech on the Slope',
    description: 'Tips, insights, and resources for supporting your child\'s speech, language, and literacy development.',
    url: 'https://speechontheslope.com/blog',
  },
  alternates: {
    canonical: 'https://speechontheslope.com/blog',
  },
};

export const dynamic = 'force-dynamic';

async function getPosts(): Promise<BlogPost[]> {
  const slugs = await redis.lrange('blog:slugs', 0, -1);
  if (!slugs || slugs.length === 0) return [];

  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = await redis.get<BlogPost>(`blog:post:${slug}`);
    if (post) posts.push(post);
  }

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <Link href="/#contact" className="px-5 py-2 bg-brand-bluePurple text-white text-sm font-semibold rounded-full hover:bg-brand-darkBlue transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-brand-darkBlue via-brand-bluePurple/90 to-brand-pink/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Tips, insights, and resources for supporting your child&apos;s communication journey
          </p>
        </div>
      </section>

      <BlogEditor initialPosts={posts} />
    </div>
  );
}
