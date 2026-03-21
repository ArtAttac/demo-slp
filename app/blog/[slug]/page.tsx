import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { redis, BlogPost } from '@/lib/redis';
import type { Metadata } from 'next';

function stripMarkdown(text: string): string {
  return text.replace(/[#*_~`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const slugs = await redis.lrange('blog:slugs', 0, -1);
  return (slugs ?? []).map((slug) => ({ slug }));
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return redis.get<BlogPost>(`blog:post:${slug}`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = decodeHtmlEntities(post.title);
  const description = stripMarkdown(post.body).slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.createdAt,
      url: `https://speechontheslope.com/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://speechontheslope.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: decodeHtmlEntities(post.title),
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: {
      '@type': 'Organization',
      name: 'Speech on the Slope',
      url: 'https://speechontheslope.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Speech on the Slope',
      url: 'https://speechontheslope.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://speechontheslope.com/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <Link href="/#contact" className="px-5 py-2 bg-brand-bluePurple text-white text-sm font-semibold rounded-full hover:bg-brand-darkBlue transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <time className="text-sm text-brand-bluePurple font-medium">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-body font-bold text-gray-900 mt-3 mb-8 leading-tight">
            {decodeHtmlEntities(post.title)}
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-brand-bluePurple to-brand-pink rounded-full mb-10" />

          {/* Featured image — shown when the post has one */}
          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.imageUrl}
                alt={`Featured image for ${decodeHtmlEntities(post.title)}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-brand-bluePurple prose-a:underline hover:prose-a:text-brand-darkBlue prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:w-full">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{post.body}</ReactMarkdown>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-gray-200 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Have questions about your child&apos;s speech or language development?
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </div>
  );
}
