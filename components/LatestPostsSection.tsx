import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, decodeHtmlEntities, createExcerpt } from '@/lib/blog';

export const revalidate = 3600;

export default async function LatestPostsSection() {
  const posts = (await getAllBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="latest-posts"
      aria-labelledby="latest-posts-heading"
      className="py-20 bg-gradient-to-b from-white to-brand-cream/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-bluePurple mb-3">
            From the Blog
          </p>
          <h2
            id="latest-posts-heading"
            className="text-3xl md:text-4xl font-body font-bold text-brand-darkBlue"
          >
            Latest Posts
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Tips, insights, and resources for supporting your child&apos;s communication journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const title = decodeHtmlEntities(post.title);
            const excerpt = createExcerpt(post.body, 120);
            return (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-bluePurple/20 transition-all duration-300"
                >
                  {post.imageUrl && (
                    <div className="relative h-44 w-full">
                      <Image
                        src={post.imageUrl}
                        alt={`Featured image for ${title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <time className="text-xs text-brand-bluePurple font-medium">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h3 className="text-lg font-body font-bold text-gray-900 mt-1.5 mb-2 group-hover:text-brand-bluePurple transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {excerpt}
                    </p>
                    <span className="inline-block mt-3 text-brand-bluePurple font-semibold text-sm group-hover:underline">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
